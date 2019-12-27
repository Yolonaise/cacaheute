import { Component, OnInit } from '@angular/core';
import { OutlookService } from 'src/service/outlook.service';
import { OutlookTask } from '@microsoft/microsoft-graph-types-beta';
import { Subject } from 'rxjs';
import { ActionService } from 'src/service/action.service';

@Component({
  selector: 'app-task-tile',
  templateUrl: './task-tile.component.html',
  styleUrls: ['./task-tile.component.scss']
})
export class TaskTileComponent implements OnInit {
  tasks: OutlookTask[];

  constructor(
    public outlook: OutlookService,
    private action: ActionService) {
  }

  async ngOnInit() {
    this.outlook.isConnected.subscribe(async (value) => {
      this.tasks = await this.outlook.getAllTasks();
    });
  }

  show() {
    this.action.showTasks();
  }
}
