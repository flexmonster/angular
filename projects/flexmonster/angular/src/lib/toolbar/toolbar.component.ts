import { Component, ElementRef, Inject, Injectable, Input } from '@angular/core';
//@ts-ignore
import { Toolbar } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-toolbar',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterToolbar {
  @Input() state: any;

  private root: HTMLElement;
  public toolbar: Toolbar;

  constructor(el: ElementRef) {
    this.root = <HTMLElement>el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.toolbar = Toolbar(container, {
      "state": this.state,
    });
  }

  ngOnDestroy() {
    if (this.toolbar) {
      this.toolbar.dispose();
      this.toolbar = null;
    }
  }

}
