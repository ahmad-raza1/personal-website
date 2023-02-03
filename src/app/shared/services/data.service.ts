import { Injectable } from '@angular/core';
import { SubSink } from 'subsink';
import { ApiResponse } from '../models/api-response.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Data } from '../models/data.model';
import { BasicInfo, Education, Experience } from '../models/data-interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private appData!: Data;
  private subs: SubSink;
  loadingSubject$: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.subs = new SubSink();
    this.loadingSubject$ = new BehaviorSubject<boolean>(true);
  }

  getAppData(): void {
    const params: HttpParams = new HttpParams()
      .set('key', environment.apiKey);
    this.subs.sink = this.http.get(`${environment.apiBaseUrl}?${params.toString()}`)
      .pipe(
        tap((_: any) => console.log('Fetching Data...'))
      )
      .subscribe({
        next: (response: ApiResponse) => {
          if (response.code === 200) {
            this.appData = response.data as Data;
          } else {
            throw new Error(response.message);
          }
        },
        error: (error: Error) => {
          throw new Error(error.message);
        },
        complete: () => {
          console.log("Success!");
          this.subs.unsubscribe();
          this.loadingSubject$.next(false);
        }
      });
  }

  // getters
  get basicInfo(): BasicInfo { return this.appData.basicInfo }
  get education(): Education | Array<Education> { return this.appData.education; }
  get experience(): Experience | Array<Experience> { return this.appData.experience; }
  get skills(): Array<string> { return this.appData.skills; }
}
