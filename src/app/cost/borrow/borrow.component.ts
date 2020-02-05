import { Component, OnInit, Input } from "@angular/core";
import { Price } from "src/app/models/price";

@Component({
  selector: "app-borrow",
  templateUrl: "./borrow.component.html",
  styleUrls: ["./borrow.component.styl"]
})
export class BorrowComponent implements OnInit {
  @Input() price: Price;
  percent: number = 7;
  max;
  pay;
  result;
  constructor() {}

  ngOnInit() {}

  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }

  formatV2(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  borrow() {
    this.max = (parseInt(this.price.price.toString()) * this.percent) / 10;
    return this.max;
  }

  paid() {
    let left = (parseInt(this.price.price.toString()) * this.percent) / 10;
    this.pay = parseInt(this.price.total.toString()) - left;
    return this.pay;
  }

  update(have, year) {
    have = have
      .toString()
      .split(".")
      .join("");
    let borrow = (parseInt(this.price.total.toString()) - have).toString();
    if (borrow <= this.max) {
      this.calculate(borrow, year);
    } else {
    }
    let moneyInput = document.querySelector(".money-input");
    (<HTMLInputElement>moneyInput).value = this.formatV2(borrow).toString();
  }

  calculate(money, year) {
    money = money
      .toString()
      .split(".")
      .join("");
    if (money > this.max) {
      let moneyInput = document.querySelector(".money-input");
      (<HTMLInputElement>moneyInput).value = this.formatV2(this.max).toString();
      money = this.max;
    }
    let moneyInput = document.querySelector(".have-input");
    (<HTMLInputElement>moneyInput).value = this.formatV2(
      parseInt(this.price.total.toString()) - money
    ).toString();
    if (year >= 1 && year <= 5) {
      if (money <= this.max && money >= 20000000) {
        var tmp = money / (year * 12);
        this.result = parseInt(tmp.toString());
      }
    }
  }

  change(money, year) {
    money = money
      .toString()
      .split(".")
      .join("");
    if (year >= 1 && year <= 5) {
      this.result = parseInt((money / (year * 12)).toString());
    }
  }
}
