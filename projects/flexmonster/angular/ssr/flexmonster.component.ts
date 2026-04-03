import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMComposite, IFMCompositeOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-composite',
  standalone: true,
  template: '',
})
export class FlexmonsterComposite extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMCompositeOptionsInputParams | undefined;

  public flexmonster!: IFMComposite;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterComposite } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterComposite);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flexmonster = ref.instance.flexmonster;
    });
  }
}
