import { Component, OnInit, Input } from "@angular/core";
import { Price } from "src/app/models/price";
import { PriceService } from "src/app/services/price.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.styl"]
})
export class ResultComponent implements OnInit {
  @Input() price: Price;
  @Input() percent;
  constructor() {}

  ngOnInit() {
  }

  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }
}
