import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      // Secondary routes required a named outlet
      // any secondary routes are defined in the url within parenthesis,
      // they contain the name of the outlet and the name of the path to load
      {path: 'messages', component: MessageComponent, outlet: 'popup'}
    ])
  ],
  declarations: [
    MessageComponent
  ]
})
export class MessageModule { }
