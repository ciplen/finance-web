import { NgModule } from '@angular/core';
import { RoutHome } from './RouteHome';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    imports: [CommonModule, RoutHome, NgApexchartsModule],
    declarations: [],
    exports: [],
    providers: []
})
export class MdlHome { }
