import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimerBarComponent } from './components/timer-bar/timer-bar.component';
import { TimerOverviewComponent } from './containers/timer-overview/timer-overview.component';
import { TimerRoutingModule } from './timer-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';
import { TaskGroupComponent } from './components/task-group/task-group.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    TimerBarComponent,
    TimerOverviewComponent,
    CompletedTaskComponent,
    TaskGroupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TimerRoutingModule,
    NgSelectModule,
    FormsModule,
    InlineSVGModule,
  ],
})
export class TimerModule {}
