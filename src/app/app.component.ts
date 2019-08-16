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
  game: CacaheuteGame = undefined;
  isLoading: boolean = false;

  constructor(gameService: GameService, private snackbar: MatSnackBar) {
    super(gameService);
  }

  ngOnInit() {
  }

  init() {
    this.game = undefined;
  }
  beforeGameCreation(game: CacaheuteGame): void {
    this.isLoading = true;
  }

  onGameCreated(game: CacaheuteGame): void {
    this.game = game;
    this.isLoading = false;
  }

  onGameRejoined(game: CacaheuteGame): void {
    this.game = game;
  }
}

