import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { metaReducers, reducers } from './redux/reducers';
import { TeamEffects } from './redux/effects/team.effects';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './redux/effects/user.effects';
import { AddCoffeeComponent } from './containers/add-coffee/add-coffee.component';
import { AddUserComponent } from './containers/add-user/add-user.component';
import { ManageTeamComponent } from './containers/manage-team/manage-team.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { TeamComponent } from './containers/team/team.component';
import { CreateTeamComponent } from './containers/create-team/create-team.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NotAuthorizedComponent } from './containers/not-authorized/not-authorized.component';
import { UserTileComponent } from './components/user-tile/user-tile.component';
import { SelectUserComponent } from './components/select-user/select-user.component';
import { UserStatsComponent } from './components/user-stats/user-stats.component';
import { UserResolver } from './guards/user.resolver';
import { TeamResolver } from './guards/team.resolver';
import { CanActivateMangeTeam } from './guards/can-manage-team';
import { FakeDataService } from './fakes/fake-data.service';
import { FakeUserService } from './fakes/fake-user.service';
import { FakeTeamService } from './fakes/fake-team.service';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';
import { FakeTransactionService } from './fakes/fake-transaction.service';
import { TransactionService } from './services/transaction.service';
import { TransactionEffects } from './redux/effects/transaction.effects';
import { CommonAppModule } from './common-app.module';
import { RouterModule } from '@angular/router';
import { TransactionSummaryComponent } from './components/transaction-summary/transaction-summary.component';

export const APP_DECLARATIONS = [
  AppComponent,
  HomePageComponent,
  CreateTeamComponent,
  ManageTeamComponent,
  UserListComponent,
  NotAuthorizedComponent,
  NotFoundComponent,
  AddUserComponent,
  TeamComponent,
  AddCoffeeComponent,
  UserTileComponent,
  SelectUserComponent,
  UserStatsComponent,
  TransactionSummaryComponent
];

export const APP_IMPORTS = [
  BrowserModule,
  CommonAppModule,
  EffectsModule.forRoot([TeamEffects, UserEffects, TransactionEffects]),
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
];

export const APP_BOOTSTRAP = [AppComponent];

export const APP_PROVIDERS = [
  FakeDataService,
  CanActivateMangeTeam,
  TeamResolver,
  UserResolver,
  { provide: TeamService, useClass: FakeTeamService },
  { provide: UserService, useClass: FakeUserService },
  { provide: TransactionService, useClass: FakeTransactionService },
];

@NgModule({
  declarations: APP_DECLARATIONS,
  imports: [AppRoutingModule, ...APP_IMPORTS],
  providers: APP_PROVIDERS,
  bootstrap: APP_BOOTSTRAP,
})
export class AppModule {}
