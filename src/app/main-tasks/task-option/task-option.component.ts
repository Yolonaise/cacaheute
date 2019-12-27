import { Component, OnInit } from '@angular/core';
import { OutlookService } from 'src/service/outlook.service';

@Component({
  selector: 'app-task-option',
  templateUrl: './task-option.component.html',
  styleUrls: ['./task-option.component.scss']
})
export class TaskOptionComponent implements OnInit {
  name: string;
  constructor(public outlook: OutlookService) { }

  ngOnInit() {
  }

  async regiter() {
    await this.outlook.getMe();
  }
}
