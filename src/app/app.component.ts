import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { DataService } from './shared/services/data.service';
import { Observable, concat, filter, first, interval, map } from 'rxjs';
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
  sidenavOpen: boolean = false;
  isViewInit: boolean = false;

  constructor(private dataService: DataService, private appRef: ApplicationRef, private swUpdate: SwUpdate) {

    this.dataService.getAppData();
    this.loading$ = this.dataService.loadingSubject$.asObservable();
    this.subs = new SubSink();

    // Service Worker
    if (this.swUpdate.isEnabled) {
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
          // reload the page to update to the latest version.
          document.location.reload();
        });

      // Allow the app to stabilize first, before starting
      // polling for updates with `interval()`.
      const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
      const everyFiveMins$ = interval(5 * 60 * 1000);
      const everyFiveMinsOnceAppIsStable$ = concat(appIsStable$, everyFiveMins$);

      this.subs.sink = everyFiveMinsOnceAppIsStable$.subscribe(async () => {
        try {
          const updateFound = await swUpdate.checkForUpdate();
          console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
