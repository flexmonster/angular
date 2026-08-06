import { InjectionToken } from '@angular/core';
import type { StateInputParams } from '@flexmonster/js';

export interface FMStateContext {
  readonly state: StateInputParams | undefined;
}

export const FM_STATE_CONTEXT = new InjectionToken<FMStateContext>('FM_STATE_CONTEXT');
