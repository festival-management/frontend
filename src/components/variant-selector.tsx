import React from "react";

import {ProductVariant} from "../models/products.model.ts";

type VariantSelectorProps = {
    index: number;
    variants: ProductVariant[];
    selectedVariantId: number;
    onVariantChange: (variantId: number) => void;
};

export default function VariantSelector({index, variants, selectedVariantId, onVariantChange}: VariantSelectorProps) {
    return (
        <div className="mb-3 row align-items-center">
            <div className="col-2">
                <label htmlFor={`variantSelect-${index}`} className="form-label"><strong>Choose a variant:</strong></label>
            </div>
            <div className="col">
                <select
                    id={`variantSelect-${index}`}
                    className="form-select"
                    value={selectedVariantId ?? ""}
                    onChange={(e) => onVariantChange(parseInt(e.target.value))}
                >
                    <option value="-1">Select Variant</option>
                    {variants.map(variant => (
                        <option key={variant.id} value={variant.id}>{variant.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}