import { CommonModule, DecimalPipe } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

@Component({
    selector: 'cmp-dash',
    templateUrl: 'CmpDash.html',
    styleUrls: ['CmpDash.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, MatDialogModule, MatSidenavModule, MatIconModule, RouterModule, MatDividerModule],
    providers: [DecimalPipe]
})

export class CmpDash implements OnInit {
    finance: any[] = [];
    cntSettlement: number = 0;
    cntRefunded: number = 0;
    cntCancel: number = 0;
    cntQrs: number = 0;
    cntEcr: number = 0;
    cntRfid: number = 0;
    cntCash: number = 0;
    amntSettlement: number = 0;
    amntRefunded: number = 0;
    amntCancel: number = 0;
    myChart?: ApexCharts;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private numberPipe: DecimalPipe
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
                const paymentCount: Record<string, number> = {};

                // Convert object with dynamic keys into array
                this.finance = Object.keys(parsed.data)
                    .filter(key => {
                        const entry = parsed.data[key];

                        const status = entry.detail?.transaction_status;
                        const payment = entry.payment?.method;
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


                        if (!paymentCount[payment]) {
                            paymentCount[payment] = 0;
                        }

                        paymentCount[payment]++;
                        this.cntCash = paymentCount['CASH'] || 0;
                        this.cntQrs = paymentCount['QRIS-MIDTRANS'] || 0;
                        this.cntEcr = paymentCount['ECR'] || 0;
                        this.cntRfid = paymentCount['RFID'] || 0;

                        return isValidStatus && isValidAmount;
                    })
                    .map(key => ({
                        order_id: key,
                        ...parsed.data[key]
                    }));
                this.chart(this.finance);
            }

            // Jika tidak ada data pengguna, arahkan kembali ke halaman login
            if (!this.finance || Object.keys(this.finance).length === 0) {
                this.router.navigateByUrl('');
            }
        }
    }

    chart(data: any) {
        const update = Object.entries(data).map(([key, value]: any) => ({
            x: value.payment.method,  // method
            y: value.payment.amount     // amount
        }));
        console.log("Data yang diambil adalah " + update);

        if (!this.myChart) {
            const options: ApexCharts.ApexOptions = {
                colors: ["#1A56DB", "#FDBA8C"],
                series: [
                    {
                        name: "Transaction",
                        color: "#F9E79F",
                        data: update
                    }],
                chart: {
                    type: "bar",
                    height: 220,
                    fontFamily: "Inter, sans-serif",
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "50%",
                        borderRadiusApplication: "end",
                        borderRadius: 8,
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    style: {
                        fontFamily: "Inter, sans-serif",
                    },
                    y: {
                        formatter: (val) => {
                            return this.numberPipe.transform(val, '.2') || '0'
                        }
                    }
                },
                states: {
                    hover: {
                        filter: {
                            type: "darken",
                        },
                    },
                },
                stroke: {
                    show: true,
                    width: 0,
                    colors: ["transparent"],
                },
                grid: {
                    show: false,
                    strokeDashArray: 4,
                    padding: {
                        left: 2,
                        right: 2,
                        top: -14,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    type: "category",
                    floating: false,
                    labels: {
                        show: true,
                        style: {
                            fontFamily: "Inter, sans-serif",
                            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
                        },
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                yaxis: {
                    show: false,
                },
                fill: {
                    opacity: 1,
                },
            };

            if (document.getElementById("column-chart") && typeof ApexCharts !== "undefined") {
                this.myChart = new ApexCharts(
                    document.getElementById("column-chart"),
                    options
                );

                this.myChart.render();
            }
        } else {
            this.myChart?.updateSeries([
                {
                    name: "Trx",
                    color: "#F9E79F",
                    data: update
                }])
        }

    }
}