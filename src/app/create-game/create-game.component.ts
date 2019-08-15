import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/serivces/game.service';
import { Person } from 'cacaheute-objects/models/cacaheute.person';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})

export class CreateGameComponent implements OnInit {

  @Input() name: string = "";
  @Input() persons: Person[] = [];
  @Input() price: number = 0;

  constructor(private gameService: GameService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  async onCreateGame() {
    if(!this.name || this.name === ""){
      this.snackbar.open("The event name is empty !");
      return;
    }

    if(!this.persons || this.persons.length < 3){
      this.snackbar.open("The number of person must be at least 3!");
      return;
    }

    let msg: string;
    this.persons.forEach(p => {
      msg = this.personValid(p);
      if(msg){
        return;
      } 
    });

    if(msg){
      this.snackbar.open(msg);
      return;
    }

    if(this.price <= 0){
      this.snackbar.open("With that price, impossible to make people happy !");
      return;
    }

    let g: CacaheuteGame = {
      name: this.name,
      persons: this.persons,
      status: "Init",
      admin: this.persons[0],
      price: this.price
    }

    await this.gameService.create(g);
  }

  personValid(p: Person){
    if(!p)
      return "A persone is empty, fill it";
    
    if(!p.name || p.name === "")
      return "A person has no name !";

    if(!p.email || p.email === "")
      return p.name + " misses an email !";
    
    if(!p.email.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")){
      return p.name + "has an invalid email";
    }
  }
  addPerson() {
    let p: Person = {
      email: "",
      name: "",
      suggests: []
    };
    this.persons.push(p);
  }

  removePerson(i) {
    this.persons.splice(i);
  }

  onInitCreateGame(){
    this.name = "";
    this.persons = [];
    this.price = 0;
  }
}
