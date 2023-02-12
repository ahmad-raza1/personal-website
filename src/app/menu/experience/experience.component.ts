import { Component } from '@angular/core';
import { Experience } from 'src/app/shared/models/data-interfaces';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experiences: Array<Experience>;
  currentDate: Date;
  constructor(private dataService: DataService) {
    this.experiences = [this.dataService.experience] as Array<Experience>;
    this.currentDate = new Date();
  }
}
