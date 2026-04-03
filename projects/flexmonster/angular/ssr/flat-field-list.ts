import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlatFieldList, IFMFlatFieldListOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FlexmonsterSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'flexmonster-flat-field-list',
  standalone: true,
  template: '',
})
export class FlexmonsterFlatFieldList extends FlexmonsterSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatFieldListOptionsInputParams | undefined;

  public flatFieldList!: IFMFlatFieldList;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FlexmonsterFlatFieldList } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FlexmonsterFlatFieldList);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flatFieldList = ref.instance.flatFieldList;
    });
  }
}
