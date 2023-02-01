import { Injectable } from '@angular/core';
import { SubSink } from 'subsink';
import { ApiResponse } from '../models/api-response.model';
import { BehaviorSubject, tap } from 'rxjs';
import { Data } from '../models/data.model';
import { BasicInfo, Education, Experience } from '../models/data-interfaces';
import { Resolve } from '@angular/router';
import { LoadingResolverService } from 'src/app/loader/loading-resolver.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements Resolve<any> {

  private appData!: Data;
  private subs: SubSink;
  loadingSubject$: BehaviorSubject<boolean>;

  constructor(private loadingResolverService: LoadingResolverService) {
    this.subs = new SubSink();
    this.loadingSubject$ = new BehaviorSubject<boolean>(true);
  }

  resolve() {
    this.subs.sink = this.loadingResolverService.getAppData()
      .pipe(
        tap((_: any) => console.log('Fetching Data...'))
      ).subscribe({
        next: (res: ApiResponse) => {
          if (res.code === 200) {
            this.appData = res.data as Data;
          } else {
            throw new Error(res.message);
          }
        },
        error: (err: Error) => {
          throw new Error(err.message);
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
