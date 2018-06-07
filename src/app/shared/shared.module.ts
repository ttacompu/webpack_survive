import { NgModule, ModuleWithProviders } from '@angular/core';
@NgModule({
  
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    }
  }
}
