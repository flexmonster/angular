import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMFlatFieldList, IFMFlatFieldListOptionsInputParams, StateInputParams } from '@flexmonster/flexmonster';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'fm-flat-field-list',
  standalone: true,
  template: '',
})
export class FMFlatFieldList extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatFieldListOptionsInputParams | undefined;

  public flatFieldList!: IFMFlatFieldList;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMFlatFieldList } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMFlatFieldList);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.flatFieldList = ref.instance;
    });
  }
}
