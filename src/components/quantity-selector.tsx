type QuantitySelectorProps = {
    quantity: number;
    handleQuantityChange: (change: number) => void;
};

export default function QuantitySelector({quantity, handleQuantityChange}: QuantitySelectorProps) {
    return (
        <div className="d-flex align-items-center">
            <button
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 0}
                style={{width: "25px", height: "25px"}}
            >
                <i className="bi bi-dash"></i>
            </button>
            <span className="mx-3">{quantity}</span>
            <button
                className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center me-2"
                onClick={() => handleQuantityChange(1)}
                style={{width: "25px", height: "25px"}}
            >
                <i className="bi bi-plus"></i>
            </button>
        </div>
    );
}