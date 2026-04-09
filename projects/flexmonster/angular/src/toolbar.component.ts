import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  Toolbar,
  type IFMToolbar,
  type IFMToolbarOptionsInputParams,
  type StateInputParams,
} from '@flexmonster/flexmonster';

@Component({
  selector: 'fm-toolbar',
  standalone: true,
  template: '<div style="width:100%;height:100%;"><div class="fm-ng-wrapper"></div></div>',
})
export class FMToolbar implements AfterViewInit, OnDestroy, IFMToolbar {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMToolbarOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _toolbar!: IFMToolbar;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._toolbar = Toolbar(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this._toolbar) {
      this._toolbar.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._toolbar.id; }
  get parentId(): string { return this._toolbar.parentId; }
  get stateId(): string { return this._toolbar.stateId; }

  // Methods
  getOptions(): any { return this._toolbar.getOptions(); }
  dispose(): void { this._toolbar.dispose(); }
  openFieldList(): void { this._toolbar.openFieldList(); }
  closeFieldList(): void { this._toolbar.closeFieldList(); }
}
