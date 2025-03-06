import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartModule } from './chart/chart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({ echarts }),
    NgApexchartsModule,
    ChartModule  // Подключение ngx-echarts
  ],
  providers: [{ provide: 'echarts', useValue: echarts }],
  bootstrap: [AppComponent]
})
export class AppModule { }
