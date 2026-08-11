import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlatFieldList, IFMFlatFieldListOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-flat-field-list',
  standalone: true,
  template: '',
})
export class FMFlatFieldList extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatFieldListOptionsInputParams | undefined;

  public flatFieldList!: IFMFlatFieldList;

  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFlatFieldList } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFlatFieldList);
      ref.setInput('state', this.state ?? this.stateContext?.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flatFieldList = ref.instance;
    });
  }
}
