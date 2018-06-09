import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { CreateTeamComponent } from './containers/create-team/create-team.component';
import { reducers, metaReducers } from './redux/reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManageTeamComponent } from './containers/manage-team/manage-team.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FakeDataService } from './fakes/fake-data.service';
import { FakeTeamService } from './fakes/fake-team.service';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';
import { FakeUserService } from './fakes/fake-user.service';
import { TeamEffects } from './redux/effects/team.effects';
import { EffectsModule } from '@ngrx/effects';
import { NotAuthorizedComponent } from './containers/not-authorized/not-authorized.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { CanActivateMangeTeam } from './guards/can-manage-team';
import { TeamResolver } from './guards/team-resolver';

const DECLARATIONS = [
  AppComponent,
  HomePageComponent,
  CreateTeamComponent,
  ManageTeamComponent,
  UserListComponent,
  NotAuthorizedComponent,
  NotFoundComponent,
];

const IMPORTS = [
  BrowserModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  EffectsModule.forRoot([TeamEffects]),
];

const FAKE_SERVICES = [
  { provide: TeamService, useClass: FakeTeamService },
  { provide: UserService, useClass: FakeUserService },
];
const SERVICES = [TeamService, UserService];

const PROVIDERS = [
  FakeDataService,
  CanActivateMangeTeam,
  TeamResolver,
  ...FAKE_SERVICES,
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [
    ...IMPORTS,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),
    AppRoutingModule,
  ],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
