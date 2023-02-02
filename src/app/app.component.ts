import { Component, OnDestroy, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { DataService } from './shared/services/data.service';
import { Observable, interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SwUpdate } from '@angular/service-worker';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'my-personal-website';
  menuRoutes: Routes = routes;
  loading$: Observable<boolean>;
  private subs: SubSink;

  constructor(private dataService: DataService, private swUpdate: SwUpdate) {
    this.dataService.getAppData();
    this.loading$ = this.dataService.loadingSubject$.asObservable();
    this.subs = new SubSink();
  }

  ngOnInit(): void {
    this.subs.sink = this.swUpdate.available.subscribe(_ => {
      console.log('A new version of the app is available.');
      caches.delete(environment.cacheName).then(_ => window.location.reload());
    });

    if (this.swUpdate.isEnabled) {
      // Required to enable updates on Windows and ios.
      this.swUpdate.activateUpdate();

      // emits value in sequence every 1 minute  
      this.subs.sink = interval(1000 * 60).subscribe(_ => {
        this.swUpdate.checkForUpdate().then(() => {
          console.log('Checking for updates...');
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
