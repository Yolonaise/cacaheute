import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game'
import { GameListenner } from 'src/interfaces/GameListenner';

export class GameService {

  private listenners: GameListenner[] = [];

  fakeGame: CacaheuteGame = {
    name: "GameTest",
    admin: undefined,
    persons: undefined,
    status: "created"
  }

  resolveAfter(x, time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(x);
      }, time);
    });
  }

  addListenner(listenner: GameListenner) {
    console.log(listenner);
    this.listenners.push(listenner);
  }

  async get(name: string) {
    const result = <CacaheuteGame>await this.resolveAfter(name, 500);
    console.log(result);

    return this.fakeGame;
  }

  async create(game: CacaheuteGame) {
    this.listenners.forEach(l => {
      l.beforeGameCreation(game);
    });

    const result = <CacaheuteGame>await this.resolveAfter(game, 500);
    console.log(result);

    this.listenners.forEach(l => {
      l.onGameCreated(game);
    });
    return game;
  }
}