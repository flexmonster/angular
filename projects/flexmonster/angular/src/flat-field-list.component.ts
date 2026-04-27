import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  FlatFieldList,
  type IFMFlatFieldList,
  type IFMFlatFieldListOptionsInputParams,
  type StateInputParams,
} from '@flexmonster/js';

@Component({
  selector: 'ngx-fm-flat-field-list',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMFlatFieldList implements AfterViewInit, OnDestroy, IFMFlatFieldList {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatFieldListOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _flatFieldList!: IFMFlatFieldList;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._flatFieldList = FlatFieldList(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this._flatFieldList) {
      this._flatFieldList.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._flatFieldList.id; }
  get parentId(): string { return this._flatFieldList.parentId; }
  get stateId(): string { return this._flatFieldList.stateId; }

  // Methods
  getOptions(): any { return this._flatFieldList.getOptions(); }
  dispose(): void { this._flatFieldList.dispose(); }
}
