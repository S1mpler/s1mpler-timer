import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimerOverviewComponent } from './containers/timer-overview/timer-overview.component';

const routes: Routes = [
  {
    path: '',
    component: TimerOverviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimerRoutingModule {}
