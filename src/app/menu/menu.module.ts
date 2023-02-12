import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { HomeComponent } from './home/home.component';
import { MatModule } from '../mat/mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { DurationPipe } from '../shared/pipes/duration.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    SkillsComponent,
    EducationComponent,
    ExperienceComponent,

    DurationPipe
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FlexLayoutModule,

    MatModule
  ]
})
export class MenuModule { }
