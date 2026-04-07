import { NgModule } from '@angular/core';
import { FlexmonsterComposite } from './flexmonster.component';
import { FlexmonsterFlat } from './flat-table.component';
import { FlexmonsterFlatFieldList } from './flat-field-list.component';
import { FlexmonsterPivot } from './pivot-table.component';
import { FlexmonsterPivotFieldList } from './pivot-field-list.component';
import { FlexmonsterToolbar } from './toolbar.component';
import { FlexmonsterFilter } from './filter.component';

@NgModule({
    imports: [
        FlexmonsterComposite,
        FlexmonsterFlat,
        FlexmonsterFlatFieldList,
        FlexmonsterPivot,
        FlexmonsterPivotFieldList,
        FlexmonsterToolbar,
        FlexmonsterFilter,
    ],
    exports: [
        FlexmonsterComposite,
        FlexmonsterFlat,
        FlexmonsterFlatFieldList,
        FlexmonsterPivot,
        FlexmonsterPivotFieldList,
        FlexmonsterToolbar,
        FlexmonsterFilter,
    ]
})
export class FlexmonsterModule{ }