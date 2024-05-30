import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { DomHandlerService } from '../dom-handler.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav') sidenav:any;  
  public toolbarTypes = [1, 2];
  public toolbarTypeOption:number;
  public headerTypes = ['default', 'image', 'carousel', 'map', 'video'];
  public headerTypeOption:string;
  public searchPanelVariants = [1, 2, 3];
  public searchPanelVariantOption:number;
  public headerFixed: boolean = false;
  public showBackToTop: boolean = false;
  public scrolledCount = 0;

  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public router:Router,  
              private domHandlerService: DomHandlerService) {
    this.settings = this.appSettings.settings;  
  }

  ngOnInit() {
    this.toolbarTypeOption = this.settings.toolbar;    
    this.headerTypeOption = this.settings.header; 
    this.searchPanelVariantOption = this.settings.searchPanelVariant;
  }
  
  public changeTheme(theme){
    this.settings.theme = theme;       
  }

  public chooseToolbarType(){
    this.settings.toolbar = this.toolbarTypeOption;
    this.domHandlerService.winScroll(0, 0); 
  }

  public chooseHeaderType(){
    this.settings.header = this.headerTypeOption;    
    this.domHandlerService.winScroll(0, 0); 
    this.router.navigate(['/']);
  }

  public chooseSearchPanelVariant(){
    this.settings.searchPanelVariant = this.searchPanelVariantOption;
  }
     
 
  @HostListener('window:scroll') onWindowScroll() {
    const scrollTop = Math.max(this.domHandlerService.window?.pageYOffset, this.domHandlerService.winDocument.documentElement.scrollTop, this.domHandlerService.winDocument.body.scrollTop);
    (scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false; 

    if(this.settings.stickyMenuToolbar){      
      let top_toolbar = this.domHandlerService.winDocument.getElementById('top-toolbar');
      if(top_toolbar){ 
        if(scrollTop >= top_toolbar.clientHeight) {
          this.settings.mainToolbarFixed = true;
        }
        else{
          this.settings.mainToolbarFixed = false;
        } 
      }        
    } 
    
        
    let load_more = this.domHandlerService.winDocument.getElementById('load-more');
    if(load_more){
      if(this.domHandlerService.window?.innerHeight > load_more.getBoundingClientRect().top + 120){ 
        if(!this.settings.loadMore.complete){
          if(this.settings.loadMore.start){        
            if(this.scrolledCount < this.settings.loadMore.step){  
              this.scrolledCount++; 
              if(!this.settings.loadMore.load){ 
                this.settings.loadMore.load = true; 
              }
            }
            else{
              this.settings.loadMore.start = false;
              this.scrolledCount = 0;
            }
          }  
        }              
      }
    }
  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -this.domHandlerService.window?.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(this.domHandlerService.window?.pageYOffset != 0){
        this.domHandlerService.window?.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(this.domHandlerService.window?.innerWidth <= 768){ 
      this.domHandlerService.winScroll(0, 0);  
    }
  }

  ngAfterViewInit(){
    this.domHandlerService.winDocument.getElementById('preloader')?.classList.add('hide');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.sidenav.close();
        this.settings.mainToolbarFixed = false; 
        this.domHandlerService.winScroll(0, 0);   
      }            
    });    
  }   
 

}
