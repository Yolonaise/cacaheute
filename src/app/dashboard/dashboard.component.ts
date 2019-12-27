import { Component, OnInit } from '@angular/core';
import User from 'cacaheute-objects/models/cacaheute.user';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(
    private user: UserService) { }

  async ngOnInit() {
    this.currentUser = await this.user.getUser();
  }

  unRegister() {
  }
}
