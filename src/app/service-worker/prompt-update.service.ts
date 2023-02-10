import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, first, concat, interval, map } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService {

  subs: SubSink;
  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {
    this.subs = new SubSink();
  }

  checkForUpdate(): void {
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

      // allow the app to stabilize first, before starting
      // polling for updates with `interval()`
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everyFiveMins$ = interval(5 * 60 * 1000);
      const everyFiveMinsOnceAppIsStable$ = concat(appIsStable$, everyFiveMins$);

      this.subs.sink = everyFiveMinsOnceAppIsStable$.subscribe(async () => {
        try {
          const updateFound = await this.swUpdate.checkForUpdate();
          console.log(updateFound ? 'A new version is available.' : 'Already on the latest version.');
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    }
  }
}
