import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';



import { DefaultLayoutComponent } from './containers';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {UserdashboardComponent} from './userdashboard/userdashboard.component';
import {SearchComponent} from './search/search.component';
import {UploadDownloadComponent} from './upload/upload.component';
import {RatingsComponent} from "./ratings/ratings.component";
import {ShowImageComponent} from './showimage/showimage.component';
import {ViewmodeldashboardComponent} from './viewmodeldashboard/viewmodeldashboard.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {path: 'search', component: SearchComponent},
  {path: 'landing', component: HomeComponent},

  {
    path: 'registration',
    component: RegistrationComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: ''
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },

    ]
  },
  {path: 'userdashboard', component: UserdashboardComponent},
  {path: 'upload', component: UploadDownloadComponent},
  {path: 'RatingsComponent', component: RatingsComponent},
  {path: 'showimage', component: ShowImageComponent},
  {path: 'viewmodeldashboard', component: ViewmodeldashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule, NgbModule]
})
export class AppRoutingModule { }
