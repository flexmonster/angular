import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { PivotTable, type StateInputParams, type IFMPivotTableOptionsInputParams, type IFMPivotTable } from '@flexmonster/flexmonster';

@Component({
  selector: 'fm-pivot-table',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FMPivotTable implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotTableOptionsInputParams | undefined;

  protected root: HTMLElement;
  public pivotTable!: IFMPivotTable;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.pivotTable = PivotTable(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this.pivotTable) {
      this.pivotTable.dispose();
    }
  }
}
