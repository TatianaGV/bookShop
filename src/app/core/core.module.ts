import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE, Provider } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';

import { ErrorInterceptor } from './interсeptors/http-errors.interceptor';
import { UrlReplaceInterceptor } from './interсeptors/url-replace.interceptor';
import { CamelCaseInterceptor } from './interсeptors/camel-case.interceptor';

registerLocaleData(localeRu);

const INTERCEPTOR_PROVIDERS: Provider = [
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: ErrorInterceptor },
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: UrlReplaceInterceptor },
  { provide: HTTP_INTERCEPTORS, multi: true, useClass: CamelCaseInterceptor },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
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
