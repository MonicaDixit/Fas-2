import { Component } from "@angular/core";
import { FaasPlatformService } from "../api/faasPlatform.service";
import { CurrencyExchangeService } from "../impl/currencyExchange.service";
import { OnInit, OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { IFaasInfo } from "../api/FaasInfo";
import { IFaasUsage } from "../api/FaasUsage";
import { DashboardItem } from "./dashboardItem.model";
import { Subscription } from "rxjs/Subscription";
//import { CostComponent } from "./cost.component";

@Component({
   moduleId: __moduleName,
   selector: "my-solution",
   templateUrl: "solution.component.html",
   providers: [FaasPlatformService, CurrencyExchangeService]
})
export class SolutionComponent implements OnInit, OnDestroy {
   private faasListForDash: IFaasInfo[] = [];
   private faasObjForDash: {} = {};
   private subscription: Subscription;
   private idList: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
   private exchangeRateGBP: number;
   private exchangeRateEUR: number;
   private currencies = ["USD", "GBP", "EUR"];
   //private selectedexchangeRate = "USD";

   constructor(
      private faasPService: FaasPlatformService,
      private currencyExg: CurrencyExchangeService
   ) {}
   ngOnInit() {
      this.getExchangeRateEUR("EUR");
      this.getExchangeRateGBP("GBP");
      this.faasListForDash = [];
      for (let id of this.idList) {
         let combinedSrc = this.faasPService
            .getFaasInfo$(id)
            .combineLatest(this.faasPService.getFaasUsage$(id))
            .map(([val1, val2]) => {
               return this.getDashboardData(val1, val2);
            });

         this.subscription = combinedSrc.subscribe(data => {
            this.faasObjForDash[id] = data;
            this.faasListForDash = [];
            for (let key in this.faasObjForDash) {
               // this.faasListForDash = [];
               this.faasListForDash.push(this.faasObjForDash[key]);
            }
         });
      }
   }

   getDashboardData(faasInfo: IFaasInfo, faasUsage: IFaasUsage) {
      // this.faasListForDash = [];
      const dashItem: DashboardItem = {
         id: faasInfo.id as string,
         name: faasInfo.name as string,
         description: faasInfo.description as string,
         memoryAllocation: faasInfo.memoryAllocation as number,
         instances: faasUsage.instances as number,
         state: faasUsage.state,
         totalCost: (faasInfo.runtimeCost * faasUsage.totalMonthlyRuntime +
            faasInfo.invocationCost *
               faasUsage.totalMonthlyInvocations) as number
      };
      return dashItem;
   }

   getExchangeRateGBP(symbol) {
      return this.currencyExg.getExchangeValue().subscribe(data => {
         //console.log(data["rates"][symbol]);
         this.exchangeRateGBP = data["rates"][symbol];
         console.log("this.exchangeRateEUR", this.exchangeRateGBP);
      });
   }

   getExchangeRateEUR(symbol) {
      return this.currencyExg.getExchangeValue().subscribe(data => {
         //console.log(data["rates"][symbol]);
         this.exchangeRateEUR = data["rates"][symbol];
         console.log("this.exchangeRateEUR", this.exchangeRateEUR);
      });
   }

   // setData(val) {
   //    console.log(val);
   //    this.selectedexchangeRate = val;
   // }

   ngOnDestroy() {
      this.subscription.unsubscribe();
   }
}
