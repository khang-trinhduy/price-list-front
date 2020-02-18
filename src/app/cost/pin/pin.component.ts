import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Observable } from 'rxjs';

@Component({
  selector: "app-pin",
  templateUrl: "./pin.component.html",
  styleUrls: ["./pin.component.styl"]
})
export class PinComponent implements OnInit {
  @Input() line;
  @Input() value;
  @Output()unpin: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  remove() {
    if (this.value) {
      let raw = this.value.split('VNĐ')[0].split('.').join('').trim();
      let money = parseInt(raw);
      this.unpin.emit(money);
    }
  }
}
