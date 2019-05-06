import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { UsermodelmenuComponent } from './usermodelmenu.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'colors',
        component: ColorsComponent,
        data: {
          title: 'Upload'
        }
      },
      {
        path: 'search',
        component: TypographyComponent,
        data: {
          title: 'Search Model'
        }
      },
      {
        path: 'usermodelmenu',
        component: UsermodelmenuComponent,
        data: {
          title: 'Uploaded Models'
        }
      }
      // {
      //   path: 'search',
      //   component: SearchComponent,
      //   data: {
      //     title: 'Search'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
