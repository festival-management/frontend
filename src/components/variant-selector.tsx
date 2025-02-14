import {ProductVariant} from "../models/products.model.ts";

type VariantSelectorProps = {
    variants: ProductVariant[];
    selectedVariantId: number | null;
    onVariantChange: (variantId: number | null) => void;
};

export default function VariantSelector({variants, selectedVariantId, onVariantChange}: VariantSelectorProps) {
    return (
        <div className="mb-3 row align-items-center">
            <div className="col">
                <select
                    className="form-select"
                    value={selectedVariantId ?? ""}
                    onChange={(e) => {
                        const value = e.target.value === "" ? null : parseInt(e.target.value);
                        onVariantChange(value);
                    }}
                >
                    <option value="">Select Variant</option>
                    {variants.map(variant => (
                        <option key={variant.id} value={variant.id}>{variant.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}