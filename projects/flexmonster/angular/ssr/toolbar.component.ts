import { Component, inject, Input, ViewContainerRef } from '@angular/core';
import type { IFMToolbar, IFMToolbarOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-toolbar',
  standalone: true,
  template: '',
})
export class FMToolbar extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMToolbarOptionsInputParams | undefined;

  public toolbar!: IFMToolbar;

  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMToolbar } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMToolbar);
      ref.setInput('state', this.state ?? this.stateContext?.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.toolbar = ref.instance;
    });
  }
}
