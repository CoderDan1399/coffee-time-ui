import { AppComponent } from './app.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { CreateTeamComponent } from './containers/create-team/create-team.component';
import { ManageTeamComponent } from './containers/manage-team/manage-team.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotAuthorizedComponent } from './containers/not-authorized/not-authorized.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { AddUserComponent } from './containers/add-user/add-user.component';
import { TeamComponent } from './containers/team/team.component';

export const DECLARATIONS = [
  AppComponent,
  HomePageComponent,
  CreateTeamComponent,
  ManageTeamComponent,
  UserListComponent,
  NotAuthorizedComponent,
  NotFoundComponent,
  AddUserComponent,
  TeamComponent,
];
