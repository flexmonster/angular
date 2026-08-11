import { Component, forwardRef, Input } from '@angular/core';
import type { StateInputParams } from '@flexmonster/js';
import { FM_STATE_CONTEXT, type FMStateContext } from './state-context';

@Component({
  selector: 'ngx-fm-group',
  standalone: true,
  template: '<ng-content></ng-content>',
  providers: [{ provide: FM_STATE_CONTEXT, useExisting: forwardRef(() => FMGroup) }],
})
export class FMGroup implements FMStateContext {
  @Input() state: StateInputParams | undefined;
}
