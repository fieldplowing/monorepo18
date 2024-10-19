import { computed, Injectable, signal } from '@angular/core';
import { Item } from '../model/item';
import { Status, STATUSDEFAULT } from '../model/status';

@Injectable({
  providedIn: 'root',
})
export class StatusItemService {
  // WritableSignal
  private SignalStatus = signal<Status>(STATUSDEFAULT);
  private SignalData = signal<Item[]>([]);
  private SignalFilter = signal('');
  // Computed signal readonly(現在の共有情報を取得する)
  readonly status = computed(() => {
    return this.SignalStatus();
  });
  readonly data = computed(() => {
    // return this.SignalData();
    // フィルター
    return this.SignalData().filter((item) => {
      if (this.SignalFilter()) {
        return item.content.includes(this.SignalFilter());
      } else {
        return true;
      }
    });
  });

  /**
   * 共有情報を更新する
   */
  update(status: Status) {
    this.SignalStatus.set(status);
  }
  updateData(data: Item[]) {
    console.log('updateData');
    this.SignalData.set(data);
  }
  updateFilter(filter: string) {
    this.SignalFilter.set(filter);
  }
  /**
   * 共有情報をresetする
   */
  reset(): Status {
    this.SignalStatus.set(STATUSDEFAULT);
    return this.status();
  }
  resetData(): Item[] {
    this.SignalData.set([]);
    return this.data();
  }
}
