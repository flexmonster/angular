import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMPivotFilter, IFMFlatFilter, IFMFilterInputParams , StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-filter',
  standalone: true,
  template: '',
})
export class FlexmonsterFilter extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFilterInputParams | undefined;
  @Input() fieldName: string | undefined;

  public flatFieldList!: IFMPivotFilter | IFMFlatFilter;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterFilter } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterFilter);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.setInput('fieldName', this.fieldName || '');
      ref.changeDetectorRef.detectChanges();
      this.flatFieldList = ref.instance.flatFieldList;
    });
  }
}
