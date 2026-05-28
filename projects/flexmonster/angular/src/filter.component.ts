import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  Filter,
  type IFMFilter,
  type IFMFilterInputParams,
  type StateInputParams,
  type MemberFilterInputParams,
  type MemberFilterOutputParams,
  type ConditionalFilterInputParams,
  type ConditionalFilterOutputParams,
  ConditionalFilterControlInputParams,
  ConditionalFilterControlOutputParams,
  MemberFilterControlOutputParams,
} from '@flexmonster/js';

@Component({
  selector: 'ngx-fm-filter',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMFilter implements AfterViewInit, OnDestroy, IFMFilter {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFilterInputParams | undefined;
  @Input() fieldName: string | undefined;

  protected root: HTMLElement;
  private _filter!: IFMFilter;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._filter = Filter(container, { state: this.state, options: this.options, fieldName: this.fieldName! });
  }

  ngOnDestroy() {
    if (this._filter) {
      this._filter.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._filter.id; }
  get parentId(): string { return this._filter.parentId; }
  get stateId(): string { return this._filter.stateId; }

  // Methods
  getOptions(): any { return this._filter.getOptions(); }
  dispose(): void { this._filter.dispose(); }
  getMemberFilter(): Promise<MemberFilterControlOutputParams> { return this._filter.getMemberFilter(); }
  setMemberFilter(filter: MemberFilterInputParams): Promise<void> { return this._filter.setMemberFilter(filter); }
  clearMemberFilter(): Promise<void> { return this._filter.clearMemberFilter(); }
  getConditionalFilters(): Promise<ConditionalFilterControlOutputParams[]> { return this._filter.getConditionalFilters(); }
  addConditionalFilter(filter: ConditionalFilterControlInputParams): Promise<void> { return this._filter.addConditionalFilter(filter); }
  setConditionalFilters(filters: ConditionalFilterInputParams[]): Promise<void> { return this._filter.setConditionalFilters(filters); }
  clearConditionalFilters(): Promise<void> { return this._filter.clearConditionalFilters(); }
  getSortOrder(): Promise<string> { return this._filter.getSortOrder(); }
  setSortOrder(order: string): Promise<void> { return this._filter.setSortOrder(order); }
}
