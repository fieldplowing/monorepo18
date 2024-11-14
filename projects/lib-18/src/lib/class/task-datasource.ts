import { DataSource } from '@angular/cdk/collections';
import { Item } from '../model/item';
import { BehaviorSubject, merge, Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { StatusItemService } from '../service/status-item.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MemoService } from '../service/memo.service';

/**
 * リストビューのデータソース。
 * 表示データを取得して操作するためのロジックをカプセル化します。
 *  (ソート、ページネーション、フィルタリングを含む)
 */
export class TaskDatasource extends DataSource<Item> {
  private view$ = new BehaviorSubject<Item[]>([]);
  private memoService = inject(MemoService);

  private statusService = inject(StatusItemService);
  status = this.statusService.status();
  data = this.statusService.data();

  private loading$ = new BehaviorSubject<boolean>(false);
  loading = this.loading$.asObservable();

  paginator!: MatPaginator;
  sort!: MatSort;

  constructor() {
    super();
  }

  /**
   * データをロードします。
   */
  async loadData() {
    // Spinner true
    this.loading$.next(true);

    console.log('Load data:', this.data.length);
    if (this.data.length === 0) {
      // データをFetch
      this.data = await this.memoService.getAll();
      // Fetchデータからデータソースを設定
      this.statusService.updateData(this.data);
    }
    // 表示データnext
    this.view$.next(this.getPagedData(this.getSortedData([...this.data])));
    // if (this.data.length === 0) {
    //   // データをFetch
    //   this.memoService.getAll().subscribe((res) => {
    //     // Fetchデータからデータソースを設定
    //     this.data = res;
    //     this.statusService.updateData(this.data);
    //   });
    // }
    // Spinner false
    this.loading$.next(false);
  }
  /**
   * ページ遷移前のステータスを保管します。
   * @param id
   */
  saveStatus(id: number) {
    console.log('Save status');
    this.status.SelectedRow = id;
    // ステータスを更新します。
    this.statusService.update(this.status);
  }
  /**
   * 指定のデータを削除します。
   * @param id
   */
  deleteData(id: number) {
    console.log('Delete data Id:', id);
    // 表示データnext
    this.data = this.data.filter((data) => data.id !== id);
    this.view$.next(this.getPagedData(this.getSortedData([...this.data])));
    // データソースを設定
    this.statusService.updateData(this.data);
    // データをDelete
    //
  }

  /**
   * データソース（戻り値）をテーブルに接続します。
   * 監視対象：paginator、sort
   * @returns レンダリングされるアイテム
   */
  override connect(): Observable<readonly Item[]> {
    console.log('Connecting data source');
    // sort後にpaginatorをリセットする
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // sortとpaginatorのObservableを一つにして監視する
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => {
          this.statusChange();
        }),
      )
      .subscribe();

    return this.view$.asObservable();
  }
  /**
   * テーブルが破棄されるときに呼び出されます。
   * 保持されたリソースを解放したりできます。
   */
  override disconnect(): void {
    console.log('DisConnecting data source');
    this.view$.complete();
    this.loading$.complete();
    // ステータスを更新します。
    this.statusService.update(this.status);
  }

  /**
   * paginator,sortステータスを変更します。
   */
  private statusChange(): void {
    if (this.paginator && this.sort) {
      this.status.PageIndex = this.paginator.pageIndex;
      this.status.PageSize = this.paginator.pageSize;

      if (this.sort.active && this.sort.direction !== '') {
        this.status.SortActive = this.sort.active;
        this.status.SortDirection = this.sort.direction;
      }
    }
    // 表示データnext
    this.view$.next(this.getPagedData(this.getSortedData([...this.data])));
  }

  /**
   * データから該当ページを取得します。
   * @param data
   * @returns
   */
  private getPagedData(data: Item[]): Item[] {
    const startIndex = this.status.PageIndex * this.status.PageSize;
    return data.splice(startIndex, this.status.PageSize);
  }

  /**
   * データをソートします。
   * @param data
   * @returns
   */
  private getSortedData(data: Item[]): Item[] {
    return data.sort((a, b) => {
      const isAsc = this.status.SortDirection === 'asc';
      switch (this.status.SortActive) {
        case 'updatedAt':
          return compare(a.updatedAt, b.updatedAt, isAsc);
        case 'title':
          return compare(a.title, b.title, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/title columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean,
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
