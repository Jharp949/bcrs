/*
* Project Name: service-graph.component.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 2/26/2024
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/shared/invoice.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-service-graph',
  templateUrl: './service-graph.component.html',
  styleUrls: ['./service-graph.component.css']
})
export class ServiceGraphComponent implements OnInit {
  
  data: any;
  options: any;
  chart: any;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getLineItems().subscribe((lineItems: any) => {
        
      const labels = lineItems.map((item: any) => `${item.name} ($${item.price})`);
      const data = lineItems.map((item: any) => item.tally);

      this.data = {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            "#F2B90C",
            "#E8EBEB",
            "#007551",
            "#F28907",
            "#001120",
            "#002A20",
            "#6F7274",
            "#0D0D0D"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      };

      this.options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            labels: {
              font: {
                size: 14
              },
                color: '#001120',
            }
          },
        },
      };

      this.chart = new Chart('purchases', {
        type: 'pie',
        data: this.data,
        options: this.options
      });
    });
  }
}
