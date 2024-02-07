import React from "react";
import {Link, NavLink} from 'react-router-dom';

import {TokenJwtUtils} from "./token-jwt-utils.model";

export default class LinkModel {
    constructor(
        public readonly type: typeof NavLink | typeof Link,
        public readonly to: string,
        public readonly className: string,
        public readonly text: string,
        public readonly check: (t: TokenJwtUtils) => boolean,
        public readonly onClick?: () => void,
    ) {
    }

    valueOf() {
        return <this.type
            to={this.to}
            className={this.className}
            onClick={this.onClick}
        >
            {this.text}
        </this.type>;
    }
}
