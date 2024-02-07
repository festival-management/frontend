import React from "react";
import {Link} from "react-router-dom";

import {LINKS} from "../env/links";
import LinkModel from "../models/link.model";
import useTokenJwt from "../store/useTokenJwt";
import useTokenJwtUtils from "../hooks/useTokenJwtUtils";

function NavLinkList() {
    const token = useTokenJwt();
    const tokenService = useTokenJwtUtils();

    let links = [...LINKS];
    links.push(new LinkModel(Link, "/", "nav-link", "Logout", (t) => t.isLoggedIn(), () => token.reset()));

    const filteredLinks = links.filter((link) => link.check(tokenService));

    return (
        <>
            {filteredLinks.map((link, index) => <React.Fragment key={index}>{link.valueOf()}</React.Fragment>)}
        </>
    );
}

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Festival</Link>
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
