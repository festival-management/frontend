import React from "react";

import {ProductVariant} from "../models/products.model.ts";

type VariantSelectorProps = {
    variants: ProductVariant[];
    selectedVariantId: number;
    onVariantChange: (variantId: number) => void;
};

export default function VariantSelector({variants, selectedVariantId, onVariantChange}: VariantSelectorProps) {
    return (
        <div className="mb-3">
            <label htmlFor="variantSelect" className="form-label"><strong>Choose a variant:</strong></label>
            <select
                id="variantSelect"
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
    );
}