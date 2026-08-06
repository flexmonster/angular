import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlatTable, IFMFlatTableOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-flat-table',
  standalone: true,
  template: '',
})
export class FMFlatTable extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatTableOptionsInputParams | undefined;
  @Input() name: string | undefined;

  public flatTable!: IFMFlatTable;

  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFlatTable } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFlatTable);
      ref.setInput('state', this.state ?? this.stateContext?.state);
      ref.setInput('options', this.options);
      ref.setInput('name', this.name);
      ref.changeDetectorRef.detectChanges();
      this.flatTable = ref.instance;
    });
  }
}
