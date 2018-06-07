/*default modules */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';


/* third party modules */
import { ButtonsModule } from '@progress/kendo-angular-buttons';

/* custom modules */
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { RoutingModule } from './routing.module'

/* Component sections*/ 
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    ButtonsModule,
    CoreModule,
    RoutingModule
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
