import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'cmp-home',
    templateUrl: 'CmpHome.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule, MatIconModule, RouterModule, MatDividerModule],
})

export class CmpHome extends Component implements OnInit {
    finance: any[] = [];

    constructor(private router: Router) {
        super({});
    }

    ngOnInit() {
    }

    settingPage() {
        alert('Setting is under development');
    }

    logout() {
        // Hapus data pengguna dan arahkan ke halaman login
        localStorage.removeItem('finance');
        this.router.navigateByUrl('');
    }
}