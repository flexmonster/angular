import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import type { IFMPivotTable, IFMPivotTableOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-pivot-table',
  standalone: true,
  template: '',
})
export class FMPivotTable extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotTableOptionsInputParams | undefined;
  @Input() name: string | undefined;

  public pivotTable!: IFMPivotTable;

  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMPivotTable } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMPivotTable);
      ref.setInput('state', this.state ?? this.stateContext?.state);
      ref.setInput('options', this.options);
      ref.setInput('name', this.name);
      ref.changeDetectorRef.detectChanges();
      this.pivotTable = ref.instance;
    });
  }
}
