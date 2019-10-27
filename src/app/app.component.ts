import { Component } from '@angular/core';
import { GameService } from 'src/service/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Cacaheute';

  constructor(public service: GameService) { }

  async ngAfterViewInit() {
    const res = await this.service.initialize();
    if (res.statusCode > 299) {
      this.service.showActSnack(res.message, 'Reconnect', async () => { await this.ngAfterViewInit(); } );
    } else {
      this.service.showSnack('Server is online');
    }
  }
}

