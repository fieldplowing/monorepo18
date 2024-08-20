import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Control, DEFAULTCONTROL } from '../model/control';

@Injectable({
  providedIn: 'root',
})
/**
 * List表示位置復元のためのID等を共有保持する
 */
export class StatusService {
  private subject = new BehaviorSubject<Control>(DEFAULTCONTROL);

  /**
   * 共有の制御情報を取得する
   */
  value(feature: string): Control {
    let current = this.subject.value;
    if (feature !== current.Feature) {
      current = DEFAULTCONTROL;
      current.Feature = feature;
      this.subject.next(current);
    }
    return current;
  }
  /**
   * 共有の制御情報を設定する
   */
  update(status: Control) {
    this.subject.next(status);
  }
  /**
   * 共有の制御情報をresetする
   */
  reset(): Control {
    this.subject = new BehaviorSubject<Control>(DEFAULTCONTROL);
    return this.subject.value;
  }
}
