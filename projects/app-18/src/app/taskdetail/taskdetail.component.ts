import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { MatRadioModule } from '@angular/material/radio';
// import { ActivatedRoute, Router } from '@angular/router';
import { CursorPositionDirective, Item, StatusItemService } from 'lib-18';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.component.html',
  styleUrl: './taskdetail.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    // MatSelectModule,
    // MatRadioModule,
    MatIconModule,
    ReactiveFormsModule,
    // Directive
    CursorPositionDirective,
  ],
})
export class TaskdetailComponent {
  // inject
  private statusService = inject(StatusItemService);
  private formBuilder = inject(FormBuilder);
  // properties
  editForm = this.formBuilder.group({
    title: ['', Validators.required],
    content: [''],
    status: [''],
    category: [''],
  });
  status = this.statusService.status();
  private data = this.statusService.data();
  private task = {} as Item;

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private location: Location,
  ) {
    // 対象のDataをFormにパッチする
    this.data.map((v) => {
      if (v.id === this.status.SelectedRow) {
        this.editForm.patchValue(v);
      }
    });
    // 監視対象Statusをsubscribe購読する
    toObservable(this.statusService.status).subscribe();
  }

  clickContentClear(): void {
    // closeアイコン
    this.editForm.controls.content.setValue('');
  }

  save(): void {
    // 一時Dataの更新

    // リストに戻る
    this.goBack();
  }
  goBack(): void {
    // リストに戻る
    this.location.back();
    // ルートパラメータでページ遷移
    // this.router.navigate(['memolist']);
  }
}
