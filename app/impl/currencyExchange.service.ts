import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class CurrencyExchangeService {
   constructor(private http: Http) {}

   getExchangeValue() {
      return this.http
         .get(`https://api.fixer.io/latest?base=USD`)
         .map((res: Response) => res.json());
   }
}
