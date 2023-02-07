import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { HomeComponent } from './home/home.component';
import { MatModule } from '../mat/mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';

@NgModule({
  declarations: [
    HomeComponent,
    SkillsComponent,
    EducationComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FlexLayoutModule,

    MatModule
  ]
})
export class MenuModule { }
