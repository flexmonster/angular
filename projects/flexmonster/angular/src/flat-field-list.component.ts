import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { FlatFieldList, type IFMFlatFieldList, type IFMFlatFieldListOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-flat-field-list',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterFlatFieldList implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatFieldListOptionsInputParams | undefined;

  protected root: HTMLElement;
  public flatFieldList!: IFMFlatFieldList;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.flatFieldList = FlatFieldList(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this.flatFieldList) {
      this.flatFieldList.dispose();
    }
  }
}
