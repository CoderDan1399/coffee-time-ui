import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { CreateTeamComponent } from './containers/create-team/create-team.component';
import { ManageTeamComponent } from './containers/manage-team/manage-team.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { CanActivateMangeTeam } from './guards/can-manage-team';
import { NotAuthorizedComponent } from './containers/not-authorized/not-authorized.component';
import { TeamResolver } from './guards/team-resolver';

const routes: Routes = [
  { path: 'create-team', component: CreateTeamComponent },
  {
    path: 'team/manage',
    component: ManageTeamComponent,
    resolve: { team: TeamResolver },
    canActivate: [CanActivateMangeTeam],
  },
  { path: '', component: HomePageComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
