import { Component, OnInit, Injectable } from '@angular/core';
import { CacaheuteClient } from 'src/client/cacaheute.client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Cacaheute';

  constructor(@Injectable() private client: CacaheuteClient) { }

  async ngOnInit() {
    let result = await this.client.getServerStatus();
    console.log(result);
  }
}

