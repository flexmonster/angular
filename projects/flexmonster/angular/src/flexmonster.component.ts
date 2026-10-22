import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import {
  Flexmonster,
  type IFMFlexmonster,
  type IFMFlexmonsterOptionsInputParams,
  type IFMStateInputParams,
  type FMFilterEntryInputParams,
  type FMFilterEntryOutputParams,
  type IFMMemberFilterEntryInputParams,
  type IFMMemberFilterEntryOutputParams,
  type IFMMemberSortInputParams,
  type IFMMemberSortOutputParams,
  type IFMGridCellObject,
  type IFMReportInputParams,
  type IFMReportOutputParams,
  FMSortInputParams,
  FMSortOutputParams,
  type IFMFlatSortInputParams,
  type IFMFlatSortOutputParams,
  type FMFlexmonsterViewType,
  type IFMSliceInputParams,
  type IFMSliceOutputParams,
} from '@flexmonster/js';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-flexmonster',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMFlexmonster implements AfterViewInit, OnDestroy, IFMFlexmonster {
  @Input() state: IFMStateInputParams | undefined;
  @Input() options: IFMFlexmonsterOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _flexmonster!: IFMFlexmonster;
  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    const state = this.state ?? this.stateContext?.state;
    this._flexmonster = Flexmonster(container, { state, options: this.options });
  }

  ngOnDestroy() {
    if (this._flexmonster) {
      this._flexmonster.dispose();
    }
  }

  get id(): string { return this._flexmonster.id; }
  get parentId(): string { return this._flexmonster.parentId; }
  get stateId(): string { return this._flexmonster.stateId; }
  get active(): boolean { return this._flexmonster.active; }

  hasFilter(fieldName?: string): Promise<boolean> { return this._flexmonster.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FMFilterEntryOutputParams[]> { return this._flexmonster.getFilters(fieldName); }
  setFilters(filter: FMFilterEntryInputParams[]): Promise<void> { return this._flexmonster.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._flexmonster.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<IFMMemberFilterEntryOutputParams> { return this._flexmonster.getMemberFilter(fieldName); }
  setMemberFilter(filter: IFMMemberFilterEntryInputParams): Promise<void> { return this._flexmonster.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._flexmonster.clearMemberFilter(fieldName); }
  getConditionalFilters(fieldName: string): Promise<FMFilterEntryOutputParams[]> { return this._flexmonster.getConditionalFilters(fieldName); }
  setConditionalFilters(filters: FMFilterEntryInputParams[]): Promise<void> { return this._flexmonster.setConditionalFilters(filters); }
  addConditionalFilter(filter: FMFilterEntryInputParams): Promise<void> { return this._flexmonster.addConditionalFilter(filter); }
  clearConditionalFilters(fieldName: string): Promise<void> { return this._flexmonster.clearConditionalFilters(fieldName); }
  hasSort(): Promise<boolean> { return this._flexmonster.hasSort(); }
  getSort(): Promise<FMSortOutputParams[]> { return this._flexmonster.getSort(); }
  setSort(sort: FMSortInputParams[]): Promise<void> { return this._flexmonster.setSort(sort); }
  addSort(sort: FMSortInputParams): Promise<void> { return this._flexmonster.addSort(sort); }
  clearSort(): Promise<void> { return this._flexmonster.clearSort(); }
  hasFlatSort(fieldName?: string): Promise<boolean> { return this._flexmonster.hasFlatSort(fieldName); }
  getFlatSort(fieldName?: string): Promise<IFMFlatSortOutputParams[]> { return this._flexmonster.getFlatSort(fieldName); }
  setFlatSort(sort: IFMFlatSortInputParams[]): Promise<void> { return this._flexmonster.setFlatSort(sort); }
  addFlatSort(sort: IFMFlatSortInputParams): Promise<void> { return this._flexmonster.addFlatSort(sort); }
  clearFlatSort(fieldName?: string): Promise<void> { return this._flexmonster.clearFlatSort(fieldName); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._flexmonster.hasMemberSort(fieldName); }
  getMemberSort(fieldName: string): Promise<IFMMemberSortOutputParams> { return this._flexmonster.getMemberSort(fieldName); }
  setMemberSort(sort: IFMMemberSortInputParams): Promise<void> { return this._flexmonster.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._flexmonster.clearMemberSort(fieldName); }
  getSlice(): Promise<IFMSliceOutputParams> { return this._flexmonster.getSlice(); }
  setSlice(slice: IFMSliceInputParams): Promise<void> { return this._flexmonster.setSlice(slice); }
  getReport(): IFMReportOutputParams { return this._flexmonster.getReport(); }
  setReport(report: IFMReportInputParams): void { this._flexmonster.setReport(report); }
  closeFieldList(): void { this._flexmonster.closeFieldList(); }
  dispose(): void { this._flexmonster.dispose(); }
  getCell(rowIndex: number, columnIndex: number): IFMGridCellObject { return this._flexmonster.getCell(rowIndex, columnIndex); }
  getOptions(): any { return this._flexmonster.getOptions(); }
  getSelectedCells(): IFMGridCellObject[] { return this._flexmonster.getSelectedCells(); }
  openFieldList(): void { this._flexmonster.openFieldList(); }
  scrollToColumn(columnIndex: number): void { this._flexmonster.scrollToColumn(columnIndex); }
  scrollToRow(rowIndex: number): void { this._flexmonster.scrollToRow(rowIndex); }
  setViewType(viewType: `${FMFlexmonsterViewType}`): void { this._flexmonster.setViewType(viewType); }
}
