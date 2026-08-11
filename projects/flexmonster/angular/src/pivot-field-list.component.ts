import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import {
  PivotFieldList,
  type IFMPivotFieldList,
  type IFMPivotFieldListOptionsInputParams,
  type StateInputParams,
} from '@flexmonster/js';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-pivot-field-list',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMPivotFieldList implements AfterViewInit, OnDestroy, IFMPivotFieldList {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotFieldListOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _pivotFieldList!: IFMPivotFieldList;
  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    const state = this.state ?? this.stateContext?.state;
    this._pivotFieldList = PivotFieldList(container, { state, options: this.options });
  }

  ngOnDestroy() {
    if (this._pivotFieldList) {
      this._pivotFieldList.dispose();
    }
  }

  get id(): string { return this._pivotFieldList.id; }
  get parentId(): string { return this._pivotFieldList.parentId; }
  get stateId(): string { return this._pivotFieldList.stateId; }

  getOptions(): any { return this._pivotFieldList.getOptions(); }
  dispose(): void { this._pivotFieldList.dispose(); }
}
