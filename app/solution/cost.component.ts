import { Component, Input } from "@angular/core";

@Component({
   moduleId: __moduleName,
   selector: "my-cost",
   templateUrl: "cost.component.html"
})
export class CostComponent {
   @Input() cost: number;
   @Input() exchangeRateGBP: number;
   @Input() exchangeRateEUR: number;
   @Input() selectedexchangeRate: string;
}
