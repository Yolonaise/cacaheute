import { Injectable } from '@angular/core'
import { GameService } from 'src/serivces/game.service';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game';

@Injectable()
export abstract class GameListenner {

    constructor(gameService: GameService) {
        gameService.addListenner(this);
    }

    abstract onGameCreated(game: CacaheuteGame): void;
    abstract beforeGameCreation(game: CacaheuteGame): void;
}