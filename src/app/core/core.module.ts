import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE, Provider } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ErrorInterceptor } from './interсeptors/http-errors.interceptor';
import { UrlReplaceInterceptor } from './interсeptors/url-replace.interceptor';

registerLocaleData(localeRu);

const INTERCEPTOR_PROVIDERS: Provider = [
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorInterceptor },
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: UrlReplaceInterceptor },
];

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
    INTERCEPTOR_PROVIDERS,
  ],
})
export class CoreModule { }
