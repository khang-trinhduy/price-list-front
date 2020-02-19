import { Component, OnInit, Input } from "@angular/core";
import { PriceService } from "src/app/services/price.service";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-recent",
  templateUrl: "./recent.component.html",
  styleUrls: ["./recent.component.styl"]
})
export class RecentComponent implements OnInit {
  @Input() $recents: Observable<any[]>;
  domain = "/prices/";
  constructor(private service: PriceService) {}

  ngOnInit() {
    if (!this.$recents) {
      this.$recents = this.service.getPrices(5, 1);
    }
  }

  translate(string) {
    if (string) {
      if (string === "standard") {
        return "tiêu chuẩn";
      } else if (string === "advance") {
        return "nâng cao";
      } else return "cao cấp";
    }
  }
}
