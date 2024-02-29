
import { LineItem } from './line-item.interface';

//Notifying any file that wants to use this , it needs to import it first
export interface Invoice {
    username: string;
    lineItems: LineItem[];
    partsAmount: number;
    laborAmount: number;
    lineItemTotal: number;
    total: number;
    orderDate: Date;
 }