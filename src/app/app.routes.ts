import { RouterModule, Routes } from '@angular/router';
import { CmpLogin } from './login/CmpLogin';
import { NgModule } from '@angular/core';
import { CmpHome } from './home/CmpHome';
import { CmpHomeDtl } from './home/CmpHomeDtl';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: CmpLogin },
    { path: 'home', component: CmpHome }, // Menambahkan rute 'home'
    { path: 'dtl/:id', component: CmpHomeDtl },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }