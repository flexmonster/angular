import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlatTable, IFMFlatTableOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'ngx-fm-flat-table',
  standalone: true,
  template: '',
})
export class FMFlatTable extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatTableOptionsInputParams | undefined;

  public flatTable!: IFMFlatTable;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFlatTable } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFlatTable);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flatTable = ref.instance;
    });
  }
}
