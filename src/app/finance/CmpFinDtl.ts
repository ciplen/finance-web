import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { Order } from '../dto/DtoHomeDtl';

@Component({
    selector: 'cmp-fin-dtl',
    templateUrl: 'CmpFinDtl.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule, MatIconModule, RouterModule, MatDividerModule],
})

export class CmpFinDtl implements OnInit {
    trxData: any;

    constructor(private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const rawData = localStorage.getItem('selectedTransaction');
        if (rawData) {
            this.trxData = JSON.parse(rawData);
            console.log('Data transaksi:', this.trxData);
        } else {
            console.warn('Data transaksi tidak ditemukan');
        }
    }

    logout() {
        // Hapus data pengguna dan arahkan ke halaman login
        localStorage.removeItem('finance');
        this.router.navigateByUrl('');
    }
}