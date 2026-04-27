import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMPivotTable, IFMPivotTableOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'ngx-fm-pivot-table',
  standalone: true,
  template: '',
})
export class FMPivotTable extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotTableOptionsInputParams | undefined;

  public pivotTable!: IFMPivotTable;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMPivotTable } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMPivotTable);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.pivotTable = ref.instance;
    });
  }
}
