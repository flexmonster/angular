import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  PivotTable,
  type IFMPivotTable,
  type IFMPivotTableOptionsInputParams,
  type StateInputParams,
  type FilterInputParams,
  type FilterOutputParams,
  type MemberFilterInputParams,
  type MemberFilterOutputParams,
  type SortInputParams,
  type SortOutputParams,
  type MemberSortInputParams,
  type MemberSortOutputParams,
  type IGridCellObject,
} from '@flexmonster/js';

@Component({
  selector: 'ngx-fm-pivot-table',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMPivotTable implements AfterViewInit, OnDestroy, IFMPivotTable {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMPivotTableOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _pivotTable!: IFMPivotTable;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._pivotTable = PivotTable(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this._pivotTable) {
      this._pivotTable.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._pivotTable.id; }
  get parentId(): string { return this._pivotTable.parentId; }
  get stateId(): string { return this._pivotTable.stateId; }

  // Methods
  getOptions(): any { return this._pivotTable.getOptions(); }
  dispose(): void { this._pivotTable.dispose(); }
  hasFilter(fieldName?: string): Promise<boolean> { return this._pivotTable.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FilterOutputParams[]> { return this._pivotTable.getFilters(fieldName); }
  setFilters(filter: FilterInputParams[]): Promise<void> { return this._pivotTable.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._pivotTable.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<MemberFilterOutputParams> { return this._pivotTable.getMemberFilter(fieldName); }
  setMemberFilter(filter: MemberFilterInputParams): Promise<void> { return this._pivotTable.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._pivotTable.clearMemberFilter(fieldName); }
  hasAnySort(): Promise<boolean> { return this._pivotTable.hasAnySort(); }
  getSort(): Promise<SortOutputParams | SortOutputParams[]> { return this._pivotTable.getSort(); }
  setSort(sort: SortInputParams | SortInputParams[]): Promise<void> { return this._pivotTable.setSort(sort); }
  clearSort(): Promise<void> { return this._pivotTable.clearSort(); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._pivotTable.hasMemberSort(fieldName); }
  addMemberSort(sort: MemberSortInputParams): Promise<void> { return this._pivotTable.addMemberSort(sort); }
  getMemberSort(fieldName: string): Promise<MemberSortOutputParams> { return this._pivotTable.getMemberSort(fieldName); }
  setMemberSort(sort: MemberSortInputParams): Promise<void> { return this._pivotTable.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._pivotTable.clearMemberSort(fieldName); }
  getCell(rowIdx: number, colIdx: number): IGridCellObject { return this._pivotTable.getCell(rowIdx, colIdx); }
  getSelectedCells(): IGridCellObject[] { return this._pivotTable.getSelectedCells(); }
  scrollToColumn(colIdx: number): void { this._pivotTable.scrollToColumn(colIdx); }
  scrollToRow(rowIdx: number): void { this._pivotTable.scrollToRow(rowIdx); }
}
