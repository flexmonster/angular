import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMPivotTable, IFMPivotTableOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-pivot-table',
  standalone: true,
  template: '',
})
export class FlexmonsterPivot extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotTableOptionsInputParams | undefined;

  public pivotTable!: IFMPivotTable;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterPivot } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterPivot);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.pivotTable = ref.instance.pivotTable;
    });
  }
}
