import { NgModule } from '@angular/core';
import { FMFlexmonster } from './flexmonster.component';
import { FMFlatTable } from './flat-table.component';
import { FMFlatFieldList } from './flat-field-list.component';
import { FMPivotTable } from './pivot-table.component';
import { FMPivotFieldList } from './pivot-field-list.component';
import { FMToolbar } from './toolbar.component';
import { FMFilter } from './filter.component';

@NgModule({
    imports: [
        FMFlexmonster,
        FMFlatTable,
        FMFlatFieldList,
        FMPivotTable,
        FMPivotFieldList,
        FMToolbar,
        FMFilter,
    ],
    exports: [
        FMFlexmonster,
        FMFlatTable,
        FMFlatFieldList,
        FMPivotTable,
        FMPivotFieldList,
        FMToolbar,
        FMFilter,
    ]
})
export class FMModule{ }
