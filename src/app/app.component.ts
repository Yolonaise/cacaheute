import { Component } from '@angular/core';
import { GameService } from 'src/service/game.service';
import { NotificationService } from 'src/service/notification.service';
import { UserService } from 'src/service/user.service';
import { NavigationService } from 'src/service/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Cacaheute';

  constructor(public game: GameService, private notif: NotificationService, private user: UserService, private nav: NavigationService) { }

  async ngAfterViewInit() {
    const res = await this.game.initialize();
    if (res.statusCode > 299) {
      this.notif.showActSnack(res.message, 'Reconnect', async () => { await this.ngAfterViewInit(); });
    } else {
      this.notif.showSnack('Server is online');
    }

    if (!this.user.getStockedId() || this.user.getStockedId() === '') {
      this.nav.gotToLogin();
    }
  }
}

