import { Component, OnInit } from '@angular/core';
import { CacaheuteClient } from 'src/client/cacaheute.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Cacaheute';

  constructor() {
  }

  async ngOnInit() {
    // let serverStatus = await new CacaheuteClient().getServerStatus();
  }
}

