import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPlumbModule } from 'projects/ngx-plumb/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    NgxPlumbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
