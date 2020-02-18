import { Component, OnInit, Input } from "@angular/core";
import { Price } from "src/app/models/price";
import { ExportAsService, ExportAsConfig } from "ngx-export-as";

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
  initial;
  formula: string;
  gift: number;
  checked: boolean = false;
  giftline;
  fadilline;
  insurance = false;

  constructor() {}

  exportAsConfig: ExportAsConfig = {
    type: "png", // the type you want to download
    elementId: "result-table" // the id of html/table element
  };

  ngOnInit() {
    this.gift = 0;
    this.insurance = false;
    this.initial = parseInt(this.price.total.toString());
  }

  format(number): String {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
  }

  getGift() {
    return parseInt(this.price.price.toString()) / 10;
  }

  updateInsurance() {
    if (this.insurance) {
      this.price.total =
        this.convert(this.price.total) +
        this.convert(this.price.carInsuranceFee);
    } else {
      this.price.total =
        this.convert(this.price.total) -
        this.convert(this.price.carInsuranceFee);
    }
  }

  convert = (val): number => parseInt(val.toString());

  public get fadil(): boolean {
    return this.car === "FADIL";
  }

  setFormula() {
    if (this.fadil) {
      if (this.gift) {
        this.formula = `${this.format(this.initial)} - ${this.format(
          this.getGift()
        )} - ${this.format(this.gift)}`;
      } else {
        this.formula = `${this.format(this.initial)} - ${this.format(
          this.getGift()
        )}`;
      }
    } else {
      if (this.gift) {
        this.formula = `${this.format(this.initial)} - ${this.format(
          this.gift
        )}`;
      } else {
        console.log("nothing to apply");
      }
    }
  }

  save() {}

  apply() {
    this.setFormula();
    this.price.total =
      this.convert(this.price.total) - this.convert(this.price.price) / 10;
    this.fadilline = `Ưu đãi ${this.format(
      this.convert(this.price.price) / 10
    )}`;
    this.toggle(true, true);
    this.checked = true;
  }

  addGift(value) {
    let money = parseInt(value.split(".").join(""));
    if (money) {
      this.gift = money;
      this.price.total = this.convert(this.price.total) - money;
      this.giftline = `Khuyến mãi ${this.format(this.gift)}`;
      this.setFormula();
      this.toggle(true);
    } else {
      console.log("no money");
    }
  }

  toggle(set = false, fadil = false) {
    if (!fadil) {
      if (set) {
        let btn = document.querySelectorAll(".apply-btn")[1];
        if (btn) {
          let elem = btn as HTMLDivElement;
          elem.style.pointerEvents = "none";
        } else console.log("no button");
        let icon = document.querySelector(".gift-icon");
        if (icon) {
          (<HTMLElement>icon).style.pointerEvents = "all";
        }
      } else {
        let btn = document.querySelectorAll(".apply-btn")[1];
        if (btn) {
          let elem = btn as HTMLDivElement;
          elem.style.pointerEvents = "all";
        }
        let icon = document.querySelector(".gift-icon");
        if (icon) {
          (<HTMLElement>icon).style.pointerEvents = "none";
        } else {
          console.log("no icon");
        }
      }
    } else {
      if (set) {
        let btn = document.querySelector(".fadil-btn");
        if (btn) {
          let elem = btn as HTMLDivElement;
          elem.style.pointerEvents = "none";
        } else console.log("no button");
        let icon = document.querySelector(".fadil-icon");
        if (icon) {
          (<HTMLElement>icon).style.pointerEvents = "all";
        }
      } else {
        let btn = document.querySelector(".fadil-btn");
        if (btn) {
          let elem = btn as HTMLDivElement;
          elem.style.pointerEvents = "all";
        }
        let icon = document.querySelector(".fadil-icon");
        if (icon) {
          (<HTMLElement>icon).style.pointerEvents = "none";
        } else {
          console.log("no icon");
        }
      }
    }
  }

  removeGift() {
    this.price.total = this.convert(this.price.total) + this.gift;
    this.toggle();
    this.giftline = "";
  }

  removeFadil() {
    this.price.total =
      this.convert(this.price.total) + this.convert(this.price.price) / 10;
    this.fadilline = "";
    this.toggle(false, true);
  }
}
