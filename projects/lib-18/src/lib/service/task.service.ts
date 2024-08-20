/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/internal/operators/take';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { Subject } from 'rxjs/internal/Subject';
import { Observer } from 'rxjs/internal/types';
import { TaskItem } from '../model/item';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  /** InexDBをRxjsでラップする  */
  private db: Subject<IDBDatabase> = new ReplaySubject<IDBDatabase>(1);

  private dbSettings = {
    name: 'task',
    version: 1,
  };
  private storeSettings = {
    name: 'tasks',
    storeOptions: { keyPath: 'id', autoIncrement: true },
    indexes: [
      // { indexName: 'comment', unique: false },
      { indexName: 'category', unique: false },
      { indexName: 'status', unique: false },
      { indexName: 'title', unique: false },
      { indexName: 'content', unique: false },
      { indexName: 'accessCount', unique: false },
      { indexName: 'updateCount', unique: false },
      { indexName: 'createdAt', unique: false },
      { indexName: 'updatedAt', unique: false },
    ],
  };

  constructor() {
    console.log('TaskService starting');
    /**データベースをオープンする */
    const request = indexedDB.open(this.dbSettings.name);

    request.onsuccess = (event: any) => {
      const db: IDBDatabase = event.target.result;
      this.db.next(db);
    };

    request.onerror = (error) => {
      this.db.error(error);
      this.db.complete();
    };

    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;

      //object storeが存在する場合削除して作り直し(auto incrementをリセットするため)
      if (Array.from(db.objectStoreNames).includes(this.storeSettings.name)) {
        db.deleteObjectStore(this.storeSettings.name);
      }

      const objectStore = db.createObjectStore(
        this.storeSettings.name,
        this.storeSettings.storeOptions,
      );
      this.storeSettings.indexes.forEach((obj) => {
        objectStore.createIndex(obj.indexName, obj.indexName, {
          unique: obj.unique,
        });
      });
    };
  }
  /**
   * task取得
   * @param id 任意
   * @returns request.onsuccessevent.target.result
   */
  get(id?: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.db.pipe(take(1)).subscribe((db) => {
          const transaction = db.transaction(
            this.storeSettings.name,
            'readonly',
          );
          const objectStore = transaction.objectStore(this.storeSettings.name);
          let request;

          if (id) {
            request = objectStore.get(parseInt(id));
          } else {
            request = objectStore.getAll();
          }

          request.onsuccess = (event: any) => {
            // if (!id) {
            //   this.Share.Data = event.target.result;
            // }
            observer.next(event.target.result);
            observer.complete();
          };

          request.onerror = (event: any) => observer.error(event.target.error);
        });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /** task追加 */
  post(task: TaskItem): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      try {
        this.db.pipe(take(1)).subscribe((db) => {
          const transaction = db.transaction(
            this.storeSettings.name,
            'readwrite',
          );
          const objectStore = transaction.objectStore(this.storeSettings.name);
          const request = objectStore.add(task);

          request.onsuccess = (event: any) => {
            observer.next(event.target.result);
            observer.complete();
          };

          request.onerror = (event: any) => observer.error(event.target.error);
        });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /** task更新 */
  put(task: TaskItem): Observable<TaskItem> {
    return new Observable((observer: Observer<TaskItem>) => {
      try {
        this.db.pipe(take(1)).subscribe((db) => {
          const transaction = db.transaction(
            this.storeSettings.name,
            'readwrite',
          );
          const objectStore = transaction.objectStore(this.storeSettings.name);
          const request = objectStore.put(task);

          request.onsuccess = (event: any) => {
            observer.next(event.target.result);
            observer.complete();
          };

          request.onerror = (event: any) => observer.error(event.target.error);
        });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  /** task削除 */
  delete(id: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.db.pipe(take(1)).subscribe((db) => {
          const transaction = db.transaction(
            this.storeSettings.name,
            'readwrite',
          );
          const objectStore = transaction.objectStore(this.storeSettings.name);
          const request = objectStore.delete(parseInt(id));

          request.onsuccess = (event: any) => {
            observer.next(event.type);
            observer.complete();
          };

          request.onerror = (event: any) => observer.error(event.target.error);
        });
      } catch (error) {
        observer.error(error);
      }
    });
  }

  deleteDB(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.db.pipe(take(1)).subscribe((db) => {
          db.close();
          const request = indexedDB.deleteDatabase(this.dbSettings.name);

          request.onsuccess = (event) => {
            console.log('Database delete onsuccess');
            observer.next(event.type);
            observer.complete();
          };

          request.onblocked = () => {
            console.log('Database delete onblocked');
            // alert('errror! 複数タブでは実行できません。 タブを閉じてください')
          };

          request.onerror = (event: any) => observer.error(event.target.error);
        });
      } catch {}
    });
  }
}
