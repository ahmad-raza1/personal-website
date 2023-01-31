import { Component } from '@angular/core';
import { BasicInfo } from 'src/app/shared/models/data-interfaces';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  basicInfo: BasicInfo;
  constructor(private dataService: DataService) {
    this.basicInfo = this.dataService.basicInfo;
  }
}
