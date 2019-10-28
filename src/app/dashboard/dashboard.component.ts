import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import User from 'cacaheute-objects/models/cacaheute.user';
import Game from 'cacaheute-objects/models/cacaheute.game';
import { GameService } from 'src/service/game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  currentUser: User;
  gamesClosed: Game[] = [];
  gamesOnGoing: Game[] = [];
  userGames: Game[] = [];

  constructor(private route: ActivatedRoute, private service: GameService, private client: CacaheuteClient) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const resU = await this.client.getUser(id);
    if (resU.statusCode && resU.statusCode > 299) {
      this.service.showActSnack('An error occured when loading user !', 'Retry', async () => {
        await this.ngOnInit();
      });
    } else {
      this.currentUser = resU as User;
      this.service.registerUser(this.currentUser);
    }

    const resGs = await this.client.getGames(id);
    if (resGs.statusCode > 299) {
      this.service.showActSnack('An error occured when loading user !', 'Retry', async () => {
        await this.ngOnInit();
      });
    } else {
      (resGs as Game[]).forEach(g => {
        if (g.admin === id) {
          this.userGames.push(g);
        }
        this.gamesOnGoing.push(g);
      });
    }
  }
}
