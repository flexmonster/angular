import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Filter, type IFMPivotFilter, type IFMFlatFilter,  type IFMFilterInputParams, type StateInputParams } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-filter',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterFilter implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFilterInputParams | undefined;
  @Input() fieldName: string | undefined;

  protected root: HTMLElement;
  public flexmonsterFilter!: IFMPivotFilter | IFMFlatFilter;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.flexmonsterFilter = Filter(container, { state: this.state, options: this.options, fieldName: this.fieldName! });
  }

  ngOnDestroy() {
    if (this.flexmonsterFilter) {
      this.flexmonsterFilter.dispose();
    }
  }
}
