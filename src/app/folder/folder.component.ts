import { Component, OnInit, Input } from '@angular/core';
import { OutlookTaskFolder, OutlookTask } from '@microsoft/microsoft-graph-types-beta';
import { OutlookService } from 'src/service/outlook.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  @Input() folder: OutlookTaskFolder;
  tasks: OutlookTask[];

  constructor(private outlook: OutlookService) {
  }

  async ngOnInit() {
    if (!this.folder) {
      return;
    }

    this.tasks = await this.outlook.getTasks(this.folder.id);
  }
}
