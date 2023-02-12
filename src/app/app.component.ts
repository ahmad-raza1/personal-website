import { Component, OnDestroy, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { DataService } from './shared/services/data.service';
import { Observable } from 'rxjs';
import { PromptUpdateService } from './service-worker/prompt-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  title = 'ahmad-raza';
  menuRoutes: Routes = routes;
  loading$: Observable<boolean>;
  sidenavOpen: boolean = false;

  constructor(public dataService: DataService, private promptUpdateService: PromptUpdateService) {
    // Service Worker
    this.promptUpdateService.checkForUpdate();

    this.dataService.getAppData();
    this.loading$ = this.dataService.loadingSubject$.asObservable();
  }

  ngOnDestroy(): void {
    this.promptUpdateService.subs.unsubscribe();
  }
}
