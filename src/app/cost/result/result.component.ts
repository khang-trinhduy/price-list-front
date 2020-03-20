import { Component, OnInit, Input } from "@angular/core";
import { Price } from "src/app/models/price";
import { ExportAsService, ExportAsConfig } from "ngx-export-as";
import { PriceService } from "src/app/services/price.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";

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
  giftline;
  fadilline;
  insurance = false;
  benefit = 0;
  loan: true | false = false;
  domain = environment.api;
  img = "public/images/fadil-black.png";

  links = [
    "public/images/fadil-black.png",
    "public/images/fadil-grey.png",
    "public/images/fadil-orange.jpg",
    "public/images/fadil-red.png",
    "public/images/fadil-white.png",
    "public/images/lux-a-black.png",
    "public/images/lux-a-grey.png",
    "public/images/lux-a-orange.png",
    "public/images/lux-a-red.png",
    "public/images/lux-a-white.png",
    "public/images/lux-sa-black.png",
    "public/images/lux-sa-red.png",
    "public/images/lux-sa-white.png"
  ];

  constructor(private service: PriceService, private route: Router) {}

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

  save() {
    // image, final, insurance, gift, price._id
    let path = this.img;
    if (path) {
      let final = this.convert(this.price.total);
      var form = {
        final: final,
        insurance: this.insurance,
        gift: this.gift,
        image: path,
      benefit: this.benefit
      };
      this.service.update(form, this.price._id).subscribe(
        result => {
          if (!this.loan) {
            this.route.navigateByUrl("/result/" + this.price._id);
          } else {
            this.route.navigateByUrl("/result/" + this.price._id + "?pm=loan");
          }
          // console.log(result);
        },
        error => {
          console.log("error happended");
        },
        () => {
          // navigate
        }
      );
    }
  }

  apply() {
    this.setFormula();
    this.price.total =
      this.convert(this.price.total) - this.convert(this.price.price) / 10;
    this.fadilline = `Ưu đãi ${this.format(
      this.convert(this.price.price) / 10
    )}`;
    this.benefit = this.convert(this.price.price) / 10;
    this.toggle(true, true);
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
    this.gift = 0;
    this.giftline = "";
  }

  removeFadil() {
    this.price.total =
      this.convert(this.price.total) + this.convert(this.price.price) / 10;
    this.fadilline = "";
    this.benefit = 0;
    this.toggle(false, true);
  }
}
