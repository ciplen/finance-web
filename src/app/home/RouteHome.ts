import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmpHome } from './CmpHome';
import { CmpFinDtl } from '../finance/CmpFinDtl';
import { CmpFin } from '../finance/CmpFin';
import { CmpDash } from '../dashboard/CmpDash';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: CmpHome,
            canActivate: [],
            children: [
                { path: '', component: CmpDash },
                { path: 'fin', component: CmpFin },
                { path: 'fin/:order_id', component: CmpFinDtl },
            ]
        }
    ])],
    exports: [RouterModule]
})
export class RoutHome { }
