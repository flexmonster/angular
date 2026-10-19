import {
  ECharts,
  type IFMECharts,
  type IFMEChartsInputParams,
  type FMFilterEntryInputParams,
  type FMFilterEntryOutputParams,
  type IFMMemberFilterEntryInputParams,
  type IFMMemberFilterEntryOutputParams,
  type IFMMemberSortInputParams,
  type IFMMemberSortOutputParams,
  type FMSortInputParams,
  type FMSortOutputParams,
  type IFMChartDataLimitsOutputParams,
  type IFMChartSliceInputParams,
  type IFMChartSliceOutputParams,
  type IFMReportInputParams,
  type IFMReportOutputParams,
} from '@flexmonster/js';

export class FMECharts implements IFMECharts {
  private _eCharts: IFMECharts;

  constructor(chart: object, params: IFMEChartsInputParams) {
    this._eCharts = ECharts(chart, params);
  }

  get id(): string { return this._eCharts.id; }
  get parentId(): string { return this._eCharts.parentId; }
  get stateId(): string { return this._eCharts.stateId; }
  get active(): boolean { return this._eCharts.active; }

  getOptions(): any { return this._eCharts.getOptions(); }
  dispose(): void { this._eCharts.dispose(); }
  hasFilter(fieldName?: string): Promise<boolean> { return this._eCharts.hasFilter(fieldName); }
  getFilters(fieldName?: string): Promise<FMFilterEntryOutputParams[]> { return this._eCharts.getFilters(fieldName); }
  setFilters(filter: FMFilterEntryInputParams[]): Promise<void> { return this._eCharts.setFilters(filter); }
  clearFilters(fieldName?: string): Promise<void> { return this._eCharts.clearFilters(fieldName); }
  getMemberFilter(fieldName: string): Promise<IFMMemberFilterEntryOutputParams> { return this._eCharts.getMemberFilter(fieldName); }
  setMemberFilter(filter: IFMMemberFilterEntryInputParams): Promise<void> { return this._eCharts.setMemberFilter(filter); }
  clearMemberFilter(fieldName: string): Promise<void> { return this._eCharts.clearMemberFilter(fieldName); }
  getConditionalFilters(fieldName: string): Promise<FMFilterEntryOutputParams[]> { return this._eCharts.getConditionalFilters(fieldName); }
  setConditionalFilters(filters: FMFilterEntryInputParams[]): Promise<void> { return this._eCharts.setConditionalFilters(filters); }
  addConditionalFilter(filter: FMFilterEntryInputParams): Promise<void> { return this._eCharts.addConditionalFilter(filter); }
  clearConditionalFilters(fieldName: string): Promise<void> { return this._eCharts.clearConditionalFilters(fieldName); }
  hasSort(): Promise<boolean> { return this._eCharts.hasSort(); }
  getSort(): Promise<FMSortOutputParams[]> { return this._eCharts.getSort(); }
  setSort(sort: FMSortInputParams[]): Promise<void> { return this._eCharts.setSort(sort); }
  addSort(sort: FMSortInputParams): Promise<void> { return this._eCharts.addSort(sort); }
  clearSort(): Promise<void> { return this._eCharts.clearSort(); }
  hasMemberSort(fieldName: string): Promise<boolean> { return this._eCharts.hasMemberSort(fieldName); }
  getMemberSort(fieldName: string): Promise<IFMMemberSortOutputParams> { return this._eCharts.getMemberSort(fieldName); }
  setMemberSort(sort: IFMMemberSortInputParams): Promise<void> { return this._eCharts.setMemberSort(sort); }
  clearMemberSort(fieldName?: string): Promise<void> { return this._eCharts.clearMemberSort(fieldName); }
  getDataLimits(): IFMChartDataLimitsOutputParams { return this._eCharts.getDataLimits(); }
  getReport(): IFMReportOutputParams { return this._eCharts.getReport(); }
  setReport(report: IFMReportInputParams): void { this._eCharts.setReport(report); }
  getSlice(): Promise<IFMChartSliceOutputParams> { return this._eCharts.getSlice(); }
  setSlice(slice: IFMChartSliceInputParams): Promise<void> { return this._eCharts.setSlice(slice); }
}

export const FMCharts = {
  ECharts(chart: object, params: IFMEChartsInputParams): FMECharts {
    return new FMECharts(chart, params);
  },
};
