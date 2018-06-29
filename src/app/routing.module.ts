import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { SelectiveStrategy } from './core/services/selective-strategy.service';
import { HomeComponent } from './home/home.component'
import { ErrorComponent } from '../app/core/error/error.component'


const routes = [
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { parent: "Home" } },
  {
    path: 'feeds',
    loadChildren: "app/feed/feed.module#FeedModule",
    data: { preload : true}
  },
  {
    path: 'newsLetter',
    loadChildren: "app/news-letter/newsLetter.module#NewsLetterModule",
    data: { preload: true }
  },
  { path: 'settings', loadChildren: "app/settings/settings.module#SettingsModule" },
  { path: 'system', loadChildren: "app/system/system.module#SystemModule" },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: SelectiveStrategy}),
  ],
})
export class RoutingModule {

}
