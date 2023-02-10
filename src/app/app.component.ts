import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'my-personal-website';
  menuRoutes: Routes = routes;
  loading$: Observable<boolean>;
  private subs: SubSink;
  sidenavOpen: boolean = false;
  isViewInit: boolean = false;

  constructor(private dataService: DataService, private swUpdate: SwUpdate) {
    this.dataService.getAppData();
    this.loading$ = this.dataService.loadingSubject$.asObservable();
    this.subs = new SubSink();
  }

  ngOnInit(): void {

    if (this.swUpdate.isEnabled) {
      // activate update
      this.swUpdate.activateUpdate();

      // whenever a new version is ready for activation
      this.subs.sink = this.swUpdate.versionUpdates.pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map(evt => ({
          type: 'UPDATE_AVAILABLE',
          current: evt.currentVersion,
          available: evt.latestVersion
        })))
        .subscribe(version => {
          console.log(`Activating the update: ${JSON.stringify(version)}`);
          window.location.reload();
        });

      // checking for an update after every one minute 
      this.subs.sink = interval(60 * 1000).subscribe(_ => {
        console.log('Checking for an update...');
        this.swUpdate.checkForUpdate();
      });
    }

  }

  ngAfterViewInit(): void {
    this.isViewInit = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
