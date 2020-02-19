import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSelectModule } from "@angular/material/select";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormComponent } from "./cost/form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ResultComponent } from "./cost/result/result.component";
import { BorrowComponent } from "./cost/borrow/borrow.component";
import { GiftComponent } from "./cost/gift/gift.component";
import { MatIconModule } from "@angular/material/icon";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { ExportAsModule } from 'ngx-export-as';
import { PinComponent } from './cost/pin/pin.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { PageComponent } from './cost/page/page.component';

export const options: Partial<any> | (() => Partial<any>) = null;

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    BorrowComponent,
    GiftComponent,
    PinComponent,
    PageComponent
  ],
  imports: [
    MatSelectModule,
    MatTabsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskModule.forRoot(options),
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
