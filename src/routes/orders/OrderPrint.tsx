import {useState} from "react";

import {PrinterType} from "../../enums/printer-type.ts";
import {UseOrdersApiInterface} from "../../models/order.model.ts";
import useOrderMutations from "../../hooks/mutations/use-order-mutations.ts";

interface OrderPrintProps {
    ordersApi: UseOrdersApiInterface;
    orderId: number;
}

export default function OrderPrint({ordersApi, orderId}: OrderPrintProps) {
    const [printerTypes, setPrinterTypes] = useState<Map<PrinterType, boolean>>(
        () =>
            new Map<PrinterType, boolean>(
                Object.values(PrinterType).map((printerType) => [printerType, false])
            )
    );

    const {printOrderMutation} = useOrderMutations(ordersApi);

    const handlePrinterTypeToggle = (printerType: PrinterType) => {
        setPrinterTypes(prevState => {
            const newState = new Map(prevState);
            const currentValue = newState.get(printerType) || false;
            newState.set(printerType, !currentValue);
            return newState;
        });
    };

    const handleSubmitChangePrinterTypes = async () => {
        const trueKeys: PrinterType[] = [];

        for (const key in Object.fromEntries(printerTypes)) {
            if (printerTypes.get(key as PrinterType) === true) {
                trueKeys.push(key as PrinterType);
            }
        }

        printOrderMutation.mutate({
            orderId,
            printerTypes: trueKeys.length === 0 ? undefined : trueKeys
        });
    };

    return (
        <>
            <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#modalOrderPrint-${orderId}`}>
                <i className="bi bi-printer"></i>
            </button>

            <div className="modal fade" id={`modalOrderPrint-${orderId}`} tabIndex={-1} aria-labelledby={`modalOrderPrintLabel-${orderId}`}
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`modalOrderPrintLabel-${orderId}`}>Print Order {orderId}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {Object.values(PrinterType).map(printerType => (
                                <div className="form-check form-switch" key={printerType}>
                                    <input className="form-check-input" type="checkbox" id={printerType}
                                           checked={printerTypes?.get(printerType) ?? false}
                                           onChange={() => handlePrinterTypeToggle(printerType)}/>
                                    <label className="form-check-label" htmlFor={printerType}>
                                        {printerType.toString().replaceAll("_", " ")}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitChangePrinterTypes}>Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}