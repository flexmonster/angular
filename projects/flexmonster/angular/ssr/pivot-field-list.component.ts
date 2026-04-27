import { Component, Input, ViewContainerRef } from '@angular/core';
import type { IFMPivotFieldList, IFMPivotFieldListOptionsInputParams, StateInputParams } from '@flexmonster/js';
import { FMSsrBase } from './flexmonster-ssr-base.component';

@Component({
  selector: 'ngx-fm-pivot-field-list',
  standalone: true,
  template: '',
})
export class FMPivotFieldList extends FMSsrBase {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotFieldListOptionsInputParams | undefined;

  public pivotFieldList!: IFMPivotFieldList;

  constructor(private vcr: ViewContainerRef) {
    super();
    this.afterNextRenderLoaded(async () => {
      const { FMPivotFieldList } = await import('@flexmonster/angular');
      const ref = this.vcr.createComponent(FMPivotFieldList);
      ref.setInput('state', this.state);
      ref.setInput('options', this.options);
      ref.changeDetectorRef.detectChanges();
      this.pivotFieldList = ref.instance;
    });
  }
}
