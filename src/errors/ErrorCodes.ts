

export enum ErrorCodes {
    SUCCESS,

    // Auth
    // Login
    INVALID_USERNAME_OR_PASSWORD,
    USERNAME_TOO_LONG,

    // Register
    CANNOT_CREATE_ADMIN_USER,
    ROLE_NOT_FOUND,
    USER_ALREADY_EXISTS,

    // Order
    // Create
    INPUT_MENU_FIELD_PRODUCT_VARIANT,
    INPUT_PRODUCT_VARIANT,
    MENU_DATE_NOT_VALID,
    MENU_FIELD_NOT_EXIST,
    MENU_FIELD_PRODUCT_INGREDIENT_NOT_EXIST,
    MENU_FIELD_PRODUCT_VARIANT_NOT_EXIST,
    MENU_FIELD_PRODUCT_NOT_EXIST,
    MENU_FIELD_TOO_MANY_PRODUCTS,
    MENU_NOT_EXIST,
    MENU_ROLE_NOT_EXIST,
    MISSING_MENU_FIELD_PRODUCTS,
    MISSING_OBLIGATORY_MENU_FIELDS,
    MISSING_PRODUCT_QUANTITY,
    NO_PRODUCTS_AND_MENUS,
    PRODUCT_DATE_NOT_VALID,
    PRODUCT_INGREDIENT_NOT_EXIST,
    PRODUCT_NOT_EXIST,
    PRODUCT_ROLE_NOT_EXIST,
    PRODUCT_VARIANT_NOT_EXIST,
    SET_GUESTS_NUMBER,

    // Token
    INVALID_JWT_TOKEN,

    // Permission
    NOT_ALLOWED,
    NOT_AUTHENTICATED,

    // Default
    GENERIC_HTTP_EXCEPTION,
    INTERNAL_ERROR_SERVER,
    REQUEST_VALIDATION_ERROR,
}