import { AfterViewInit, Component, ElementRef, Input, OnDestroy } from '@angular/core';
import {
  Flexmonster,
  type IFMFlexmonster,
  type IFMFlexmonsterOptionsInputParams,
  type StateInputParams,
  type FilterInputParams,
  type FilterOutputParams,
  type MemberFilterInputParams,
  type MemberFilterOutputParams,
  type MemberSortInputParams,
  type MemberSortOutputParams,
  type IGridCellObject,
  FMCompositeViewType,
  SortInputParams,
  SortOutputParams,
} from '@flexmonster/js';

@Component({
  selector: 'ngx-fm-flexmonster',
  standalone: true,
  template: '<div class="fm-ng-wrapper" style="width:100%;height:100%;"></div>',
})
export class FMFlexmonster implements AfterViewInit, OnDestroy, IFMFlexmonster {
  @Input() state: StateInputParams | undefined;
  @Input() options: IFMFlexmonsterOptionsInputParams | undefined;

  protected root: HTMLElement;
  private _flexmonster!: IFMFlexmonster;

  constructor(el: ElementRef) {
    this.root = el.nativeElement;
  }

  ngAfterViewInit() {
    const container = this.root.getElementsByClassName('fm-ng-wrapper')[0] as HTMLElement;
    this._flexmonster = Flexmonster(container, { state: this.state, options: this.options });
  }

  ngOnDestroy() {
    if (this._flexmonster) {
      this._flexmonster.dispose();
    }
  }

  // Readonly properties
  get id(): string { return this._flexmonster.id; }
  get parentId(): string { return this._flexmonster.parentId; }
  get stateId(): string { return this._flexmonster.stateId; }

  // Methods
  hasFilter(fieldName?: string): Promise<boolean> { return this._flexmonster.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FilterOutputParams[]> { return this._flexmonster.getFilters(fieldName); }
  setFilters(filter: FilterInputParams[]): Promise<void> { return this._flexmonster.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._flexmonster.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<MemberFilterOutputParams> { return this._flexmonster.getMemberFilter(fieldName); }
  setMemberFilter(filter: MemberFilterInputParams): Promise<void> { return this._flexmonster.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._flexmonster.clearMemberFilter(fieldName); }
  hasSort(): Promise<boolean> { return this._flexmonster.hasSort(); }
  getSort(): Promise<SortOutputParams[]> { return this._flexmonster.getSort(); }
  setSort(sort: SortInputParams[]): Promise<void> { return this._flexmonster.setSort(sort); }
  clearSort(): Promise<void> { return this._flexmonster.clearSort(); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._flexmonster.hasMemberSort(fieldName); }
  addMemberSort(sort: MemberSortInputParams): Promise<void> { return this._flexmonster.addMemberSort(sort); }
  getMemberSort(fieldName: string): Promise<MemberSortOutputParams> { return this._flexmonster.getMemberSort(fieldName); }
  setMemberSort(sort: MemberSortInputParams): Promise<void> { return this._flexmonster.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._flexmonster.clearMemberSort(fieldName); }
  closeFieldList(): void { this._flexmonster.closeFieldList(); }
  dispose(): void { this._flexmonster.dispose(); }
  getCell(rowIndex: number, columnIndex: number): IGridCellObject { return this._flexmonster.getCell(rowIndex, columnIndex); }
  getOptions(): any { return this._flexmonster.getOptions(); }
  getSelectedCells(): IGridCellObject[] { return this._flexmonster.getSelectedCells(); }
  openFieldList(): void { this._flexmonster.openFieldList(); }
  scrollToColumn(columnIndex: number): void { this._flexmonster.scrollToColumn(columnIndex); }
  scrollToRow(rowIndex: number): void { this._flexmonster.scrollToRow(rowIndex); }
  setViewType(viewType: `${FMCompositeViewType}`): void { this._flexmonster.setViewType(viewType); }
}
