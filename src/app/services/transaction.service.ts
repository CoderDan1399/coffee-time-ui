import { Transaction } from '../redux/models/transaction.model';
import { Observable } from 'rxjs';
import { UserModels } from '../redux/models/user.model';

export interface ITransactionService {
  add(transaction: Transaction, userSecret: string): Observable<null>;
  getUserStatsForTeam(teamId: string): Observable<UserModels.UserStats[]>;
}

export class TransactionService implements ITransactionService {
  add(transaction: Transaction, userSecret: string): Observable<null> {
    return undefined;
  }

  getUserStatsForTeam(teamId: string): Observable<UserModels.UserStats[]> {
    return undefined;
  }
}
