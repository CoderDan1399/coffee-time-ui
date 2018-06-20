import { NgModule } from '@angular/core';
import { CommonModule as ngCommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const IMPORTS_EXPORTS = [ngCommonModule, FormsModule, ReactiveFormsModule];

@NgModule({ imports: IMPORTS_EXPORTS, exports: IMPORTS_EXPORTS })
export class CommonAppModule {}
