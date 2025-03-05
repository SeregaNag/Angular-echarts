import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxEchartsModule.forRoot({ echarts })  // Подключение ngx-echarts
  ],
  providers: [{ provide: 'echarts', useValue: echarts }],
  bootstrap: [AppComponent]
})
export class AppModule { }
