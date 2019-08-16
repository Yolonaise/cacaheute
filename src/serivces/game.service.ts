import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game'
import { GameListenner } from 'src/interfaces/GameListenner';

export class GameService {

  private listenners: GameListenner[] = [];

  fakeGames: CacaheuteGame[] = [{
    rejoin_id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    name: "GameTest",
    admin: undefined,
    persons: undefined,
    status: "created"
  }];

  createAfter(g: CacaheuteGame, time: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        g.rejoin_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.fakeGames.push(g);

        resolve(g);
      }, time);
    });
  }

  getAfter(n: string, email: string, time: number) {
    return new Promise(resolve => {
      setTimeout(() => {
        let result: CacaheuteGame = undefined;
        let foundEmail: boolean = false;

        this.fakeGames.forEach(g => {
          if (g.rejoin_id === n) {
            result = g;
          }
        });

        if (result && result.persons) {
          result.persons.forEach(p => {
            if (p.email === email)
              foundEmail = true;
          });
        }

        resolve(foundEmail ? result : undefined);
      }, time);
    });
  }

  addListenner(listenner: GameListenner) {
    console.log(listenner);
    this.listenners.push(listenner);
  }

  async get(name: string, email: string) {
    const result = <CacaheuteGame>await this.getAfter(name, email, 500);
    console.log(result);

    return result;
  }

  async create(game: CacaheuteGame) {
    this.listenners.forEach(l => {
      l.beforeGameCreation(game);
    });

    const result = <CacaheuteGame>await this.createAfter(game, 500);
    console.log(result);

    this.listenners.forEach(l => {
      l.onGameCreated(game);
    });
    return game;
  }

  onGameRejoin(game: CacaheuteGame) {
    this.listenners.forEach(l => {
      l.onGameRejoined(game);
    });
  }
}