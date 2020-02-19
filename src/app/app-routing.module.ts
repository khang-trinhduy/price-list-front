import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from "./cost/form/form.component";
import { PageComponent } from "./cost/page/page.component";

const routes: Routes = [
  { path: "", component: FormComponent },
  { path: "result/:id", component: PageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
