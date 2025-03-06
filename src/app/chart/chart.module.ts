// src/app/chart/chart.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';  // Импортируйте модуль для графиков

@NgModule({
  declarations: [ChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,  // Добавьте этот модуль в imports
  ],
  exports: [ChartComponent],  // Экспортируем компонент, если его нужно использовать в других модулях
})
export class ChartModule {}
