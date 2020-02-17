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
  @Input() car;
  @Input() final;
  constructor() {}

  ngOnInit() {}

  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }

  getGift() {
    return parseInt(this.price.price.toString()) / 10;
  }

  update(number) {
    var str = number
      .toString()
      .split(".")
      .join("");
    var val = parseInt(str);
    var totalLine = (<HTMLElement>document.querySelector(".total-line"))
      .textContent;
    var total = parseInt(
      totalLine
        .split(":")[1]
        .split("VNĐ")[0]
        .split(".")
        .join("")
    );
    var gift = document.querySelector(".gift-line").textContent || "";
    if (gift && total) {
      var value = parseInt(
        gift
          .split(" ")[0]
          .split(".")
          .join("")
      );
      if (value) {
        total = total - value;
      }
    }
    if (val) {
      this.final = total - val;
    } else {
      this.final = total;
    }
  }

  public get fadil(): boolean {
    return this.car === "FADIL";
  }
}
