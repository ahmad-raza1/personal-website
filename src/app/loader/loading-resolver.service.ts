import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoadingResolverService {

  constructor(private http: HttpClient) { }

  getAppData(): Observable<ApiResponse> {
    const params = new HttpParams()
      .set('key', environment.apiKey);
    return this.http.get<ApiResponse>(`${environment.apiBaseUrl}?${params.toString()}`);
  }
}
