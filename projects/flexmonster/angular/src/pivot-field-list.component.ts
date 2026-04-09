import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { PivotFieldList, type IFMPivotFieldList, type IFMPivotFieldListOptionsInputParams,type StateInputParams } from '@flexmonster/flexmonster';

@Component({
  selector: 'fm-pivot-field-list',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FMPivotFieldList implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotFieldListOptionsInputParams | undefined;

  protected root: HTMLElement;
  public pivotFieldList!: IFMPivotFieldList;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.pivotFieldList = PivotFieldList(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this.pivotFieldList) {
      this.pivotFieldList.dispose();
    }
  }
}
