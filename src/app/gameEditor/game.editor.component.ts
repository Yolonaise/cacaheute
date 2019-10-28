import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import User from 'cacaheute-objects/models/cacaheute.user';
import Gift from 'cacaheute-objects/models/cacaheute.gift';
import { GameService } from 'src/service/game.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class GameStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-game-editor',
  templateUrl: './game.editor.component.html',
  styleUrls: ['./game.editor.component.scss']
})

export class GameEditorComponent implements OnInit {
  minUsers = 3;
  mode = '';
  users: { user: User, gifts: Gift[], new: boolean }[] = [];
  matcher = new GameStateMatcher();
  admin: string;

  nameFomrControl = new FormControl('', [
    Validators.required
  ]);
  priceFomrControl = new FormControl('', [
    Validators.required
  ]);
  dateFomrControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private route: ActivatedRoute, private service: GameService) { }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
    if(this.mode == 'create'){
      this.users.push({ user: this.service.registeredUser, gifts: [], new: false });
      this.admin = this.service.registeredUser._id;
      console.log(this.admin);
    }
  }

  addUser() {
    this.users.push({ user: { email: '', name: '', isRegistered: false}, gifts: [], new: true });
  }

  removeUser(index: number) {
    this.users.splice(index, 1);
  }
}
