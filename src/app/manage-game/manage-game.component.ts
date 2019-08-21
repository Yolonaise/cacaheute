import { Component, OnInit, Input } from '@angular/core';
import { CacaheuteGame } from 'cacaheute-objects/models/cacaheute.game';
import { Person } from 'cacaheute-objects/models/cacaheute.person';

@Component({
  selector: 'app-manage-game',
  templateUrl: './manage-game.component.html',
  styleUrls: ['./manage-game.component.scss']
})

export class ManageGameComponent implements OnInit {

  @Input() game: CacaheuteGame;
  @Input() you: Person;
  
  constructor() { }

  ngOnInit() {
  }
}
