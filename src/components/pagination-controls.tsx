import React from 'react';

type PaginationControlsProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalCount: number;
};

function PaginationControls({page, setPage, totalCount}: PaginationControlsProps) {
    const pages: React.JSX.Element[] = [];
    const totalPages = Math.ceil(totalCount / process.env.REACT_APP_DEFAULT_LIMIT_VALUE);

    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            (
                <button
                    key={i}
                    type="button"
                    className={`btn btn-primary ${i === page ? "active" : ""}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        );
    }

    return (
        <div className="d-flex justify-content-end">
            <div className="btn-group" role="group">
                {pages}
            </div>
        </div>
    );
}

export default PaginationControls;