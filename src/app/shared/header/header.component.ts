import { Component, Input } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenav!: any;
  menuRoutes: Routes = routes;
  background: ThemePalette = undefined;
}
