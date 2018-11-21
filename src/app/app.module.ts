import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ALL_COMPONENTS } from './components/component';
import { RxjsService } from './services/rxjsService';

@NgModule({
  declarations: [
    AppComponent,
    ...ALL_COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [RxjsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
