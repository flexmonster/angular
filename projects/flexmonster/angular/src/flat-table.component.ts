import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import {
  FlatTable,
  type IFMFlatTable,
  type IFMFlatTableOptionsInputParams,
  type IFMStateInputParams,
  type FMFilterEntryInputParams,
  type FMFilterEntryOutputParams,
  type IFMMemberFilterEntryInputParams,
  type IFMMemberFilterEntryOutputParams,
  type IFMFlatSortInputParams,
  type IFMFlatSortOutputParams,
  type IFMGridCellObject,
  type IFMReportInputParams,
  type IFMReportOutputParams,
  type IFMSliceInputParams,
  type IFMSliceOutputParams,
} from '@flexmonster/js';
import { FM_STATE_CONTEXT } from './state-context';

@Component({
  selector: 'ngx-fm-flat-table',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMFlatTable implements AfterViewInit, OnDestroy, IFMFlatTable {
  @Input() state: IFMStateInputParams | undefined;
  @Input() options: IFMFlatTableOptionsInputParams | undefined;
  @Input() name: string | undefined;

  protected root: HTMLElement;
  private _flatTable!: IFMFlatTable;
  private stateContext = inject(FM_STATE_CONTEXT, { optional: true });

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    const state = this.state ?? this.stateContext?.state;
    this._flatTable = FlatTable(container, { state: state, options: this.options, name: this.name });
  }

  ngOnDestroy() {
    if (this._flatTable) {
      this._flatTable.dispose();
    }
  }

  get id(): string { return this._flatTable.id; }
  get parentId(): string { return this._flatTable.parentId; }
  get stateId(): string { return this._flatTable.stateId; }
  get active(): boolean { return this._flatTable.active; }

  getOptions(): any { return this._flatTable.getOptions(); }
  dispose(): void { this._flatTable.dispose(); }
  hasFilter(fieldName?: string): Promise<boolean> { return this._flatTable.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FMFilterEntryOutputParams[]> { return this._flatTable.getFilters(fieldName); }
  setFilters(filter: FMFilterEntryInputParams[]): Promise<void> { return this._flatTable.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._flatTable.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<IFMMemberFilterEntryOutputParams> { return this._flatTable.getMemberFilter(fieldName); }
  setMemberFilter(filter: IFMMemberFilterEntryInputParams): Promise<void> { return this._flatTable.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._flatTable.clearMemberFilter(fieldName); }
  getConditionalFilters(fieldName: string): Promise<FMFilterEntryOutputParams[]> { return this._flatTable.getConditionalFilters(fieldName); }
  setConditionalFilters(filters: FMFilterEntryInputParams[]): Promise<void> { return this._flatTable.setConditionalFilters(filters); }
  addConditionalFilter(filter: FMFilterEntryInputParams): Promise<void> { return this._flatTable.addConditionalFilter(filter); }
  clearConditionalFilters(fieldName: string): Promise<void> { return this._flatTable.clearConditionalFilters(fieldName); }
  getSlice(): Promise<IFMSliceOutputParams> { return this._flatTable.getSlice(); }
  setSlice(slice: IFMSliceInputParams): Promise<void> { return this._flatTable.setSlice(slice); }
  hasSort(fieldName?: string): Promise<boolean> { return this._flatTable.hasSort(fieldName); }
  getSort(fieldName?: string): Promise<IFMFlatSortOutputParams[]> { return this._flatTable.getSort(fieldName); }
  setSort(sort: IFMFlatSortInputParams[]): Promise<void> { return this._flatTable.setSort(sort); }
  addSort(sort: IFMFlatSortInputParams): Promise<void> { return this._flatTable.addSort(sort); }
  clearSort(fieldName?: string): Promise<void> { return this._flatTable.clearSort(fieldName); }
  getCell(rowIdx: number, colIdx: number): IFMGridCellObject { return this._flatTable.getCell(rowIdx, colIdx); }
  getReport(): IFMReportOutputParams { return this._flatTable.getReport(); }
  setReport(report: IFMReportInputParams): void { this._flatTable.setReport(report); }
  getSelectedCells(): IFMGridCellObject[] { return this._flatTable.getSelectedCells(); }
  scrollToColumn(colIdx: number): void { this._flatTable.scrollToColumn(colIdx); }
  scrollToRow(rowIdx: number): void { this._flatTable.scrollToRow(rowIdx); }
}
