import { NgModule } from "@angular/core";
import { MenuModule } from '@progress/kendo-angular-menu';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { WinAuthInterceptor } from './services/winAuthInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from "./footer/footer.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { MenuactiveDirective } from './directives/menuactive.directive';
import { ErrorComponent } from './error/error.component'

import { SelectiveStrategy } from './services/selective-strategy.service';

@NgModule({
  declarations: [
    FooterComponent,
    NavMenuComponent,
    ErrorComponent,
    MenuactiveDirective

  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MenuModule
  ],
  exports: [
    FooterComponent,
    NavMenuComponent,
    ErrorComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: WinAuthInterceptor,
    multi: true
  },
    SelectiveStrategy
  ]
})
export class CoreModule {

}
