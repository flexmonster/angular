import {
  ECharts,
  type IFMECharts,
  type IFMEChartsInputParams,
  type FilterInputParams,
  type FilterOutputParams,
  type MemberFilterInputParams,
  type MemberFilterOutputParams,
  type MemberSortInputParams,
  type MemberSortOutputParams,
  type IChartDataLimitsObject,
  type ChartSliceInputParams,
  type ChartSliceOutputParams,
  type ReportInputParams,
  type ReportOutputParams,
} from '@flexmonster/js';

export class FMECharts implements IFMECharts {
  private _eCharts: IFMECharts;

  constructor(params: IFMEChartsInputParams) {
    this._eCharts = ECharts(params);
  }

  get id(): string { return this._eCharts.id; }
  get parentId(): string { return this._eCharts.parentId; }
  get stateId(): string { return this._eCharts.stateId; }

  getOptions(): any { return this._eCharts.getOptions(); }
  dispose(): void { this._eCharts.dispose(); }
  hasFilter(fieldName?: string): Promise<boolean> { return this._eCharts.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FilterOutputParams[]> { return this._eCharts.getFilters(fieldName); }
  setFilters(filter: FilterInputParams[]): Promise<void> { return this._eCharts.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._eCharts.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<MemberFilterOutputParams> { return this._eCharts.getMemberFilter(fieldName); }
  setMemberFilter(filter: MemberFilterInputParams): Promise<void> { return this._eCharts.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._eCharts.clearMemberFilter(fieldName); }
  getConditionalFilters(fieldName: string): Promise<FilterOutputParams[]> { return this._eCharts.getConditionalFilters(fieldName); }
  setConditionalFilters(filters: FilterInputParams[]): Promise<void> { return this._eCharts.setConditionalFilters(filters); }
  addConditionalFilter(filter: FilterInputParams): Promise<void> { return this._eCharts.addConditionalFilter(filter); }
  clearConditionalFilters(fieldName: string): Promise<void> { return this._eCharts.clearConditionalFilters(fieldName); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._eCharts.hasMemberSort(fieldName); }
  getMemberSort(fieldName: string): Promise<MemberSortOutputParams> { return this._eCharts.getMemberSort(fieldName); }
  setMemberSort(sort: MemberSortInputParams): Promise<void> { return this._eCharts.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._eCharts.clearMemberSort(fieldName); }
  getDataLimits(): IChartDataLimitsObject { return this._eCharts.getDataLimits(); }
  getReport(): ReportOutputParams { return this._eCharts.getReport(); }
  setReport(report: ReportInputParams): void { this._eCharts.setReport(report); }
  getSlice(): Promise<ChartSliceOutputParams> { return this._eCharts.getSlice(); }
  setSlice(slice: ChartSliceInputParams): Promise<void> { return this._eCharts.setSlice(slice); }
}

export const FMCharts = {
  ECharts(params: IFMEChartsInputParams): FMECharts {
    return new FMECharts(params);
  },
};
