import { Injectable } from '@angular/core'
import { GameService } from 'src/serivces/game.service';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game';
import { Person } from 'cacaheute-objects/models/cacaheute.person';

@Injectable()
export abstract class GameListenner {

    constructor(protected gameService: GameService) {
        gameService.addListenner(this);
    }

    abstract onGameCreated(game: CacaheuteGame): void;
    abstract beforeGameCreation(game: CacaheuteGame): void;
    abstract onGameRejoined(game: CacaheuteGame, person: Person): void;
}