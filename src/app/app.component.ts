import { Component } from '@angular/core';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game'
import { GameService } from 'src/serivces/game.service';
import { GameListenner } from 'src/interfaces/GameListenner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent extends GameListenner {

  gameService: GameService;
  title = 'Cacaheute';
  game: CacaheuteGame;
  isLoading: boolean = false;

  constructor(gameService: GameService, private snackbar: MatSnackBar) {
    super(gameService);
  }

  ngOnInit() {
  }

  beforeGameCreation(game: CacaheuteGame): void {
    this.isLoading = true;
  }

  onGameCreated(game: CacaheuteGame): void {
    this.game = game;

    let snackBarRef = this.snackbar.open('Game ' + game.name + ' is created');
    snackBarRef._dismissAfter(2000);

    this.isLoading = false;
  }
}

