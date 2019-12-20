import { Component, OnInit } from '@angular/core';
import { OutlookService } from 'src/service/outlook.service';
import { OutlookTaskFolder } from '@microsoft/microsoft-graph-types-beta';

@Component({
  selector: 'app-main-tasks',
  templateUrl: './main-tasks.component.html',
  styleUrls: ['./main-tasks.component.scss']
})
export class MainTasksComponent implements OnInit {
  folders: OutlookTaskFolder[];

  constructor(private outlook: OutlookService) { }

  async ngOnInit() {
    this.folders = await this.outlook.getFolders();
    console.log(this.folders);
  }
}
