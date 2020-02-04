import { Component, OnInit } from "@angular/core";
import { PriceService } from "src/app/services/price.service";
import { Observable } from "rxjs";
import { Province, Car } from "src/app/models/price";
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
  provinces: Province[];
  cars: Car[];
  form = this.formBuilder.group({
    contact: ["", Validators.required],
    car: ["", Validators.required],
    color: ["", Validators.required],
    model: ["", Validators.required],
    province: ["", Validators.required]
  });
  ngOnInit() {
    this.service.getProvinces().subscribe(e => (this.provinces = e));
    this.service.getCars().subscribe(e => (this.cars = e));
  }

  get car() {
    return this.form.get("car");
  }

  onSubmit() {
    this.form.patchValue({ model: this.car.value.version });
    this.form.patchValue({ color: this.car.value.color });
    this.form.patchValue({ car: this.car.value.name });
    console.log(this.form.value);
    
    this.service.post(this.form.value).subscribe(res => console.log(res));
  }
}
