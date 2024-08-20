import { DataSource } from '@angular/cdk/collections';
import { inject } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { Control, StatusService, TaskItem, TaskService } from 'lib-18';
import { Observable, BehaviorSubject } from 'rxjs';
// TODO: replace this with real data from your application
const EXAMPLE_DATA: TaskItem[] = [
  {
    id: 1,
    title: 'Hydrogen',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '25/8/10',
  },
  {
    id: 2,
    title: 'Helium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '25/7/10',
  },
  {
    id: 3,
    title: 'Lithium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 4,
    title: 'Beryllium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 5,
    title: 'Boron',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 6,
    title: 'Carbon',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 7,
    title: 'Nitrogen',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 8,
    title: 'Oxygen',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 9,
    title: 'Fluorine',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 10,
    title: 'Neon',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 11,
    title: 'Sodium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 12,
    title: 'Magnesium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 13,
    title: 'Aluminum',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 14,
    title: 'Silicon',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 15,
    title: 'Phosphorus',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 16,
    title: 'Sulfur',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 17,
    title: 'Chlorine',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 18,
    title: 'Argon',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 19,
    title: 'Potassium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 20,
    title: 'Calcium',
    status: '',
    category: '',
    content: '',
    accessCount: 0,
    updateCount: 0,
    createdAt: '',
    updatedAt: '',
  },
];

/**
 * Data source for the List view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

export class TaskDatasource extends DataSource<TaskItem> {
  private taskService: TaskService = inject(TaskService);
  private statusService: StatusService = inject(StatusService);
  private status: Control = this.statusService.value('task');

  private data = new BehaviorSubject<TaskItem[]>(EXAMPLE_DATA);

  constructor() {
    super();
  }

  /**
   * ページ表示データをロードする
   */
  loadData() {
    this.status.Data = EXAMPLE_DATA;
    this.getPage(
      this.status.PageIndex,
      this.status.PageSize,
      this.status.SortActive,
      this.status.SortDirection,
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TaskItem[]> {
    console.log('Connecting data source');
    return this.data.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    console.log('DisConnecting data source');
  }

  /**
   * ページ表示データを取得する
   * ページ初期表示と遷移からの戻り復元のため、matSort＋MatPaginatorの処理を状態共有で追加
   * @param pageIndex
   * @param pageSize
   * @param active
   * @param direction
   */
  getPage(
    pageIndex: number,
    pageSize: number,
    active: string,
    direction: string,
  ) {
    // 状態共有
    this.status.PageIndex = pageIndex;
    this.status.PageSize = pageSize;
    this.status.SortActive = active;
    this.status.SortDirection = direction as SortDirection;
    this.statusService.update(this.status);
    // 表示データnext
    this.data.next(
      this.getPagedData(this.getSortedData([...this.status.Data])),
    );
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   * ページ遷移からの戻り復元のため、MatPaginatorの判定を状態共有で置換
   */
  private getPagedData(data: TaskItem[]): TaskItem[] {
    const startIndex = this.status.PageIndex * this.status.PageSize;
    return data.splice(startIndex, this.status.PageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   * ページ遷移からの戻り復元のため、matSortの判定を状態共有で置換
   */
  private getSortedData(data: TaskItem[]): TaskItem[] {
    console.log('SortActive=' + this.status.SortActive);

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
