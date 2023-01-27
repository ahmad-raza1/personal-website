import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-personal-website';
  menuRoutes: Routes = routes;
}
