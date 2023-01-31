import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear: number;
  name: string;
  constructor(private dataService: DataService) {
    this.currentYear = new Date().getFullYear();
    this.name = this.dataService.basicInfo.name;
  }
}
