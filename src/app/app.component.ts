import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="charts-container">
      <div *ngFor="let chart of charts; let i = index" class="chart-wrapper">
        <div echarts [options]="chart.chartOption" class="demo-chart"></div>
      </div>
    </div>
    <app-chart></app-chart>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  charts: { id: number; chartOption: any; currentValues: number[] }[] = [];
  dataPoints = 10000;

  constructor() {
    for (let i = 0; i < 4; i++) {
      const chartData = {
        id: i,
        chartOption: this.initChart(),
        currentValues: [50, 40, 60, 70] // Начальные значения
      };

      // Заполняем график начальными значениями
      for (let j = 0; j < 4; j++) {
        chartData.chartOption.series[j].data = Array.from({ length: this.dataPoints }, () => this.getRandomValue(chartData, j));
      }

      this.charts.push(chartData);
    }

    setInterval(() => this.updateAllCharts(), 5000);
  }

  initChart() {
    return {
      title: { text: 'ECharts example' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: Array.from({ length: this.dataPoints }, (_, index) => `Time ${index + 1}`)
      },
      yAxis: {},
      series: [
        { name: 'Series 1', type: 'line', data: [] as number[] },
        { name: 'Series 2', type: 'line', data: [] as number[] },
        { name: 'Series 3', type: 'line', data: [] as number[] },
        { name: 'Series 4', type: 'line', data: [] as number[] }
      ]
    };
  }

  getRandomValue(chart: any, seriesIndex: number): number {
    const baseValue = chart.currentValues[seriesIndex];
    const variation = Math.floor(Math.random() * 10) - 4;
    const newValue = baseValue + variation;

    chart.currentValues[seriesIndex] = newValue;

    return Math.max(0, Math.min(newValue, 800));
  }

  updateAllCharts() {
    this.charts.forEach((chart) => {
      chart.chartOption.xAxis.data.shift();
      chart.chartOption.xAxis.data.push(`Time ${this.dataPoints + 1}`);

      for (let i = 0; i < 4; i++) {
        chart.chartOption.series[i].data.shift();
        chart.chartOption.series[i].data.push(this.getRandomValue(chart, i));
      }

      // 🚀 Обновляем ссылку на объект, чтобы Angular увидел изменения
      chart.chartOption = Object.assign({}, chart.chartOption);
    });

    this.dataPoints++;
  }
}
