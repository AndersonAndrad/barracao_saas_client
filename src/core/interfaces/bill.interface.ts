import {PaginationRequest} from './pagination.interface';

export interface Bill {
    _id: string; // Unique identifier for the bill
    billNumber: string; // Bill or invoice number
    dueDate: Date; // Date by which payment should be made
    status: BillStatus; // Status of the bill
    category: string;

    payerDetails?: PayerDetails; // Details of the payer
    payeeDetails?: PayeeDetails; // Details of the payee

    // Financial Details
    amount: number; // Total amount to be paid
    currency: string; // Currency code, e.g., USD, EUR
    tax?: number; // Applicable taxes on the bill
    discount?: number; // Discounts applied to the bill
    totalAmount: number; // Final amount after tax and discount
    paymentTerms?: string; // Payment terms, e.g., Net 30, Net 60
    paymentMethod?: 'Credit Card' | 'Bank Transfer' | 'Cash'; // Payment method

    notes?: string; // Optional notes or comments about the items

    // Payment Tracking
    payments?: Payment[]; // Array of payment records

    balanceDue?: number; // Remaining balance to be paid
    overpayment?: number; // Amount overpaid, if applicable

    // Additional Information
    attachments?: string[]; // URLs or file paths to related documents
    referenceNumber?: string; // External reference or transaction number
}

export interface PersonaDetails {
    _id: string;
    name: string;
    contact?: string;
    address?: string;
    document?: string;
}

export interface PayerDetails extends PersonaDetails {
}

export interface PayeeDetails extends PersonaDetails {
}

export interface Payment {
    paymentId: string;
    amountPaid: number;
    datePaid: Date;
    method: PaymentMethod;
}

export enum BillStatus {
    PENDING = 'pending',
    PAID = 'paid',
    OVERDUE = 'overdue',
    CANCELLED = 'cancelled',
}

export enum PaymentMethod {
    CREDIT_CARD = 'creditCard',
    PIX = 'pix',
}

export interface FilterBill extends PaginationRequest {
}
