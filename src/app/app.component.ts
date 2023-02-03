import { Component, OnDestroy, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { DataService } from './shared/services/data.service';
import { Observable, filter, interval, map } from 'rxjs';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
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

    if (this.swUpdate.isEnabled) {
      // Required to enable updates on Windows and ios.
      this.swUpdate.activateUpdate();

      this.subs.sink = this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion
        })))
        .subscribe(version => {
          console.log(`Updating to a new version, ${JSON.stringify(version)}`);
          window.location.reload();
        });

      // emits value in sequence every 1 minute  
      this.subs.sink = interval(60 * 1000).subscribe(_ => {
        this.swUpdate.checkForUpdate().then(available => {
          console.log('Checking for updates...');
          if (available) {
            console.log("Update Found!");
          }
        });
      });
    }

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
