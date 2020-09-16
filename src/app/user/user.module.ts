import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [LoginComponent],
  exports:[LoginComponent]
})
export class UserModule {}
