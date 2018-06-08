import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { CreateTeamComponent } from './containers/create-team/create-team.component';
import { ManageTeamComponent } from './containers/manage-team/manage-team.component';

const routes: Routes = [
  { path: 'create-team', component: CreateTeamComponent },
  { path: 'team/:id/manage', component: ManageTeamComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
