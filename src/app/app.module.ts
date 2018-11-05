import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICONS } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AppInterceptor } from './app.interceptor';
import { StatusService } from 'services';
import { ShareModule } from 'share/share.module';

registerLocaleData(en);

export function AppInitServiceFactory(statusService: StatusService, injector: Injector): Function {
  return () => {
    return statusService.boot(injector.get(Router));
  };
}

import {
  BarsOutline,
  BuildOutline,
  CheckCircleOutline,
  DashboardOutline,
  EllipsisOutline,
  FolderOutline,
  LoginOutline,
  PlayCircleOutline,
  PlusOutline,
  QuestionCircleOutline,
  SaveOutline,
  CaretDownOutline,
  CaretUpOutline,
  ScheduleOutline,
  InterationTwoTone,
  SettingOutline,
  UploadOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DeploymentUnitOutline,
  SyncOutline
} from '@ant-design/icons-angular/icons';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports     : [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    ShareModule,
    AppRoutingModule
  ],
  providers   : [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi   : true
    },
    {
      provide : NZ_I18N,
      useValue: en_US
    },
    {
      provide: NZ_ICONS, useValue: [
        BarsOutline,
        BuildOutline,
        CheckCircleOutline,
        DashboardOutline,
        EllipsisOutline,
        FolderOutline,
        LoginOutline,
        PlayCircleOutline,
        PlusOutline,
        QuestionCircleOutline,
        SaveOutline,
        ScheduleOutline,
        CaretDownOutline,
        CaretUpOutline,
        SettingOutline,
        UploadOutline,
        MenuFoldOutline,
        MenuUnfoldOutline,
        InterationTwoTone,
        DeploymentUnitOutline,
        SyncOutline
      ]
    },
    {
      provide   : APP_INITIALIZER,
      useFactory: AppInitServiceFactory,
      deps      : [ StatusService, Injector ],
      multi     : true
    }
  ],
  bootstrap   : [ AppComponent ]
})
export class AppModule {
}
