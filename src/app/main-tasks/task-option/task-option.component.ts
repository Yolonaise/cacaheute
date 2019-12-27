import { Component, OnInit } from '@angular/core';
import { OutlookService } from 'src/service/outlook.service';
import { User } from '@microsoft/microsoft-graph-types-beta';

@Component({
  selector: 'app-task-option',
  templateUrl: './task-option.component.html',
  styleUrls: ['./task-option.component.scss']
})
export class TaskOptionComponent implements OnInit {
  name: string;
  constructor(public outlook: OutlookService) { }

  ngOnInit() {
    this.outlook.isConnected.subscribe(async (isConnected) => {
      if (isConnected) {
        this.name = this.outlook.currentUser.givenName;
      }
    });
  }

  async regiter() {
    await this.outlook.getMe();
  }
}
