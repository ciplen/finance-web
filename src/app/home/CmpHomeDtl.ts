import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";

@Component({
    selector: 'cmp-home-dtl',
    templateUrl: 'CmpHomeDtl.html',
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule, MatIconModule, MatDividerModule],
    styleUrls: ['./CmpHomeDtl.scss']
})

export class CmpHomeDtl extends Component implements OnInit {
    
    ngOnInit(): void {}

}