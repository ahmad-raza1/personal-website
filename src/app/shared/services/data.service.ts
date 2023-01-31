import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubSink } from 'subsink';
import { ApiResponse } from '../models/api-response.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs';
import { Data } from '../models/data.model';
import { BasicInfo, Education, Experience } from '../models/data-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private appData!: Data;
  private subs: SubSink;
  private http: HttpClient;

  constructor(handler: HttpBackend) {
    this.subs = new SubSink();
    this.http = new HttpClient(handler);
  }

  getAppData(): Promise<any> {
    return new Promise((resolve, reject) => {
      const params = new HttpParams()
        .set('key', environment.apiKey);
      this.subs.sink = this.http.get<Observable<ApiResponse>>(`${environment.apiBaseUrl}?${params.toString()}`)
        .pipe(
          tap((_: any) => console.log('Fetching Data...'))
        ).subscribe({
          next: (res: ApiResponse) => {
            if (res.code === 200) {
              this.appData = res.data as Data;
            } else {
              throw new Error(res.message);
            }
            resolve(res);
          },
          error: (err: Error) => {
            reject(err);
            throw new Error(err.message);
          },
          complete: () => {
            console.log("Success!");
            this.subs.unsubscribe();
          }
        });
    });
  }

  // getters
  get basicInfo(): BasicInfo { return this.appData.basicInfo }
  get education(): Education | Array<Education> { return this.appData.education; }
  get experience(): Experience | Array<Experience> { return this.appData.experience; }
  get skills(): Array<string> { return this.appData.skills; }
}
