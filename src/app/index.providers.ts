import { TeamService } from './services/team.service';
import { FakeTeamService } from './fakes/fake-team.service';
import { FakeUserService } from './fakes/fake-user.service';
import { UserService } from './services/user.service';
import { FakeDataService } from './fakes/fake-data.service';
import { CanActivateMangeTeam } from './guards/can-manage-team';
import { TeamResolver } from './guards/team-resolver';

const FAKE_SERVICES = [
  { provide: TeamService, useClass: FakeTeamService },
  { provide: UserService, useClass: FakeUserService },
];
const SERVICES = [TeamService, UserService];

export const PROVIDERS = [
  FakeDataService,
  CanActivateMangeTeam,
  TeamResolver,
  ...FAKE_SERVICES,
];
