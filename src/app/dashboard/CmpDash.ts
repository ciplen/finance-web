import { CommonModule, DecimalPipe } from "@angular/common";
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
    cntSettlement: number = 0;
    cntRefunded: number = 0;
    cntCancel: number = 0;
    amntSettlement: number = 0;
    amntRefunded: number = 0;
    amntCancel: number = 0;

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
                const statusCount: Record<string, number> = {};
                const amountByStatus: Record<string, number> = {};

                // Convert object with dynamic keys into array
                this.finance = Object.keys(parsed.data)
                    .filter(key => {
                        const entry = parsed.data[key];

                        const status = entry.detail?.transaction_status;
                        const isValidStatus = status === 'settlement';

                        if (!statusCount[status]) {
                            statusCount[status] = 0;
                        }
                        statusCount[status]++;
                        this.cntSettlement = statusCount['settlement'] || 0;
                        this.cntRefunded = statusCount['refunded'] || 0;
                        this.cntCancel = statusCount['cancel'] || 0;

                        const amount = entry.payment?.amount ?? 0;
                        const isValidAmount = amount > 10000;
                        if (!amountByStatus[status]) {
                            amountByStatus[status] = 0;
                        }

                        amountByStatus[status] += amount;
                        this.amntSettlement = amountByStatus['settlement'] || 0;
                        this.amntRefunded = amountByStatus['refunded'] || 0;
                        this.amntCancel = amountByStatus['cancel'] || 0;

                        return isValidStatus && isValidAmount;
                    })
                    .map(key => ({
                        order_id: key,
                        ...parsed.data[key]
                    }));
            }

            // this.searchProfLos(this.finance);

            // Jika tidak ada data pengguna, arahkan kembali ke halaman login
            if (!this.finance || Object.keys(this.finance).length === 0) {
                this.router.navigateByUrl('');
            }
        }
    }

    // chart(data: any) {
    //     var update = data.map((item: { label: any; value: any; }) => ({
    //         x: item.label,
    //         y: item.value,
    //     }));

    //     if (!this.myChart) {
    //         const options: ApexCharts.ApexOptions = {
    //             colors: ["#1A56DB", "#FDBA8C"],
    //             series: [
    //                 {
    //                     name: "Laba Rugi",
    //                     color: "#F9E79F",
    //                     data: update
    //                 }],
    //             chart: {
    //                 type: "bar",
    //                 height: "220px",
    //                 fontFamily: "Inter, sans-serif",
    //                 toolbar: {
    //                     show: false,
    //                 },
    //             },
    //             plotOptions: {
    //                 bar: {
    //                     horizontal: false,
    //                     columnWidth: "50%",
    //                     borderRadiusApplication: "end",
    //                     borderRadius: 8,
    //                 },
    //             },
    //             tooltip: {
    //                 shared: true,
    //                 intersect: false,
    //                 style: {
    //                     fontFamily: "Inter, sans-serif",
    //                 },
    //                 y: {
    //                     formatter: (val) => {
    //                         return this.numberPipe.transform(val, '.2') || '0'
    //                     }
    //                 }
    //             },
    //             states: {
    //                 hover: {
    //                     filter: {
    //                         type: "darken",
    //                         value: 1,
    //                     },
    //                 },
    //             },
    //             stroke: {
    //                 show: true,
    //                 width: 0,
    //                 colors: ["transparent"],
    //             },
    //             grid: {
    //                 show: false,
    //                 strokeDashArray: 4,
    //                 padding: {
    //                     left: 2,
    //                     right: 2,
    //                     top: -14,
    //                 },
    //             },
    //             dataLabels: {
    //                 enabled: false,
    //             },
    //             legend: {
    //                 show: false,
    //             },
    //             xaxis: {
    //                 floating: false,
    //                 labels: {
    //                     show: true,
    //                     style: {
    //                         fontFamily: "Inter, sans-serif",
    //                         cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
    //                     },
    //                 },
    //                 axisBorder: {
    //                     show: false,
    //                 },
    //                 axisTicks: {
    //                     show: false,
    //                 },
    //             },
    //             yaxis: {
    //                 show: false,
    //             },
    //             fill: {
    //                 opacity: 1,
    //             },
    //         };

    //         if (document.getElementById("column-chart") && typeof ApexCharts !== "undefined") {
    //             this.myChart = new ApexCharts(
    //                 document.getElementById("column-chart"),
    //                 options
    //             );

    //             this.myChart.render();
    //         }
    //     } else {
    //         this.myChart?.updateSeries([
    //             {
    //                 name: "Laba Rugi",
    //                 color: "#F9E79F",
    //                 data: update
    //             }])
    //     }
    // }

    // searchProfLos(finance: any) {
    //     this.chart(finance);
    // }


}