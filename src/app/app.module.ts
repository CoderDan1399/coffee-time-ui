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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamEffects } from './redux/effects/team.effects';
import { EffectsModule } from '@ngrx/effects';
import { PROVIDERS } from './index.providers';
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

const IMPORTS = [
  BrowserModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  EffectsModule.forRoot([TeamEffects, UserEffects]),
];

@NgModule({
  declarations: [
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
  ],
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
