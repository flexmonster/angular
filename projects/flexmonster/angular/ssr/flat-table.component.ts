import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlatTable, IFMFlatTableOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-flat-table',
  standalone: true,
  template: '',
})
export class FlexmonsterFlat extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatTableOptionsInputParams | undefined;

  public flatTable!: IFMFlatTable;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterFlat } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterFlat);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flatTable = ref.instance.flatTable;
    });
  }
}
