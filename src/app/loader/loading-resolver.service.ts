import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { ApiResponse } from '../shared/models/api-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoadingResolverService {

  private params: HttpParams;

  constructor(private http: HttpClient) {
    this.params = new HttpParams()
      .set('key', environment.apiKey);
  }

  getData(): Observable<ApiResponse> {
    return from(caches.match(`${environment.apiBaseUrl}?${this.params.toString()}`))
      .pipe(
        switchMap((response) => {
          if (response) {
            return response.clone().json();
          }
          return this.fromHttp();
        })
      );
  }

  private fromHttp(): Observable<any> {
    return this.http.get<ApiResponse>(`${environment.apiBaseUrl}?${this.params.toString()}`)
      .pipe(
        catchError((error) => {
          throw new Error(error.message);
        }),
        switchMap((data) => {
          if (data) {
            caches.open(environment.cacheName)
              .then((cache) => {
                cache.put(`${environment.apiBaseUrl}?${this.params.toString()}`, new Response(JSON.stringify(data)));
              });
            return of(data);
          }
          return of(null);
        })
      );
  }
}