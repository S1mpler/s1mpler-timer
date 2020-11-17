import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './pipes/time.pipe';
import { FormalTimePipe } from './pipes/formal-time.pipe';

@NgModule({
  declarations: [TimePipe, FormalTimePipe],
  imports: [CommonModule],
  exports: [TimePipe, FormalTimePipe],
})
export class SharedModule {}
