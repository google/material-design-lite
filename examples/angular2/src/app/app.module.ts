import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SeedApp } from './seed-app';
import { appRoutes } from './app.routs';
import { Home } from './components/home';
import { CheckboxModule } from './components/checkbox';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    CheckboxModule
  ],
  declarations: [
    SeedApp,
    Home
  ],
  bootstrap: [SeedApp]
})
export class AppModule {}
