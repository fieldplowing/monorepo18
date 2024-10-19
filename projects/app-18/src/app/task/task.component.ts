import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule, MatTable } from '@angular/material/table';
import { Column, TaskDatasource, TASKCOLUMN, TaskItem } from 'lib-18';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    CommonModule,
  ],
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

  constructor(
    // Angularがコンポーネントをインスタンス化するときに実行されます。
    private router: Router,
    private route: ActivatedRoute,
  ) {
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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  clickSelect(row: number) {
    // ページ遷移前のステータスを保管します。状態共有 row
    this.dataSource.saveStatus(row);
    // ルートパラメータでページ遷移
    this.router.navigate(['detail'], { relativeTo: this.route });
  }

  clickDel(id: number) {
    // デーを削除します。
    this.dataSource.deleteData(id);
  }
}
