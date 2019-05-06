// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import {MatButtonModule} from '@angular/material';
import {UsermodelmenuComponent} from './usermodelmenu.component';

// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import {MatTabsModule, MatSidenavModule} from '@angular/material';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    MatTabsModule,
    MatSidenavModule,
    OrderModule,
    TabsModule,
    MatButtonModule,
    FormsModule,
    NgbModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    ColorsComponent,
    TypographyComponent,
    UsermodelmenuComponent
  ]
})
export class ThemeModule { }
