import { Component, OnInit } from "@angular/core";
import { PriceService } from "src/app/services/price.service";
import { Observable } from "rxjs";
import { Province, Car, Price } from "src/app/models/price";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.styl"]
})
export class FormComponent implements OnInit {
  constructor(
    private service: PriceService,
    private formBuilder: FormBuilder
  ) {}
  carName;
  result: Price;
  provinces: Province[];
  percent;
  cars: Car[];
  form = this.formBuilder.group({
    contact: [""],
    car: ["", Validators.required],
    color: ["", Validators.required],
    model: ["", Validators.required],
    province: ["", Validators.required]
  });
  ngOnInit() {
    this.service.getProvinces().subscribe(e => (this.provinces = e));
    this.service.getCars().subscribe(e => (this.cars = e));
    window.addEventListener("load", () => {
      let btn = document.querySelector(".gift-btn");
      let dialog = document.querySelector("#gift-dialog");
      let close = document.querySelector(".icon-area");
      close.addEventListener("click", () => {
        (<HTMLDialogElement>dialog).close();
      });
      btn.addEventListener("click", () => {
        (<HTMLDialogElement>dialog).showModal();
      });
      window.addEventListener("click", event => {
        if ((<HTMLElement>event.target).id === "gift-dialog") {
          (<HTMLDialogElement>dialog).close();
        }
      });
    });
  }

  get car() {
    return this.form.get("car");
  }

  update() {
    this.result = null;
    console.log("ok");
  }

  onSubmit() {
    this.carName = this.car.value.name;
    this.form.patchValue({ model: this.car.value.version });
    this.form.patchValue({ color: this.car.value.color });
    this.form.patchValue({ car: this.car.value.name });
    this.service.post(this.form.value).subscribe(res => {
      this.result = res;
      this.percent =
        parseInt(this.result.prepaidFee.toString()) /
        (parseInt(this.result.price.toString()) / 100);
    });
  }

  final() {
    if (this.carName === "FADIL") {
      return (
        parseInt(this.result.total.toString()) -
        parseInt(this.result.price.toString()) / 10
      );
    } else return parseInt(this.result.total.toString());
  }
}
