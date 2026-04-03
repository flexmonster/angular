import { afterNextRender } from '@angular/core';

export abstract class FlexmonsterSsrBase {
  public readonly loaded: Promise<void>;
  private _resolveLoaded!: () => void;

  constructor() {
    this.loaded = new Promise<void>(resolve => {
      this._resolveLoaded = resolve;
    });
  }

  protected afterNextRenderLoaded(fn: () => Promise<void>): void {
    afterNextRender(async () => {
      await fn();
      this._resolveLoaded();
    });
  }
}