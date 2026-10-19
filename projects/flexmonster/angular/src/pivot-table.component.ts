import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import {
  PivotTable,
  type IFMPivotTable,
  type IFMPivotTableOptionsInputParams,
  type IFMStateInputParams,
  type FMFilterEntryInputParams,
  type FMFilterEntryOutputParams,
  type IFMMemberFilterEntryInputParams,
  type IFMMemberFilterEntryOutputParams,
  type FMSortInputParams,
  type FMSortOutputParams,
  type IFMMemberSortInputParams,
  type IFMMemberSortOutputParams,
  type IFMGridCellObject,
  type IFMReportInputParams,
  type IFMReportOutputParams,
  type IFMSliceInputParams,
  type IFMSliceOutputParams,
} from '@flexmonster/js';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-pivot-table',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMPivotTable implements AfterViewInit, OnDestroy, IFMPivotTable {
  @Input() state: IFMStateInputParams | undefined;
  @Input() options: IFMPivotTableOptionsInputParams | undefined;
  @Input() name: string | undefined;

  protected root: HTMLElement;
  private _pivotTable!: IFMPivotTable;
  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    const state = this.state ?? this.stateContext?.state;
    this._pivotTable = PivotTable(container, { state: state, options: this.options, name: this.name });
  }

  ngOnDestroy() {
    if (this._pivotTable) {
      this._pivotTable.dispose();
    }
  }

  get id(): string { return this._pivotTable.id; }
  get parentId(): string { return this._pivotTable.parentId; }
  get stateId(): string { return this._pivotTable.stateId; }
  get active(): boolean { return this._pivotTable.active; }

  getOptions(): any { return this._pivotTable.getOptions(); }
  dispose(): void { this._pivotTable.dispose(); }
  hasFilter(fieldName?: string): Promise<boolean> { return this._pivotTable.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FMFilterEntryOutputParams[]> { return this._pivotTable.getFilters(fieldName); }
  setFilters(filter: FMFilterEntryInputParams[]): Promise<void> { return this._pivotTable.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._pivotTable.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<IFMMemberFilterEntryOutputParams> { return this._pivotTable.getMemberFilter(fieldName); }
  setMemberFilter(filter: IFMMemberFilterEntryInputParams): Promise<void> { return this._pivotTable.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._pivotTable.clearMemberFilter(fieldName); }
  getConditionalFilters(fieldName: string): Promise<FMFilterEntryOutputParams[]> { return this._pivotTable.getConditionalFilters(fieldName); }
  setConditionalFilters(filters: FMFilterEntryInputParams[]): Promise<void> { return this._pivotTable.setConditionalFilters(filters); }
  addConditionalFilter(filter: FMFilterEntryInputParams): Promise<void> { return this._pivotTable.addConditionalFilter(filter); }
  clearConditionalFilters(fieldName: string): Promise<void> { return this._pivotTable.clearConditionalFilters(fieldName); }
  hasSort(): Promise<boolean> { return this._pivotTable.hasSort(); }
  getSort(): Promise<FMSortOutputParams[]> { return this._pivotTable.getSort(); }
  setSort(sort: FMSortInputParams[]): Promise<void> { return this._pivotTable.setSort(sort); }
  addSort(sort: FMSortInputParams): Promise<void> { return this._pivotTable.addSort(sort); }
  clearSort(): Promise<void> { return this._pivotTable.clearSort(); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._pivotTable.hasMemberSort(fieldName); }
  getMemberSort(fieldName: string): Promise<IFMMemberSortOutputParams> { return this._pivotTable.getMemberSort(fieldName); }
  setMemberSort(sort: IFMMemberSortInputParams): Promise<void> { return this._pivotTable.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._pivotTable.clearMemberSort(fieldName); }
  getSlice(): Promise<IFMSliceOutputParams> { return this._pivotTable.getSlice(); }
  setSlice(slice: IFMSliceInputParams): Promise<void> { return this._pivotTable.setSlice(slice); }
  getCell(rowIdx: number, colIdx: number): IFMGridCellObject { return this._pivotTable.getCell(rowIdx, colIdx); }
  getReport(): IFMReportOutputParams { return this._pivotTable.getReport(); }
  setReport(report: IFMReportInputParams): void { this._pivotTable.setReport(report); }
  getSelectedCells(): IFMGridCellObject[] { return this._pivotTable.getSelectedCells(); }
  scrollToColumn(colIdx: number): void { this._pivotTable.scrollToColumn(colIdx); }
  scrollToRow(rowIdx: number): void { this._pivotTable.scrollToRow(rowIdx); }
}
