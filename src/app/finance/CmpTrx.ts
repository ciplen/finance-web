import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'cmp-fin',
    templateUrl: 'CmpTrx.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule, MatIconModule, RouterModule, MatDividerModule],
})

export class CmpTrx implements OnInit {
    finance: any[] = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        if (typeof localStorage !== 'undefined') {
            // // Ambil data pengguna dari localStorage
            const storedData = localStorage.getItem('finance');
            if (storedData) {
                const parsed = JSON.parse(storedData);

                // Convert object with dynamic keys into array
                this.finance = Object.keys(parsed.data).map(key => {
                    return {
                        order_id: key,
                        ...parsed.data[key]
                    };
                });
            }

            // Jika tidak ada data pengguna, arahkan kembali ke halaman login
            if (!this.finance || Object.keys(this.finance).length === 0) {
                this.router.navigateByUrl('');
            }
        }
    }

    selectTransaction(trx: any) {
        localStorage.setItem('selectedTransaction', JSON.stringify(trx)); // Simpan ke localStorage
        this.router.navigate(['./' + trx.order_id], { relativeTo: this.route });

    }

    settingPage() {
        alert('The Page for Setting is under development');
    }

    logout() {
        // Hapus data pengguna dan arahkan ke halaman login
        localStorage.removeItem('finance');
        this.router.navigateByUrl('');
    }
}