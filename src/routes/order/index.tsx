import React, {useState} from "react";

export default function RouteOrder() {
    const [isSelectedProducts, setIsSelectedProducts] = useState(true);

    return (
        <div className="container-fluid mt-4">
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body d-flex justify-content-center">
                            <div className="btn-group d-flex flex-wrap mb-3" role="group"
                                 aria-label="Select menu or product">
                                <button type="button"
                                        className={`btn btn-outline-primary ${isSelectedProducts ? 'active' : ''}`}
                                        onClick={() => setIsSelectedProducts(true)}>Products
                                </button>
                                <button type="button"
                                        className={`btn btn-outline-primary ${isSelectedProducts ? '' : 'active'}`}
                                        onClick={() => setIsSelectedProducts(false)}>Menus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body d-flex justify-content-center">
                            <h6>Details</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}