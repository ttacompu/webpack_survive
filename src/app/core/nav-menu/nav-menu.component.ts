import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';



@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  userName = "Thein";
  alias = environment.alias;

  //, private settingService_ : SettingService
  constructor(private router_: Router ) {

  }

  ngOnInit(): void{
    
  }

  menuClose($event){
    $event.preventDefault();
  }

  onSelect({ item }) {
    if(item.text){
      this.routerRules(item.text);
    }
    // this.router_.navigate(['/feed'])
    // console.log(item);
  }

  private routerRules(text) {
    switch (text) {
      case "Home":
        this.router_.navigate(['/home'])
        break;
    }
  }
}
