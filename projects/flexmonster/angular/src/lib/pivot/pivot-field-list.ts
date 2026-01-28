import { Component, ElementRef, Inject, Injectable, Input } from '@angular/core';
//@ts-ignore
import { PivotFieldList } from '@flexmonster/flexmonster';

@Component({
    selector: 'flexmonster-pivot-field-list',
    standalone: true,
    template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterPivotFieldList {
    @Input() state: any;
    @Input() options: any;

    private root: HTMLElement;
    public pivotFieldList: PivotFieldList;

    constructor(el: ElementRef) {
        this.root = <HTMLElement>el.nativeElement;
    }

    ngAfterViewInit() {
        const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
        this.pivotFieldList = PivotFieldList(container, {
            "state": this.state,
            "options": this.options
        });
    }

    ngOnDestroy() {
        if (this.pivotFieldList) {
            this.pivotFieldList.dispose();
            this.pivotFieldList = null;
        }
    }

}
