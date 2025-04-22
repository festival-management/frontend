import React, {useState} from "react";

import {Printer, UsePrintersApiInterface} from "../../models/printers.model.ts";
import usePrinterMutations from "../../hooks/mutations/use-printer-mutations.ts";

interface CreatePrinterFormProps {
    printersApi: UsePrintersApiInterface;
    setPrinters: React.Dispatch<React.SetStateAction<Printer[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CreatePrinterForm({printersApi, setPrinters, setTotalCount}: CreatePrinterFormProps) {
    const [newPrinterName, setNewPrinterName] = useState("");
    const [newPrinterIpAddress, setNewPrinterIpAddress] = useState("");

    const {addPrinterMutation} = usePrinterMutations(printersApi);

    const handleNewPrinterNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrinterName(event.target.value);
    };

    const handleNewPrinterIpAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrinterIpAddress(event.target.value);
    };

    const handleSubmitAddPrinter = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await addPrinterMutation.mutateAsync({name: newPrinterName, ipAddress: newPrinterIpAddress});

        if (!response.error) {
            setPrinters((prevState) => [...prevState, response.printer!]);
            setTotalCount((prevState) => prevState + 1);
        }

        setNewPrinterName("");
        setNewPrinterIpAddress("");
    };

    return (
        <form className="mb-3" onSubmit={handleSubmitAddPrinter}>
            <h6>Create new printer</h6>
            <div className="input-group mb-3">
                <span className="input-group-text">Name</span>
                <input type="text" id="newPrinterName" className="form-control" value={newPrinterName}
                       onChange={handleNewPrinterNameChange}
                       required/>
                <span className="input-group-text">Ip address</span>
                <input type="text" id="newPrinterIpAddress" className="form-control" value={newPrinterIpAddress}
                       onChange={handleNewPrinterIpAddressChange}
                       required/>
                <button className="btn btn-success">Create</button>
            </div>
        </form>
    );
}