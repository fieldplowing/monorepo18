import { AfterViewInit, Component, viewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ListDataSource, ListItem } from './list-datasource';
import { Router, ActivatedRoute } from '@angular/router';
// import { Lib18Service } from "lib-18";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class ListComponent implements AfterViewInit {
  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);
  readonly table = viewChild.required(MatTable);
  dataSource = new ListDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  constructor(
    // Angularがコンポーネントをインスタンス化するときに実行されます。
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort();
    this.dataSource.paginator = this.paginator();
    this.table().dataSource = this.dataSource;
  }

  clickRow() {
    this.router.navigate(['detail'], { relativeTo: this.route });
  }
}
