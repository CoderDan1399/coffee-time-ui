import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoffeeComponent } from './add-coffee.component';
import { CommonAppModule } from '../../common-app.module';
import { SelectUserComponent } from '../../components/select-user/select-user.component';
import { UserTileComponent } from '../../components/user-tile/user-tile.component';
import { CommonTestingModule } from '../../common/test/common-testing-module';

describe('AddCoffeeComponent', () => {
  let component: AddCoffeeComponent;
  let fixture: ComponentFixture<AddCoffeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonAppModule, CommonTestingModule],
      declarations: [
        AddCoffeeComponent,
        SelectUserComponent,
        UserTileComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
