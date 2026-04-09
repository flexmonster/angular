import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMToolbar, IFMToolbarOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'fm-toolbar',
  standalone: true,
  template: '',
})
export class FMToolbar extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMToolbarOptionsInputParams | undefined;

  public toolbar!: IFMToolbar;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMToolbar } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMToolbar);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.toolbar = ref.instance;
    });
  }
}
