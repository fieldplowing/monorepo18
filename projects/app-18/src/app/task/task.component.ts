import {
  AfterViewInit,
  Component,
  inject,
  viewChild,
  ViewChild,
} from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { Column, Control, StatusService, TASKCOLUMN, TaskItem } from 'lib-18';
import { TaskDatasource } from './task-datasource';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TaskItem>;
  dataSource = new TaskDatasource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = TASKCOLUMN.data.map((v) => v.def);
  columDef: Column[] = TASKCOLUMN.data;

  // 遷移先からの戻りボタンに対応（選択行selectedrow）
  status!: Control;
  // スクロール位置イベントの取得に対応
  viewportScroller = inject(ViewportScroller);
  // viewchildを使って、View内要素:scrollRefを参照
  scrollRef = viewChild<HTMLElement>('scrollRef');
  constructor(
    // Angularがコンポーネントをインスタンス化するときに実行されます。
    private statusService: StatusService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.status = statusService.value('task');
    this.dataSource.loadData();
    // // Signal宣言(scrollPosition)
    // const scrollPosition: Signal<[number, number] | undefined> = toSignal(
    //   // ルーターのScrollイベントを取得
    //   inject(Router).events.pipe(
    //     filter((event): event is Scroll => event instanceof Scroll),
    //     map((event: Scroll) => event.position || [0, 0]),
    //   ),
    // );
    // // シグナル値が変更されたときに実行される操作
    // effect(() => {
    //   if (this.scrollRef() && scrollPosition()) {
    //     console.log('Signal effect');
    //     this.viewportScroller.scrollToPosition(scrollPosition()!);
    //   }
    // });
  }

  ngAfterViewInit(): void {
    // コンポーネントのビューが初期化されたあとに 1 回実行されます。
    this.table.dataSource = this.dataSource;
    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    // sortChangeとpaginatorイベントObservableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.dataSource.getPage(
            this.paginator.pageIndex,
            this.paginator.pageSize,
            this.sort.active,
            this.sort.direction,
          );
        }),
      )
      .subscribe(() => {
        console.log('sortChange & paginator merge complete');
      });
  }

  clickRow(row: number) {
    console.log('SelectedRow=' + row);
    // 状態共有 row
    this.status = this.statusService.value('task');
    this.status.SelectedRow = row;
    this.statusService.update(this.status);
    // ルートパラメータでページ遷移
    this.router.navigate(['detail'], { relativeTo: this.route });
  }
}
