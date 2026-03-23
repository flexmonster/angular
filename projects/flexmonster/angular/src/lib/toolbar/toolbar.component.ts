import { afterNextRender, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'flexmonster-toolbar',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterToolbar {
  @Input() state: any;

  private root: HTMLElement;
  public toolbar: any;

  constructor(el: ElementRef) {
    this.root = <HTMLElement>el.nativeElement;
    afterNextRender(async () => {
      //@ts-ignore
      const { Toolbar } = await import('@flexmonster/flexmonster');
      const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
      this.toolbar = Toolbar(container, {
        "state": this.state,
      });
    });
  }

  ngOnDestroy() {
    if (this.toolbar) {
      this.toolbar.dispose();
      this.toolbar = null;
    }
  }

}
