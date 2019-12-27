import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/service/notification.service';
import { UserService } from 'src/service/user.service';
import { NavigationService } from 'src/service/nav.service';
import { OutlookService } from 'src/service/outlook.service';
import { ProgressService } from 'src/service/progress.service';
import { Subject } from 'rxjs';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import { IInit } from 'src/interfaces/init.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Cacaheute';
  isLoading: Subject<boolean> = this.progress.isLoading;

  constructor(
    private client: CacaheuteClient,
    private notif: NotificationService,
    private user: UserService,
    private nav: NavigationService,
    private progress: ProgressService,
    private outlook: OutlookService) { }

  async ngOnInit() {
    const res = await this.client.getServerStatus();
    if (res.statusCode > 299) {
      this.notif.showActSnack(res.message, 'Reconnect', async () => { await this.ngOnInit(); });
    } else {
      this.notif.showSnack('Server is online');
    }
    const cookieId = this.user.getStockedId();
    if (!cookieId || cookieId === '') {
      this.nav.gotToLogin();
    }

    await this.outlook.initialize();
  }
}

