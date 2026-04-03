import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMPivotFieldList, IFMPivotFieldListOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-pivot-field-list',
  standalone: true,
  template: '',
})
export class FlexmonsterPivotFieldList extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotFieldListOptionsInputParams | undefined;

  public pivotFieldList!: IFMPivotFieldList;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterPivotFieldList } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterPivotFieldList);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.pivotFieldList = ref.instance.pivotFieldList;
    });
  }
}
