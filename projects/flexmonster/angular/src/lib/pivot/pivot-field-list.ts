import { afterNextRender, Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'flexmonster-pivot-field-list',
    standalone: true,
    template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterPivotFieldList {
    @Input() state: any;
    @Input() options: any;

    private root: HTMLElement;
    public pivotFieldList: any;

    constructor(el: ElementRef) {
        this.root = <HTMLElement>el.nativeElement;
        afterNextRender(async () => {
          //@ts-ignore
          const { PivotFieldList } = await import('@flexmonster/flexmonster');
          const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
          this.pivotFieldList = PivotFieldList(container, {
              "state": this.state,
              "options": this.options
          });
        });
    }

    ngOnDestroy() {
        if (this.pivotFieldList) {
            this.pivotFieldList.dispose();
            this.pivotFieldList = null;
        }
    }

}
