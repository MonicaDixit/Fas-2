import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { SolutionComponent } from "./solution.component";
import { CostComponent } from "./cost.component";

@NgModule({
   imports: [SharedModule],
   declarations: [SolutionComponent, CostComponent],
   exports: [SolutionComponent, CostComponent]
})
export class SolutionModule {}
