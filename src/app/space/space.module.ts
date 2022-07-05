import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout'
import {MatCardModule} from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {MatFormFieldModule  } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {  HttpClientModule } from '@angular/common/http';
import { MatCarouselModule } from 'ng-mat-carousel';
@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    FlexLayoutModule,
    MatCardModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    HttpClientModule,
    MatCarouselModule.forRoot()
  ],
  exports:[
    HomeComponent,
    LoginComponent
  ]
})
export class SpaceModule { }
