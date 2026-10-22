import { InjectionToken } from '@angular/core';
import type { IFMStateInputParams } from '@flexmonster/js';

export interface FMStateContext {
  readonly state: IFMStateInputParams | undefined;
}

export const FM_STATE_CONTEXT = new InjectionToken<FMStateContext>('FM_STATE_CONTEXT');
