import { inject } from 'vue';
import type { InjectionKey, Plugin, App } from 'vue';
import Chart from 'chart.js/auto';

const chartjsKey: InjectionKey<typeof Chart> = Symbol('_chartjs_');

export const useChartjs = () => {
  return inject(chartjsKey);
};

export const chartjsPlugin: Plugin = {
  install(app: App) {
    const chart: typeof Chart = Chart;

    app.provide(chartjsKey, chart);
  },
};
