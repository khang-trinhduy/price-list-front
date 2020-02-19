import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PriceService } from "src/app/services/price.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.styl"]
})
export class PageComponent implements OnInit {
  result$: Observable<any>;
  domain = environment.api + "/";
  loan: boolean = false;
  constructor(private route: ActivatedRoute, private service: PriceService) {}

  ngOnInit() {
    this.loan = this.route.snapshot.queryParams["pm"] === "loan";
    this.result$ = this.service.getPrice(this.route.snapshot.params["id"]);
  }

  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }

  getLoan = x => x * 0.7;

  getPaid = x => x * 0.3;

  sum = x => parseInt(x.toString());

  insurance = (bought, price) => {
    if (bought) {
      return parseInt(price.toString());
    } else return 0;
  };

  percent(a, b) {
    var x = this.convert(a);
    var y = this.convert(b);
    return x / y;
  }

  convert = a => parseInt(a.toString());

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
