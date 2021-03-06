import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'timer',
    pathMatch: 'full',
  },
  {
    path: 'timer',
    loadChildren: () => import('./timer/timer.module').then(m => m.TimerModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
