import { Component, ElementRef, Inject, Injectable, Input } from '@angular/core';
//@ts-ignore
import { PivotTable } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-pivot-table',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterPivot {
  @Input() state: any;
  @Input() options: any;

  private root: HTMLElement;
  public pivotTable: PivotTable;

  constructor(el: ElementRef) {
    this.root = <HTMLElement>el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.pivotTable = PivotTable(container, {
      "state": this.state,
      "options": this.options 
    });
  }

  ngOnDestroy() {
    if (this.pivotTable) {
      this.pivotTable.dispose();
      this.pivotTable = null;
    }
  }

}
