import { Component } from '@angular/core';
import { ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexStroke, ApexLegend, ApexTitleSubtitle, ApexGrid } from 'ng-apexcharts';

interface ChartOptions {
  series: { name: string; data: number[] }[];
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  grid: ApexGrid;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  public charts: ChartOptions[] = [];

  constructor() {
    this.generateCharts();
  }

  generateCharts() {
    for (let i = 0; i < 4; i++) {
      this.charts.push(this.createChart(i + 1));
    }
  }

  createChart(chartIndex: number): ChartOptions {
    // Генерируем 10 000 точек с зависимостью от предыдущего значения
    let seriesData = this.generateSeriesData(10000);

    return {
      series: [
        { name: 'Линия 1', data: seriesData[0] },
        { name: 'Линия 2', data: seriesData[1] },
        { name: 'Линия 3', data: seriesData[2] },
        { name: 'Линия 4', data: seriesData[3] }
      ],
      chart: {
        type: 'line',
        height: 300,
      },
      xaxis: {
        categories: Array.from({ length: 10000 }, (_, i) => i.toString()),
        labels: { show: false }
      },
      yaxis: {
        labels: { formatter: (val) => val.toFixed(2) }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      legend: {
        position: 'top'
      },
      title: {
        text: `График ${chartIndex}`,
        align: 'center'
      },
      grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 5
      },
      dataLabels: { enabled: false }
    };
  }

  generateSeriesData(points: number): number[][] {
    let series: number[][] = [[], [], [], []]; // Явно указываем тип массива
    let baseValues = [10, 20, 30, 40]; // Базовые значения для каждой линии
  
    for (let i = 0; i < points; i++) {
      for (let j = 0; j < 4; j++) {
        let prev = i === 0 ? baseValues[j] : series[j][i - 1];
        series[j].push(prev + (Math.random() - 0.5) * 5); // Плавные изменения
      }
    }
    return series;
  }
  
}
