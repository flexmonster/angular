import { afterNextRender, Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'flexmonster-flat-table',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterFlat {
  @Input() state: any;
  @Input() options: any;

  private root: HTMLElement;
  public flatTable: any;

  constructor(el: ElementRef) {
    this.root = <HTMLElement>el.nativeElement;
    afterNextRender(async () => {
      //@ts-ignore
      const { FlatTable } = await import('@flexmonster/flexmonster');
      const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
      this.flatTable = FlatTable(container, {
        "state": this.state,
        "options": this.options
      });
    });
  }

}
