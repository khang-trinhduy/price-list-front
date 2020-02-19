import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormComponent } from "./cost/form/form.component";
import { PageComponent } from "./cost/page/page.component";
import { RecentComponent } from "./cost/recent/recent.component";

const routes: Routes = [
  { path: "", component: FormComponent },
  { path: "result/:id", component: PageComponent },
  { path: "recents", component: RecentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
