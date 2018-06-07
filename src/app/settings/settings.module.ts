import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule } from '@angular/router';

import { ViewLogsComponent } from './view-logs/view-logs.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { SiteSecurityComponent } from './site-security/site-security.component';



const routes = [
  { path: '', component: ViewLogsComponent },
  { path: 'viewLogs', component: ViewLogsComponent, data: { parent: "Settings" } },
  { path: 'viewSchedule', component: ViewScheduleComponent, data: { parent: "Settings" } },
  { path: 'siteSecurity', component: SiteSecurityComponent, data: { parent: "Settings" } },

];
@NgModule({
  imports: [CommonModule, GridModule, RouterModule.forChild(routes)],
  declarations: [ViewLogsComponent, ViewScheduleComponent, SiteSecurityComponent],
  exports: [ViewLogsComponent, ViewScheduleComponent, SiteSecurityComponent],
  providers: []
})
export class SettingsModule { }
