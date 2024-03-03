/*
* Project Name: invoice.interface.ts
* Authors: Laurel Condon, James Harper, Danielle Taplin
* Date: 3/3/2024
*/

import { LineItems } from './line-item.interface';

//Notifying any file that wants to use this , it needs to import it first
export interface Invoice {
    username: string;
    lineItems: LineItems[];
    partsAmount: number;
    laborAmount: number;
    lineItemTotal: number;
    total: number;
    orderDate: Date;
 }