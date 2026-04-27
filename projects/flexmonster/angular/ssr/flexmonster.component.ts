import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlexmonster, IFMFlexmonsterOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'ngx-fm-flexmonster',
  standalone: true,
  template: '',
})
export class FMFlexmonster extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlexmonsterOptionsInputParams | undefined;

  public flexmonster!: IFMFlexmonster;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFlexmonster } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFlexmonster);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flexmonster = ref.instance;
    });
  }
}
