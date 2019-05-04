import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';


import { DefaultLayoutComponent } from './containers';


import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OrderModule } from 'ngx-order-pipe';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { environment } from '../environments/environment';
import {UploadDownloadComponent} from './upload/upload.component';
import { FileSelectDirective, FileDropDirective , FileUploadModule} from 'ng2-file-upload';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogService } from './dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from './files.service';
import {  ModelsService } from './models.service';
import { ShowImageComponent } from './showimage/showimage.component';
import { ViewmodeldashboardComponent } from './viewmodeldashboard/viewmodeldashboard.component';
import {MatTabsModule, MatSidenavModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {ProgressSpinnerDialogComponent} from './progress-spinner/progress-spinner-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];


import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

import { AppRoutingModule } from './app-routing.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    APP_CONTAINERS,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    SearchComponent,
    UserdashboardComponent,
    HomeHeaderComponent,
    HomeFooterComponent,
    UploadDownloadComponent,
    ShowImageComponent,
    ViewmodeldashboardComponent,
    ProgressSpinnerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    FormsModule,
    SlickCarouselModule,
    OrderModule,
    ChartsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    CarouselModule.forRoot()
  ],
  providers: [
    DialogService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_DIALOG_DATA, useValue: {}},
    FilesService,
    ModelsService
  ],
  entryComponents: [ProgressSpinnerDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
