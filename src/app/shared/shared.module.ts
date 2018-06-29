import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

/* third party kendo modules */
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ValidationRuleService } from './validationRuleService'


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ButtonsModule, GridModule, DropDownsModule],
  providers: [ValidationRuleService],
  exports: [CommonModule, ReactiveFormsModule,  ButtonsModule, GridModule, DropDownsModule]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    }
  }
}
