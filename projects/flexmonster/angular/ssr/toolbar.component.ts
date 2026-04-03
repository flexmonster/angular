import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMToolbar, IFMToolbarOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-toolbar',
  standalone: true,
  template: '',
})
export class FlexmonsterToolbar extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMToolbarOptionsInputParams | undefined;

  public toolbar!: IFMToolbar;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterToolbar } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterToolbar);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.toolbar = ref.instance.toolbar;
    });
  }
}
