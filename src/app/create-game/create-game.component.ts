import { Component, OnInit, Input } from '@angular/core';
import { GameService } from 'src/serivces/game.service';
import { Person } from 'cacaheute-objects/models/cacaheute.person';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})

export class CreateGameComponent implements OnInit {

  @Input() name: string = "";
  @Input() persons: Person[] = [];
  @Input() price: number = 0;

  @Input() adminIndex: number = 0;

  @Input() invitEmail: string = "";
  @Input() requestedId: string = "";

  constructor(private gameService: GameService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  async onCreateGame() {
    if (!this.name || this.name === "") {
      this.displayToast("The event name is empty !", 3000);
      return;
    }

    if (!this.persons || this.persons.length < 3) {
      this.displayToast("The number of person must be at least 3!", 3000);
      return;
    }

    let msg: string;
    this.persons.forEach(p => {
      msg = this.personValid(p);
      if (msg) {
        return;
      }
    });

    if (msg) {
      this.displayToast(msg, 3000);
      return;
    }

    if (this.price <= 0) {
      this.displayToast("With that price, impossible to make people happy !", 3000);
      return;
    }

    let g: CacaheuteGame = {
      name: this.name,
      persons: this.persons,
      status: "Initialized",
      admin: this.persons[this.adminIndex],
      price: this.price
    }

    let result = await this.gameService.create(g);
    if (result === undefined) {
      this.displayToast("An error occured when trying to create " + g.name, 3000);
      return;
    }

    this.rejoin(g.rejoin_id, g.admin.email);
  }

  selectAdmin(index: number) {
    this.adminIndex = index;
  }
  personValid(p: Person) {
    if (!p)
      return "A persone is empty, fill it";

    if (!p.name || p.name === "")
      return "A person has no name !";

    if (!p.email || p.email === "")
      return p.name + " misses an email !";

    if (!p.email.match("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"))
      return p.name + "has an invalid email";

    return undefined;
  }
  addPerson() {
    let p: Person = {
      email: "",
      name: "",
      suggests: []
    };
    this.persons.push(p);
  }

  removePerson(i: number) {
    this.persons.splice(i, 1);
  }

  onInitCreateGame() {
    this.name = "";
    this.persons = [];
    this.price = 0;
  }

  onRejoinGame() {
    this.rejoin(this.requestedId, this.invitEmail);
  }

  onInitRejoin() {
    this.requestedId = "";
    this.invitEmail = "";
  }

  async rejoin(id: string, email: string) {
    if (!id || id === "") {
      this.displayToast("I can't rejoin without ID", 3000);
      return;
    }

    if (!email || email === "") {
      this.displayToast("I can't rejoin without and email", 3000);
      return;
    }
    let g = await this.gameService.get(id, email);
    if (g == undefined) {
      this.displayToast("No game where found with '" + id + "'", 3000);
      return;
    }

    let you: Person;
    g.persons.forEach(p => {
      if(p.email == email)
        you = p;
    });

    if(you == undefined) {
      this.displayToast("No email where found in the game", 3000);
      return;
    }

    this.gameService.onGameRejoin(g, you);
  }

  displayToast(msg: string, time: number) {
    let ref = this.snackbar.open(msg);
    ref._dismissAfter(3000);
  }
}
