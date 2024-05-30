import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomHandlerService } from 'src/app/dom-handler.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [ 
    { name: 'Profile', href: 'profile', icon: 'person' },  
    { name: 'My Properties', href: 'my-properties', icon: 'view_list' },
    { name: 'Favorites', href: 'favorites', icon: 'favorite' }, 
    { name: 'Submit Property', href: '/submit-property', icon: 'add_circle' },  
    { name: 'Logout', href: '/', icon: 'power_settings_new' },    
  ]; 
  constructor(public router: Router, private domHandlerService: DomHandlerService) { }

  ngOnInit() {
    if(this.domHandlerService.window?.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (this.domHandlerService.window?.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {  
        if(this.domHandlerService.window?.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  } 


}
