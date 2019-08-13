import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game'
import { Person } from 'cacaheute-objects/models/cacaheute.person'

export class GameService {
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

    async get(name: string){
        const result = <CacaheuteGame>await this.resolveAfter(name, 500);
        console.log(result);

        return this.fakeGame;
    }
}