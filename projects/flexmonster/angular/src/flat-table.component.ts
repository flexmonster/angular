import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  FlatTable,
  type IFMFlatTable,
  type IFMFlatTableOptionsInputParams,
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
  selector: 'ngx-fm-flat-table',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMFlatTable implements AfterViewInit, OnDestroy, IFMFlatTable {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlatTableOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _flatTable!: IFMFlatTable;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._flatTable = FlatTable(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this._flatTable) {
      this._flatTable.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._flatTable.id; }
  get parentId(): string { return this._flatTable.parentId; }
  get stateId(): string { return this._flatTable.stateId; }

  // Methods
  getOptions(): any { return this._flatTable.getOptions(); }
  dispose(): void { this._flatTable.dispose(); }
  hasFilter(fieldName?: string): Promise<boolean> { return this._flatTable.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FilterOutputParams[]> { return this._flatTable.getFilters(fieldName); }
  setFilters(filter: FilterInputParams[]): Promise<void> { return this._flatTable.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._flatTable.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<MemberFilterOutputParams> { return this._flatTable.getMemberFilter(fieldName); }
  setMemberFilter(filter: MemberFilterInputParams): Promise<void> { return this._flatTable.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._flatTable.clearMemberFilter(fieldName); }
  hasSort(): Promise<boolean> { return this._flatTable.hasSort(); }
  getSort(): Promise<SortOutputParams[]> { return this._flatTable.getSort(); }
  setSort(sort: SortInputParams[]): Promise<void> { return this._flatTable.setSort(sort); }
  clearSort(): Promise<void> { return this._flatTable.clearSort(); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._flatTable.hasMemberSort(fieldName); }
  addMemberSort(sort: MemberSortInputParams): Promise<void> { return this._flatTable.addMemberSort(sort); }
  getMemberSort(fieldName: string): Promise<MemberSortOutputParams> { return this._flatTable.getMemberSort(fieldName); }
  setMemberSort(sort: MemberSortInputParams): Promise<void> { return this._flatTable.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._flatTable.clearMemberSort(fieldName); }
  getCell(rowIdx: number, colIdx: number): IGridCellObject { return this._flatTable.getCell(rowIdx, colIdx); }
  getSelectedCells(): IGridCellObject[] { return this._flatTable.getSelectedCells(); }
  scrollToColumn(colIdx: number): void { this._flatTable.scrollToColumn(colIdx); }
  scrollToRow(rowIdx: number): void { this._flatTable.scrollToRow(rowIdx); }
}
