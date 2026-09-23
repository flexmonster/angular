import type { IFMEChartsInputParams, IFMECharts } from '@flexmonster/js';

export const FMCharts = {
  async ECharts(params: IFMEChartsInputParams): Promise<IFMECharts> {
    const { FMCharts } = await import('@flexmonster/angular');
    return FMCharts.ECharts(params);
  },
};
