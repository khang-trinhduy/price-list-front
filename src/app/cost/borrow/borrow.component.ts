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

  ngOnInit() {}

  format(number: Number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }
}
