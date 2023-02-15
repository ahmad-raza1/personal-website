import { ApplicationRef, Injectable } from '@angular/core';
import { VersionEvent } from '@angular/service-worker';
import { SwUpdate } from '@angular/service-worker';
import { first, concat, interval, takeWhile, BehaviorSubject } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable({
  providedIn: 'root'
})
export class PromptUpdateService extends BehaviorSubject<boolean> {

  private subs: SubSink;
  constructor(private appRef: ApplicationRef, private swUpdate: SwUpdate) {
    super(false);
    this.subs = new SubSink();
  }

  async checkForUpdate(): Promise<void> {
    if (this.swUpdate.isEnabled) {
      // activate the update
      await this.swUpdate.activateUpdate();

      this.subs.sink = this.swUpdate.versionUpdates.subscribe(async (evt: VersionEvent) => {
        console.log('UpdateService: versionUpdates', evt);
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            document.location.reload();
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
            break;
        }
      });

      // allow the app to stabilize first, before starting
      // polling for updates with `interval()`
      const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
      const everyOneMin$ = interval(1 * 60 * 1000);
      const everyOneMinOnceAppIsStable$ = concat(appIsStable$, everyOneMin$);

      this.subs.sink = everyOneMinOnceAppIsStable$.pipe(
        takeWhile(() => super.value === false)
      ).subscribe(async () => {
        try {
          const updateFound = await this.swUpdate.checkForUpdate();
          if (updateFound) {
            console.log('A new version is available.');
            super.next(true);
          } else {
            console.log('Already on the latest version.');
          }
        } catch (err) {
          console.error('Failed to check for updates:', err);
        }
      });
    }
  }

  destroy(): void {
    this.subs.unsubscribe();
  }
}
