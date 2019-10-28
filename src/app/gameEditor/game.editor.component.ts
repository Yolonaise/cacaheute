import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
  mode = '';

  nameFomrControl = new FormControl('', [
    Validators.required
  ]);
  priceFomrControl = new FormControl('', [
    Validators.required
  ]);
  dateFomrControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new GameStateMatcher();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
  }

}
