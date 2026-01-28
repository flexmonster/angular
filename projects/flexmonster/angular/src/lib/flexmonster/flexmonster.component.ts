import { Component, ElementRef, Inject, Injectable, Input } from '@angular/core';
//@ts-ignore
import { Flexmonster } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-composite',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterComposite {
  @Input() state: any;
  @Input() options: any;

  private root: HTMLElement;
  public flexmonster: Flexmonster.Pivot;

  constructor(el: ElementRef) {
    this.root = <HTMLElement>el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.flexmonster = Flexmonster(container, {
      "state": this.state,
      "options": this.options 
    });
  }

  ngOnDestroy() {
    if (this.flexmonster) {
      this.flexmonster.dispose();
      this.flexmonster = null;
    }
  }
}
