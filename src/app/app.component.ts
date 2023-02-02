import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { DataService } from './shared/services/data.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'my-personal-website';
  menuRoutes: Routes = routes;
  loading$: Observable<boolean>;

  constructor(private dataService: DataService) {
    this.dataService.getAppData();
    this.loading$ = this.dataService.loadingSubject$.asObservable();
  }

  async ngOnInit(): Promise<void> {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found!');
        caches.delete(environment.cacheName);
        window.location.reload();
      });
    }
  }
}
