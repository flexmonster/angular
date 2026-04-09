import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMFilter, IFMFilterInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'fm-filter',
  standalone: true,
  template: '',
})
export class FMFilter extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFilterInputParams | undefined;
  @Input() fieldName: string | undefined;

  public filter!: IFMFilter;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFilter } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFilter);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.setInput('fieldName', this.fieldName || '');
      ref.changeDetectorRef.detectChanges();
      this.filter = ref.instance;
    });
  }
}
