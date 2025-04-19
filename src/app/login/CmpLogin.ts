import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
    selector: 'CmpLogin',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule],
    templateUrl: 'CmpLogin.html'
})

export class CmpLogin implements OnInit {
    user: string = '';
    password: string = '';
    responseData: any = null;

    constructor(private http: HttpClient,
        private router: Router,
    ) { }
    
    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }

    alertDialog() {
        alert('Feature On Progress');
    }

    registerPage() {
        alert('The Page for Register is under development');
    }

    onSubmit() {
        const payload = { user: this.user, password: this.password };

        this.http.post('https://login-bir3msoyja-et.a.run.app/', payload,
            { headers: { 'Content-Type': 'application/json' } })
            .subscribe({
                next: (response) => {
                    localStorage.setItem('finance', JSON.stringify(response));
                    console.log('Login successful:', response);
                    alert('Login berhasil!');
                    this.router.navigateByUrl('/home');

                },
                error: (error) => {
                    console.error('Login failed:', error);
                    alert('Login gagal. Silakan periksa kembali email dan password.');
                }
            });
    }
}