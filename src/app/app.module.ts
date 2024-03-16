import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-roting.module';
import { DragAndDropComponent } from './common/drag-and-drop/drag-and-drop.component';
import { ListComponent } from './common/list/list.component';
import { ViewComponent } from './common/view/view.component';


@NgModule({
  declarations: [
    AppComponent,
    DragAndDropComponent,
    ListComponent,
    ViewComponent,
  ],
  imports:[
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule{}
