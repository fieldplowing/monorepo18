/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemoService {
  /**
   * Http クライアントを実行する際のヘッダオプション
   *
   * @description
   * 認証トークンを使用するために `httpOptions` としてオブジェクトを用意した。
   */
  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  /**
   * 接続先ホスト名を共有保持する
   */
  // public Host = 'http://localhost:3000'; // apiのアドレス;
  public Host = '/api/v1/memo'; // apiのアドレス;
  /**
   * コンストラクタ. MemoService のインスタンスを生成する
   */
  constructor(private http: HttpClient) {}

  /** メモを全件取得する */
  public getAll(): any {
    return firstValueFrom<any>(
      this.http.get(this.Host, this.httpOptions).pipe(
        tap(() => this.log('getAll')),
        catchError(this.handleError<any>('getAll')),
      ),
    );
    // public getAll(): Observable<any> {
    //   return this.http.get(this.Host, this.httpOptions).pipe(
    //     tap(() => this.log('getAll')),
    //     catchError(this.handleError<any>('getAll')),
    //   );
  }

  /** IDによりメモを取得する */
  public getById(id: any): Observable<any> {
    return this.http.get(this.Host + id, this.httpOptions).pipe(
      tap(() => this.log('getById')),
      catchError(this.handleError<any>('getById')),
    );
  }

  /** POST: メモを登録する */
  public create(data: any): Observable<any> {
    return this.http.post(this.Host, data, this.httpOptions).pipe(
      tap(() => this.log('create')),
      catchError(this.handleError<any>('create')),
    );
  }

  /** PUT: IDによりメモを更新する */
  public update(id: any, data: any): Observable<any> {
    return this.http.put(this.Host + id, data, this.httpOptions).pipe(
      tap(() => this.log('update')),
      catchError(this.handleError<any>('update')),
    );
  }

  /** DELETE: IDによりメモを削除する */
  public delete(id: any): Observable<any> {
    return this.http.delete(this.Host + id, this.httpOptions).pipe(
      tap(() => this.log('delete')),
      catchError(this.handleError<any>('delMemo')),
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** log記録 HeroServiceのメッセージをMessageServiceを使って */
  private log(message: string) {
    console.log(message); // かわりにconsoleに出力
  }
}
