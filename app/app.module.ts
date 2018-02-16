import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { SolutionModule } from './solution/solution.module';
import { FaasPlatformService } from './api/faasPlatform.service';
import { CurrencyExchangeService } from './impl/currencyExchange.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
   imports: [
      BrowserModule,
      HttpModule,
      SharedModule,
      ClarityModule.forRoot(),
      SolutionModule
   ],
   declarations: [AppComponent],
   providers: [FaasPlatformService, CurrencyExchangeService],
   bootstrap: [AppComponent]
})
export class AppModule {}
