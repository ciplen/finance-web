// Bagian PRODUCT
export interface Product {
    device_id: string;
    column: string;
    name: string;
    location: string;
    sku: string;
}

// Bagian PAYMENT
export interface PaymentFee {
    platform_sharing_revenue: number;
    mdr_qris: number;
}

export interface PaymentDetail {
    transaction_id: string;
    transaction_status: string;
    transaction_time: string;
    order_id: string;
    issuer: string;
}

export interface Payment {
    amount: number;
    method: string;
    nett: number;
    fee: PaymentFee;
    detail: PaymentDetail;
}

// Bagian DETAIL
export interface OrderDetail {
    transaction_status: string;
    order_id: string;
}

// Bagian TIME
export interface FirestoreTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

export interface Time {
    firestore_timestamp: FirestoreTimestamp;
    timestamp: number;
}

// DTO utama
export interface Order {
    product: Product;
    payment: Payment;
    detail: OrderDetail;
    time: Time;
}