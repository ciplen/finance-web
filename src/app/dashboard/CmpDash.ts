import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'cmp-dash',
    templateUrl: 'CmpDash.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule, MatIconModule, RouterModule, MatDividerModule],
})

export class CmpDash implements OnInit {
    finance: any[] = [];

    constructor(private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        
    }

}