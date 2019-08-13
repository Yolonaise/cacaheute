import { Component } from '@angular/core';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game'
import { GameService } from 'src/serivces/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Cacaheute';
  game: CacaheuteGame;
  gameService: GameService;
  isLoading: boolean = false;

  constructor(gameService: GameService){
    this.gameService = gameService;
  }

  async ngOnInit() {
    this.isLoading = true;
    
    this.game = await this.gameService.get("");
    
    this.isLoading = false;
  }
}
