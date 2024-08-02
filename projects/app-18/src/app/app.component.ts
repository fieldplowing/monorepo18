import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NaviComponent } from './navi/navi.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NaviComponent],
  // template: `
  //   <nav>
  //     <a href="/">Home</a>
  //     |
  //     <a href="/user">User</a>
  //   </nav>
  //   <router-outlet />
  // `,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app-18';
}
