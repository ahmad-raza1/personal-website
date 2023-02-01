import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { DataService } from './shared/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'my-personal-website';
  menuRoutes: Routes = routes;
  loading$: Observable<boolean>;

  constructor(private dataService: DataService) {
    this.dataService.getAppData();
    this.loading$ = this.dataService.loadingSubject$.asObservable();
  }
}
