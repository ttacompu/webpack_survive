import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule } from '@angular/router';

import { ViewNewsLettersComponent } from './view-news-letters/view-news-letters.component';
import { NewsLetterArchiveComponent } from './news-letter-archive/news-letter-archive.component';
import { CreateNewsLetterComponent } from './create-news-letter/create-news-letter.component';

import { NewsLetterService } from './services/newsLetterService';

const routes = [
  { path: '', component: ViewNewsLettersComponent },
  { path: 'viewNewsLetters', component: ViewNewsLettersComponent, data: { parent: "News Letter" } },
  { path: 'newsLetterArchive', component: NewsLetterArchiveComponent, data: { parent: "News Letter" } },
  { path: 'createNewsLetter', component: CreateNewsLetterComponent, data: { parent: "News Letter" } },

];
@NgModule({
  imports: [CommonModule, GridModule, RouterModule.forChild(routes)],
  declarations: [ViewNewsLettersComponent, NewsLetterArchiveComponent, CreateNewsLetterComponent],
  exports: [ViewNewsLettersComponent, NewsLetterArchiveComponent, CreateNewsLetterComponent],
  providers: [NewsLetterService]
})
export class NewsLetterModule { }
