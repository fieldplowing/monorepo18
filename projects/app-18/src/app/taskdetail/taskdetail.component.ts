import { Component, inject, viewChild } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { MatSelectModule } from '@angular/material/select';
// import { MatRadioModule } from '@angular/material/radio';
// import { ActivatedRoute, Router } from '@angular/router';
import { Item, StatusItemService } from 'lib-18';
import { Location } from '@angular/common';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';

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
  ],
})
export class TaskdetailComponent {
  // ViewChild
  readonly autosize = viewChild.required<CdkTextareaAutosize>('autosize');
  // properties
  // show: boolean = false;

  private fb = inject(FormBuilder);
  editForm = this.fb.group({
    title: ['', Validators.required],
    content: [''],
    status: [''],
    category: [''],
  });

  private statusService = inject(StatusItemService);
  status = this.statusService.status();
  data = this.statusService.data();
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
  }

  clickContentClear() {
    // closeアイコン
    this.editForm.controls.content.setValue('');
  }

  onSubmit(): void {
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
