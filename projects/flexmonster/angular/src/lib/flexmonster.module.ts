import { NgModule } from '@angular/core';
import { FlexmonsterComposite } from './flexmonster/flexmonster.component';
import { FlexmonsterFlat } from './flat/flat-table.component';
import { FlexmonsterPivot } from './pivot/pivot-table.component';
import { FlexmonsterToolbar } from './toolbar/toolbar.component';
import { FlexmonsterFlatFieldList } from './flat/flat-field-list';
import { FlexmonsterPivotFieldList } from './pivot/pivot-field-list';

@NgModule({
    imports: [
        FlexmonsterComposite,
        FlexmonsterFlat,
        FlexmonsterPivot,
        FlexmonsterToolbar,
        FlexmonsterFlatFieldList,
        FlexmonsterPivotFieldList
    ],
    exports: [
        FlexmonsterComposite,
        FlexmonsterFlat,
        FlexmonsterPivot,
        FlexmonsterToolbar,
        FlexmonsterFlatFieldList,
        FlexmonsterPivotFieldList
    ]
})
export class FlexmonsterModule { }