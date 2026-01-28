import { Component, ElementRef, Inject, Injectable, Input } from '@angular/core';
//@ts-ignore
import { FlatFieldList } from '@flexmonster/flexmonster';

@Component({
  selector: 'flexmonster-flat-field-list',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FlexmonsterFlatFieldList {
  @Input() state: any;
  @Input() options: any;

  private root: HTMLElement;
  public flatFieldList: FlatFieldList;

  constructor(el: ElementRef) {
    this.root = <HTMLElement>el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this.flatFieldList = FlatFieldList(container, {
      "state": this.state,
      "options": this.options 
    });
  }

  ngOnDestroy() {
    if (this.flatFieldList) {
      this.flatFieldList.dispose();
      this.flatFieldList = null;
    }
  }

}
