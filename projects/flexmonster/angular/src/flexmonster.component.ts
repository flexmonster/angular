import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { Flexmonster, type IFMComposite, type IFMCompositeOptionsInputParams, type StateInputParams } from '@flexmonster/flexmonster';

@Component({
  selector: 'fm-flexmonster',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FMFlexmonster implements AfterViewInit {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMCompositeOptionsInputParams | undefined;

  protected root: HTMLElement;
  public flexmonster!: IFMComposite;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.flexmonster = Flexmonster(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this.flexmonster) {
      this.flexmonster.dispose();
    }
  }
}
