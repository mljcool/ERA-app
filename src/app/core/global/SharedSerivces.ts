import { FirebaseUIModule } from 'firebaseui-angular';

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AssistanceCoreServices } from './Services/AssistanceCore.service';

@NgModule({
  imports: [
    CommonModule,

  ],
  exports: [
    CommonModule,
    FirebaseUIModule
  ]
})
export class ServicesSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesSharedModule,
      providers: [AssistanceCoreServices],
    }
  }

}
