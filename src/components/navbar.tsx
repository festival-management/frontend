import React from "react";
import {Link} from "react-router-dom";

import {LINKS} from "../env/links";
import LinkModel from "../models/link.model";
import useTokenJwtUtils from "../hooks/use-token-jwt-utils";

function NavLinkList() {
    const tokenService = useTokenJwtUtils();

    const links = [...LINKS];
    links.push(new LinkModel(Link, "/", "nav-link text-white", "Logout", (t) => t.isLoggedIn(), () => tokenService.reset()));

    const filteredLinks = links.filter((link) => link.check(tokenService));

    return (
        <>
            {filteredLinks.map((link, index) => <React.Fragment key={index}>{link.valueOf()}</React.Fragment>)}
        </>
    );
}

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg" id="navbar" style={{ backgroundColor: '#08313F' }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand text-white d-flex align-items-center">
                    <img
                        src="favicon.ico"
                        alt="favicon"
                        width="24"
                        height="24"
                        className="me-2"
                    />
                    Festival
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <div className="navbar-nav">
                        <NavLinkList/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
