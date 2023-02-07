import { Component } from '@angular/core';
import { Education } from 'src/app/shared/models/data-interfaces';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educations: Array<Education>;
  constructor(private dataService: DataService) {
    this.educations = this.dataService.education as Array<Education>;
  }
}
