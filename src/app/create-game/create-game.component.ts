import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/serivces/game.service';
import { Person } from 'cacaheute-objects/models/cacaheute.person';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})

export class CreateGameComponent implements OnInit {

  name: string = "";
  persons: Person[] = [];
  price: number = 0;

  readonly gameService: GameService;

  constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  ngOnInit() {
  }

  async onCreateGame() {
    let g = await this.gameService.get("test");
    this.gameService.create(g);
  }

  addPerson() {
    console.log(this.name);
    let p: Person = {};
    this.persons.push(p);
  }

  removePerson(i) {
    this.persons.splice(i);
  }
}
