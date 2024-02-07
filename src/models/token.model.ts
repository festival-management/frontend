import {Permission} from "../enums/permission";

export interface Token {
    user_id: number
    role_id: number
    permissions: Record<Permission, boolean>
    exp: number
}
