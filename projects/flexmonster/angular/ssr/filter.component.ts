import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import type { IFMFilterOptionsInputParams, IFMFilter, IFMStateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-filter',
  standalone: true,
  template: '',
})
export class FMFilter extends FMSsrBase {
  @Input() state: IFMStateInputParams | undefined;
  @Input() options: IFMFilterOptionsInputParams | undefined;
  @Input() fieldName: string | undefined;

  public filter!: IFMFilter;

  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFilter } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFilter);
      ref.setInput('state', this.state ?? this.stateContext?.state);
      ref.setInput('options', this.options);
      ref.setInput('fieldName', this.fieldName || '');
      ref.changeDetectorRef.detectChanges();
      this.filter = ref.instance;
    });
  }
}
