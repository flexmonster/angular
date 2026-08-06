import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import {
  Toolbar,
  type IFMToolbar,
  type IFMToolbarOptionsInputParams,
  type StateInputParams,
} from '@flexmonster/js';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-toolbar',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMToolbar implements AfterViewInit, OnDestroy, IFMToolbar {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMToolbarOptionsInputParams | undefined;
  @Input() for: string | undefined;

  protected root: HTMLElement;
  private _toolbar!: IFMToolbar;
  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    const state = this.state ?? this.stateContext?.state;
    // The standalone `for` input takes priority; fall back to `options.for` when it is empty.
    const options = this.for ? { ...this.options, for: this.for } : this.options;
    this._toolbar = Toolbar(container, { state: state, options });
  }

  ngOnDestroy() {
    if (this._toolbar) {
      this._toolbar.dispose();
    }
  }

  get id(): string { return this._toolbar.id; }
  get parentId(): string { return this._toolbar.parentId; }
  get stateId(): string { return this._toolbar.stateId; }

  getOptions(): any { return this._toolbar.getOptions(); }
  dispose(): void { this._toolbar.dispose(); }
  openFieldList(): void { this._toolbar.openFieldList(); }
  closeFieldList(): void { this._toolbar.closeFieldList(); }
}
