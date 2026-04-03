import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Toolbar, type StateInputParams, type IFMToolbarOptionsInputParams, type IFMPivotTable, IFMToolbar } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-toolbar',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterToolbar implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMToolbarOptionsInputParams | undefined;

  protected root: HTMLElement;
  public toolbar!: IFMToolbar;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.toolbar = Toolbar(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this.toolbar) {
      this.toolbar.dispose();
    }
  }
}
