import { Component, Input } from '@angular/core';
import { Routes } from '@angular/router';
import { routes } from 'src/app/menu/menu-routing.module';
import { ThemePalette } from '@angular/material/core';
import { DataService } from '../services/data.service';
import { SocialLink } from '../models/data-interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenav!: any;
  menuRoutes: Routes = routes;
  background: ThemePalette = 'primary';
  websiteTitle: string;
  socialLinks: Array<SocialLink>;

  constructor(private dataService: DataService) {
    this.websiteTitle = this.dataService.basicInfo.name;
    this.socialLinks = this.dataService.socialLinks;
  }
}
