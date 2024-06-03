import { Component, OnInit, Input } from '@angular/core';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/pages/login/login.component';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  providers: [ MenuService ]
})
export class HorizontalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId;
  public menuItems: Array<Menu>;
  constructor(public menuService:MenuService, public dialog: MatDialog) { }

  ngOnInit() {
    this.menuItems = this.menuService.getHorizontalMenuItems();
    console.log('All Menu Items:', this.menuItems); // Log all items
  
    // Filter menu items
    this.menuItems = this.menuItems.filter(item => item.parentId === this.menuParentId);
    console.log('Filtered Menu Items:', this.menuItems); // Log filtered items
  }  

  // showNotificationDrop: boolean = false;

  // toggleNotificationDrop() {
  //   console.log('jkkjh')

  //   this.showNotificationDrop = !this.showNotificationDrop;
  // }



  onMenuClick(menuItem: any) {
    if(menuItem.hasSubMenu && menuItem.parentId == 0){
      console.log(this.menuItems)
      if (menuItem.label === 'LOGIN') {
        this.openLoginDialog();
      } else {
        // handle other menu clicks
      }
    }
   
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '250px',
      data: { /* any data you want to pass to the dialog */ }
    });
  
  }
  
}
