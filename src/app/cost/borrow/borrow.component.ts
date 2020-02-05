import { Component, OnInit, Input } from "@angular/core";
import { Price } from "src/app/models/price";

@Component({
  selector: "app-borrow",
  templateUrl: "./borrow.component.html",
  styleUrls: ["./borrow.component.styl"]
})
export class BorrowComponent implements OnInit {
  @Input() price: Price;
  constructor() {}

  ngOnInit() {
  }

  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }

  borrow(): String {
    return this.format((parseInt(this.price.price.toString()) * 7) / 10);
  }

  pay(): String {
    let left = (parseInt(this.price.price.toString()) * 7) / 10;
    return this.format(parseInt(this.price.total.toString()) - left);
  }
}
