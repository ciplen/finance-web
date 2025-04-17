import { RouterModule, Routes } from '@angular/router';
import { CmpLogin } from './login/CmpLogin';
import { NgModule } from '@angular/core';
import { CmpHome } from './home/CmpHome';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: CmpLogin },
    { path: 'home', component: CmpHome }, // Menambahkan rute 'home'

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }