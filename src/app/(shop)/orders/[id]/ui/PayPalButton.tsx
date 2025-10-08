'use client'
import {
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from '@paypal/paypal-js';
import { setTransactionId } from "@/actions";
import { paypalChekPayment } from "@/actions/payments/paypal-check-payment";

interface Props {
    orderId: string;
    amount: number;
}

export default function PaypalButton({ orderId, amount }: Props) {
    const [{ isPending }] = usePayPalScriptReducer();
    const roundedAmount = Math.round(amount * 100) / 100; // Redondear a 2 decimales

    if (isPending) {
        return (
            <div className="w-full flex justify-center">
                <span>Loading PayPal...</span>
            </div>
        );
    }

    // Esto debe generar el transactionId
    async function createOrder(data: CreateOrderData, actions: CreateOrderActions): Promise<string> {
        const transactionId = await actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
                {
                    // para decirle a paypal que es nuestro id de orden(entonce si queremos hacer otro pago de la misma orden no nos dejara)
                    //Esto influye en el objeto que nos devuelve paypal
                    invoice_id: orderId,
                    amount: {
                        currency_code: "USD",
                        value: roundedAmount.toString(),
                    },
                },
            ],
        });
        // Salvar en base de datos el transactionId
        const res = await setTransactionId(orderId, transactionId);

        if (!res.success) {
            throw new Error(res.message);
        }

        return transactionId; // this will be the orderID
    }

    async function onApprove(data: OnApproveData, actions: OnApproveActions) {
        const details = await actions.order?.capture();
        if (!details?.id) {
            throw new Error("No details");
        }
        const res = await paypalChekPayment(details.id) //Verificar el pago en backend
        if (!res.success) {
            throw new Error(res.message);
        }
        alert(`Transaction completed by ${name}`);
    }


    return (
        <div className="w-full mt-5 z-0">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>
    );
}