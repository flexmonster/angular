import { NgModule } from '@angular/core';
import { FlexmonsterComposite } from './flexmonster.component';
import { FlexmonsterFlat } from './flat-table.component';
import { FlexmonsterFlatFieldList } from './flat-field-list';
import { FlexmonsterPivot } from './pivot-table.component';
import { FlexmonsterPivotFieldList } from './pivot-field-list';
import { FlexmonsterToolbar } from './toolbar.component';

@NgModule({
    imports: [
        FlexmonsterComposite,
        FlexmonsterFlat,
        FlexmonsterFlatFieldList,
        FlexmonsterPivot,
        FlexmonsterPivotFieldList,
        FlexmonsterToolbar,
    ],
    exports: [
        FlexmonsterComposite,
        FlexmonsterFlat,
        FlexmonsterFlatFieldList,
        FlexmonsterPivot,
        FlexmonsterPivotFieldList,
        FlexmonsterToolbar,
    ]
})
export class FlexmonsterModule{ }