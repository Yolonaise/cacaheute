import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { GameService } from 'src/service/game.service';
import { CacaheuteClient } from 'src/client/cacaheute.client';
import { NotificationService } from 'src/service/notification.service';
import { UserService } from 'src/service/user.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})

export class ConnectionComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFomrControl = new FormControl('', []);

  matcher = new MyErrorStateMatcher();

  constructor(private game: GameService, private client: CacaheuteClient, private notif: NotificationService, private user: UserService) { }

  ngOnInit() {
  }

  async onGoClicked() {
    const res = await this.game.sendRequest(async () => {
      return await this.client.enterIn(this.emailFormControl.value, this.nameFomrControl.value);
    });
    if (res.statusCode > 299) {
      this.notif.showSnack(res.message);
    } else {
      this.user.setStockedId(res._id);
      this.game.navService.goToDashboard();
    }
  }
}
