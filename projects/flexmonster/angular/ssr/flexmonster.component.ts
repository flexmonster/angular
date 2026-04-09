import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMComposite, IFMCompositeOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'fm-flexmonster',
  standalone: true,
  template: '',
})
export class FMFlexmonster extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMCompositeOptionsInputParams | undefined;

  public flexmonster!: IFMComposite;

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
