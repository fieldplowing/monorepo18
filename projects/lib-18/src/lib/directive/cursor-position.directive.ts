import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[libCursorPosition]',
})
export class CursorPositionDirective {
  constructor(private _elementRef: ElementRef<HTMLElement>) {
    // const nativeElement = _elementRef.nativeElement;
    console.log('dom nativeElement:' + _elementRef.nativeElement.tagName);
  }

  private savedCaretPosition: { top: number; left: number } | null = null;
  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const textarea = this._elementRef.nativeElement as HTMLTextAreaElement;
    const caretPos = textarea.selectionStart;
    console.log(`Caret Pos=${caretPos}, data=${event.data}`);
    console.log(`textarea height=${textarea.scrollHeight}`);

    // ミラーリング用のdiv要素を作成
    const mirror = document.createElement('div');
    mirror.style.visibility = 'hidden';
    mirror.style.whiteSpace = 'pre-wrap';
    mirror.textContent = textarea.value.substring(0, caretPos);
    document.body.appendChild(mirror);
    // カーソル位置の範囲を設定
    const range = document.createRange();
    range.setStart(mirror.firstChild || mirror, caretPos);
    range.setEnd(mirror.firstChild || mirror, caretPos);
    const rangeRect = range.getBoundingClientRect();
    document.body.removeChild(mirror);
    // 座標を計算
    // window.scrollY: pegeスクロール量
    // window.innerHeight: ビューポート（実表示域）の高さ
    // rangeRect.top: ビューポート上端から要素までの距離
    console.log(
      `Scroll Position: windowy=${window.scrollY}, bottom=${window.innerHeight}`,
    );
    console.log(`Cursor Position: y=${rangeRect.top}`);
    // 計算した位置にスクロール
    // window.scrollTo({
    //   top: rangeRect.top + window.scrollY,
    //   behavior: 'smooth',
    // });
  }
}
