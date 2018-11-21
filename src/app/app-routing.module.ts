import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarblesComponent } from './components/marbles/marbles';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'start' },
  { path: 'start', component: MarblesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
