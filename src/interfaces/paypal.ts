export interface PaypalOrderResponse {
    success: boolean;
    message: string;
    purchase_units?: PaypalPurchaseUnit[];
}

export interface PaypalOrderData {
    id: string;
    intent: string;
    status: string;
    payment_source: {
        paypal: PaypalPaymentSource;
    };
    purchase_units: PaypalPurchaseUnit[];
    payer: PaypalPayer;
    create_time: string;
    update_time: string;
    links: PaypalLink[];
}

export interface PaypalPaymentSource {
    email_address: string;
    account_id: string;
    account_status: string;
    name: {
        given_name: string;
        surname: string;
    };
    address: {
        country_code: string;
    };
}

export interface PaypalPurchaseUnit {
    reference_id: string;
    amount: {
        currency_code: string;
        value: string;
        breakdown: Record<string, unknown>;
    };
    payee: {
        email_address: string;
        merchant_id: string;
    };
    shipping: {
        name: {
            full_name: string;
        };
        address: {
            address_line_1: string;
            admin_area_2: string;
            admin_area_1: string;
            postal_code: string;
            country_code: string;
        };
    };
    payments: {
        captures: PaypalCapture[];
    };
    invoice_id: string;
}

export interface PaypalCapture {
    id: string;
    status: string;
    amount: {
        currency_code: string;
        value: string;
    };
    final_capture: boolean;
    seller_protection: {
        status: string;
        dispute_categories: string[];
    };
    seller_receivable_breakdown: {
        gross_amount: PaypalMoney;
        paypal_fee: PaypalMoney;
        net_amount: PaypalMoney;
        receivable_amount: PaypalMoney;
        exchange_rate: PaypalExchangeRate;
    };
    links: PaypalLink[];
    create_time: string;
    update_time: string;
}

export interface PaypalMoney {
    currency_code: string;
    value: string;
}

export interface PaypalExchangeRate {
    source_currency: string;
    target_currency: string;
    value: string;
}

export interface PaypalLink {
    href: string;
    rel: string;
    method: string;
}

export interface PaypalPayer {
    name: {
        given_name: string;
        surname: string;
    };
    email_address: string;
    payer_id: string;
    address: {
        country_code: string;
    };
}