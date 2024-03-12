import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-roting.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{}
