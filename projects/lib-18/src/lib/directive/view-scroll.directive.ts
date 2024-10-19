import { ViewportScroller } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  model,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[libViewScroll]',
  standalone: true,
  exportAs: 'libScroll',
})
export class ViewScrollDirective implements AfterViewInit, OnDestroy {
  private resizeObserver: ResizeObserver | undefined;
  constructor(
    private readonly viewport: ViewportScroller,
    private _elementRef: ElementRef<HTMLElement>,
  ) {
    // const nativeElement = _elementRef.nativeElement;
    console.log('dom nativeElement:' + _elementRef.nativeElement);
  }
  /** Whether the icon is show. アイコンが表示・非表示するかどうか*/
  // これはモデル入力です。
  // 普通の入力は読み取り専用ですが、モデル入力には直接書き込むことができます。
  showIcon = model(false);
  // 普通の入力
  // @Input({ transform: booleanAttribute }) showScroll = false;
  // or showScroll = false;
  // 普通の出力
  // onShowScroll = output<boolean>(); // OutputEmitterRef<boolean>
  // setScrollShow(show: boolean) {
  //   this.onShowScroll.emit(show);
  // }
  //
  // scrollendイベントが発生したときに実行するハンドラメソッドを提供します。
  @HostListener('document:scrollend', ['$event']) onScrollend(): void {
    // console.log('scrollEnd Position:', this.viewport.getScrollPosition()?.[1]);
    // ｙ座標 > 0 はアイコン（＝スクロールバー）の表示・非表示を判定します。
    if (this.viewport.getScrollPosition()?.[1] > 0) {
      this.showIcon.set(true);
    } else {
      this.showIcon.set(false);
    }
  }
  // ResizeObserverを使用して要素のサイズ変更を監視し、高さが変更されたときにSignalを更新します。
  // また、ngOnDestroyメソッドでResizeObserverを切断します。
  ngAfterViewInit() {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // console.log('高さが変更されました:', entry.contentRect.height);
        if (entry.contentRect.height < 600) {
          this.showIcon.set(false);
        }
      }
    });
    // 監視を開始します。
    this.resizeObserver.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
  top() {
    // scrollToTop
    this.showIcon.set(false);
    this.viewport.scrollToPosition([0, 0]);
    console.log('scroll to Top by click');
  }
  // window:resizeイベントが発生したときに実行するハンドラメソッドを提供します。
  // @HostListener('window:resize', ['$event.target.innerWidth'])
  // onResize(width: number) {
  // }

  // window:resizeイベントが発生したときに実行するハンドラメソッドを提供します。
  // @HostListener('window:resize', ['$event'])
  // onResize(event?: Event): void {
  //   console.log('window:resize target:', event?.target);
  //   const currentWindowWidth: number = window.innerWidth;
  //   if (currentWindowWidth < 600) {
  //     this.handleSmallScreen();
  //   } else if (currentWindowWidth >= 600 && currentWindowWidth < 1200) {
  //     this.handleMediumScreen();
  //   } else {
  //     this.handleLargeScreen();
  //   }
  // }

  // handleSmallScreen(): void {
  //   console.log('Small screen');
  //   // 小さい画面用の処理
  // }

  // handleMediumScreen(): void {
  //   console.log('Medium screen');
  //   // 中くらいの画面用の処理
  // }

  // handleLargeScreen(): void {
  //   console.log('Large screen');
  //   // 大きい画面用の処理
  // }
}
