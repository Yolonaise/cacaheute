import { Component, OnInit, Injectable } from '@angular/core';
import { GameService } from 'src/service/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Cacaheute';

  constructor(@Injectable() public service: GameService, private snackBar: MatSnackBar) { }

  async ngOnInit() {
    const res = await this.service.initialize();
    if (res.statusCode > 299) {
      const ref = this.snackBar.open(res.message, 'Reconnect');
      ref.onAction().subscribe(async () => { await this.ngOnInit(); });
    } else {
      this.snackBar.open('Server is online', '', { duration: 1000 });
    }
  }
}

