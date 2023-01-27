import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatModule } from '../mat/mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,

    SharedRoutingModule,
    MatModule,
    FlexLayoutModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent
  ]
})
export class SharedModule { }
