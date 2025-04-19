import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmpHome } from './CmpHome';
import { CmpTrx } from '../finance/CmpTrx';
import { CmpDash } from '../dashboard/CmpDash';
import { CmpTrxDtl } from '../finance/CmpTrxDtl';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: CmpHome,
            canActivate: [],
            children: [
                { path: '', component: CmpDash },
                { path: 'trx', component: CmpTrx },
                { path: 'trx/:order_id', component: CmpTrxDtl },
            ]
        }
    ])],
    exports: [RouterModule]
})
export class RoutHome { }
