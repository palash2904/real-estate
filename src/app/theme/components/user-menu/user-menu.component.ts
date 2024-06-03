import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(public appService:AppService, private service: SharedService) { }

  ngOnInit() {
  }

  logout(){
    this.service.logout();
  }

}
