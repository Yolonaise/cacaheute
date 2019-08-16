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
      this.snackbar.open("The event name is empty !");
      return;
    }

    if (!this.persons || this.persons.length < 3) {
      this.snackbar.open("The number of person must be at least 3!");
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
      this.snackbar.open(msg);
      return;
    }

    if (this.price <= 0) {
      this.snackbar.open("With that price, impossible to make people happy !");
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
      let ref = this.snackbar.open("An error occured when trying to create " + g.name);
      ref._dismissAfter(3000);
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
  }

  async rejoin(id: string, email: string) {
    if (!id || id === "") {
      let ref = this.snackbar.open("I can't rejoin without ID");
      ref._dismissAfter(3000);
      return;
    }

    if (!email || email === "") {
      let ref = this.snackbar.open("I can't rejoin without and email");
      ref._dismissAfter(3000);
      return;
    }
    let g = await this.gameService.get(id, email);
    if (g == undefined) {
      let ref = this.snackbar.open("No game where found with '" + id + "'");
      ref._dismissAfter(3000);
      return;
    }


  }
}
