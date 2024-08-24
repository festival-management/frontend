

export enum ErrorCodes {
    SUCCESS = 0,

    // Auth
    // Login
    INVALID_USERNAME_OR_PASSWORD,
    USERNAME_TOO_LONG,
    // Register
    CANNOT_CREATE_ADMIN_USER,
    USER_ALREADY_EXISTS,

    // Menus
    MENU_ALREADY_EXISTS,
    MENU_NOT_FOUND,
    MENU_SHORT_NAME_ALREADY_EXISTS,
    // Add menu date
    MENU_DATE_ALREADY_EXISTS,
    // Add menu field
    MENU_FIELD_ALREADY_EXISTS,
    // Add menu field product
    MENU_FIELD_PRODUCT_ALREADY_EXISTS,
    // Add menu role
    MENU_ROLE_ALREADY_EXISTS,
    // Delete menu date
    MENU_DATE_NOT_FOUND,
    // Delete menu field
    MENU_FIELD_NOT_FOUND,
    // Delete menu field product
    MENU_FIELD_PRODUCT_NOT_FOUND,
    // Delete menu role
    MENU_ROLE_NOT_FOUND,

    // Orders
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

    // Products
    PRODUCT_ALREADY_EXISTS,
    PRODUCT_NOT_FOUND,
    PRODUCT_SHORT_NAME_ALREADY_EXISTS,
    // Add product date
    PRODUCT_DATE_ALREADY_EXISTS,
    // Add product ingredient
    PRODUCT_INGREDIENT_ALREADY_EXISTS,
    // Add product role
    PRODUCT_ROLE_ALREADY_EXISTS,
    // Add product variant
    PRODUCT_VARIANT_ALREADY_EXISTS,
    // Delete product date
    PRODUCT_DATE_NOT_FOUND,
    // Delete product ingredient
    PRODUCT_INGREDIENT_NOT_FOUND,
    // Delete product role
    PRODUCT_ROLE_NOT_FOUND,
    // Delete product variant
    PRODUCT_VARIANT_NOT_FOUND,

    // Roles
    ROLE_CANNOT_ORDER,
    ROLE_NOT_FOUND,
    // Create
    ROLE_ALREADY_EXISTS,

    // Subcategories
    SUBCATEGORY_NOT_FOUND,
    // Create
    SUBCATEGORY_ALREADY_EXISTS,

    // Users
    USER_NOT_FOUND,

    // Token
    INVALID_JWT_TOKEN,

    // Permission
    ADMIN_OPTION_REQUIRED,
    NOT_ALLOWED,
    NOT_AUTHENTICATED,

    // Validation
    DATE_RANGE_INVALID,
    DUPLICATE_DATE,
    ONLY_ONE_STATISTICS_CAN_BE_TRUE,
    PAPER_SIZE_REQUIRED_IF_CAN_ORDER,
    UNKNOWN_ORDER_BY_PARAMETER,

    // Default
    GENERIC_HTTP_EXCEPTION,
    INTERNAL_ERROR_SERVER,
    REQUEST_VALIDATION_ERROR,
}