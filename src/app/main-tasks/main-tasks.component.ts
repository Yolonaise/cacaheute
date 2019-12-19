import { Component, OnInit } from '@angular/core';
import { OutlookService } from 'src/service/outlook.service';
import { OutlookTask } from '@microsoft/microsoft-graph-types-beta';

@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.scss']
})
export class MainTasksComponent implements OnInit {
  dayTasks: OutlookTask[];

  constructor(private outlook: OutlookService) { }

  async ngOnInit() {
    this.dayTasks = await this.outlook.getTasks();
    console.log(this.dayTasks);
  }

  async completeTask(i: number){
    this.dayTasks[i] = await this.outlook.completeTask(this.dayTasks[i]);
  }
}
