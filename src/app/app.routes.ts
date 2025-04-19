import { RouterModule, Routes } from '@angular/router';
import { CmpLogin } from './login/CmpLogin';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: CmpLogin },
    {
        path: 'home',
        loadChildren: () => import('./home/MdlHome').then(mod => mod.MdlHome),
        canLoad: []
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }