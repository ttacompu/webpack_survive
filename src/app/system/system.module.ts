import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule } from '@angular/router';

import { TagTypeComponent } from './tag-type/tag-type.component';
import { TagNameComponent } from './tag-name/tag-name.component';

const routes = [
  { path: '', component: TagTypeComponent },
  { path: 'tagType', component: TagTypeComponent, data: { parent: "System" } },
  { path: 'tagName', component: TagNameComponent, data: { parent: "System" } },
];
@NgModule({
  imports: [CommonModule, GridModule, RouterModule.forChild(routes)],
  declarations: [TagTypeComponent, TagNameComponent],
  exports: [TagTypeComponent, TagNameComponent],
  providers: []
})
export class SystemModule { }
