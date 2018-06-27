import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  APP_DECLARATIONS,
  APP_IMPORTS,
  APP_PROVIDERS,
} from '../app/app.module';
import { AppComponent } from '../app/app.component';
import { Router, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { By } from '@angular/platform-browser';
import { ROUTES } from '../app/app-routing.module';

import { detectChanges } from '@angular/core/src/render3';
import { TestDeHelpers } from '../app/common/test/dom-helpers.spec';
describe('create team tests', function() {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  beforeEach(
    fakeAsync(function() {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(ROUTES, {
            enableTracing: true,
            useHash: true,
          }),
          ...APP_IMPORTS,
        ],
        declarations: [...APP_DECLARATIONS],
        providers: [
          ...APP_PROVIDERS,
          { provide: APP_BASE_HREF, useValue: '/' },
        ],
      });
      fixture = TestBed.createComponent(AppComponent);
      router = TestBed.get(Router);
      router.navigateByUrl('/');
      flush();
      TestDeHelpers.detectChangesWhenStable(fixture);
    })
  );

  it('should display homepage', function() {
    TestDeHelpers.expectTestIdExists('home-page', fixture.debugElement);
  });

  it(
    'should navigate to create team page when create team button clicked',
    fakeAsync(function() {
      let button = TestDeHelpers.getByTestId(
        'create-team-button',
        fixture.debugElement
      );
      button.nativeElement.click();
      flush();
      TestDeHelpers.detectChangesWhenStable(fixture);

      TestDeHelpers.expectTestIdExists(
        'create-team-page',
        fixture.debugElement
      );
    })
  );
});
