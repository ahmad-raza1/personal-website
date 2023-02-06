import { Component } from '@angular/core';
import { Skill } from 'src/app/shared/models/data-interfaces';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills: Array<Skill>;
  constructor(private dataService: DataService) {
    this.skills = this.dataService.skills;
  }
}
