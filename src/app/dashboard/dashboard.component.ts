import { Component, OnInit } from '@angular/core';
import User from 'cacaheute-objects/models/cacaheute.user';
import * as MicrosoftGraphBeta from '@microsoft/microsoft-graph-types-beta';
import { UserService } from 'src/service/user.service';
import { OutlookService } from 'src/service/outlook.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  currentUser: User;
  me: MicrosoftGraphBeta.User;

  constructor(
    private user: UserService,
    private outlook: OutlookService) { }

  async ngOnInit() {
    this.currentUser = await this.user.getUser();
    await this.register();
  }

  async register() {
    this.me = await this.outlook.getMe();
  }

  unRegister() {
  }
}
