import { Observable } from 'rxjs';
import { UserModels } from '../redux/models/user.model';
import { TransactionModels } from '../redux/models/transaction.model';

export interface ITransactionService {
  add(
    transaction: TransactionModels.Transaction,
    userSecret: string
  ): Observable<null>;
  getUserStatsForTeam(teamId: string): Observable<UserModels.UserStats[]>;
}

export class TransactionService implements ITransactionService {
  add(
    transaction: TransactionModels.Transaction,
    userSecret: string
  ): Observable<null> {
    return undefined;
  }

  getUserStatsForTeam(teamId: string): Observable<UserModels.UserStats[]> {
    return undefined;
  }
}
