import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';
import { TestingCompiler } from '@angular/core/testing/src/test_compiler';

export namespace TestDeHelpers {
  /**
   *
   * @param testId data test id attribute value
   * @param de debug element
   */
  export function getByTestId(testId: string, de: DebugElement): DebugElement {
    return de.query(By.css(`[data-test-id="${testId}"]`));
  }

  export function detectChangesWhenStable(
    fixture: ComponentFixture<any>
  ): Promise<any> {
    return fixture.whenStable().then(() => fixture.detectChanges());
  }

  export function expectTestIdExists(testId: string, de: DebugElement) {
    expect(getByTestId(testId, de)).not.toBeNull(
      testId + ' does not exist where it should'
    );
  }
}
