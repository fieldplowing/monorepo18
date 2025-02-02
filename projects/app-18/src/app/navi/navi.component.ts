import { Component, inject, signal, viewChild } from '@angular/core';
// import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusItemService, ViewScrollDirective } from 'lib-18';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    // AsyncPipe,
    RouterLink,
    // outletを指定する場合
    RouterOutlet,
    ViewScrollDirective,
  ],
})
export class NaviComponent {
  // inject
  private statusService = inject(StatusItemService);
  // ViewChild
  readonly drawer = viewChild.required(MatSidenavContent);
  // 事前に設定した画面サイズHandsetの変更をObservableで受け取ることができます。
  // private breakpointObserver = inject(BreakpointObserver);

  // isHandset$: Observable<boolean> = this.breakpointObserver
  //   .observe(Breakpoints.Handset)
  //   .pipe(
  //     map((result) => result.matches),
  //     shareReplay(),
  //   );
  // properties
  scrollSignal = signal(false);
  status = this.statusService.status();

  toggleDetaile(): void {
    // 入力表示切替
    if (this.status.ToggleDetail) {
      this.status.ToggleDetail = false;
    } else {
      this.status.ToggleDetail = true;
    }
    this.statusService.update(this.status);
  }
}
