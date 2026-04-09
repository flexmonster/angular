import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  PivotFieldList,
  type IFMPivotFieldList,
  type IFMPivotFieldListOptionsInputParams,
  type StateInputParams,
} from '@flexmonster/flexmonster';

@Component({
  selector: 'fm-pivot-field-list',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FMPivotFieldList implements AfterViewInit, OnDestroy, IFMPivotFieldList {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotFieldListOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _pivotFieldList!: IFMPivotFieldList;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._pivotFieldList = PivotFieldList(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this._pivotFieldList) {
      this._pivotFieldList.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._pivotFieldList.id; }
  get parentId(): string { return this._pivotFieldList.parentId; }
  get stateId(): string { return this._pivotFieldList.stateId; }

  // Methods
  getOptions(): any { return this._pivotFieldList.getOptions(); }
  dispose(): void { this._pivotFieldList.dispose(); }
}
