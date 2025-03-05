import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div echarts [options]="chartOption" class="demo-chart"></div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chartOption = {
    title: {
      text: 'ECharts example'
    },
    tooltip: {trigger: 'axis'},
    xAxis: {
      type: 'category',
      data: [] as string[] 
    },
    yAxis: {},
    series: [
      {
        name: 'Series 1',
        type: 'line',
        data: [] as number[] 
      },
      {
        name: 'Series 2',
        type: 'line',
        data: [] as number[]
      },
      {
        name: 'Series 3',
        type: 'line',
        data: [] as number[]
      },
      {
        name: 'Series 4',
        type: 'line',
        data: [] as number[]
      }
    ]
  };

  dataPoints = 10000; 
  currentValues = [50, 40, 60, 70]; 

  constructor() {
    this.chartOption.xAxis.data = Array.from({ length: this.dataPoints }, (_, index) => `Time ${index + 1}`);
    

    for (let i = 0; i < 4; i++) {
      this.chartOption.series[i].data = Array.from({ length: this.dataPoints }, () => this.getRandomValue(i));
    }

    setInterval(() => this.updateChartData(), 5000);
  }

  getRandomValue(index: number): number {

    const baseValue = this.currentValues[index];
    const variation = Math.floor(Math.random() * 10) - 4;
    const newValue = baseValue + variation;

    this.currentValues[index] = newValue;

    return Math.max(0, Math.min(newValue, 800));
  }

  updateChartData() {

    this.chartOption.xAxis.data.shift();
    this.chartOption.xAxis.data.push(`Time ${this.dataPoints + 1}`);

    for (let i = 0; i < 4; i++) {
      this.chartOption.series[i].data.shift();
      this.chartOption.series[i].data.push(this.getRandomValue(i));
    }

    this.dataPoints++;
  }
}
