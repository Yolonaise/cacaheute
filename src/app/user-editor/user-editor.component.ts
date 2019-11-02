import { Component, OnInit, Input } from '@angular/core';
import User from 'cacaheute-objects/models/cacaheute.user';
import Gift from 'cacaheute-objects/models/cacaheute.gift';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

/** Error when invalid control is dirty, touched, or submitted. */
export class UserStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})

export class UserEditorComponent implements OnInit {
  matcher = new UserStateMatcher();

  @Input() user: User;
  @Input() gifts: Gift[] = [];
  @Input() new = true;
  
  nameFomrControl = new FormControl('', [
    Validators.required
  ]);
  emailFomrControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor() { }

  ngOnInit() {
    if(!this.new){
      this.nameFomrControl.disable();
      this.emailFomrControl.disable();
    }
  }
}
