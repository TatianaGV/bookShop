import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE, Provider } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interseptors/error-interceptor.interceptor';

registerLocaleData(localeRu);

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ErrorInterceptor,
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'RUB',
    },
    INTERCEPTOR_PROVIDER,
  ],
})
export class CoreModule { }
