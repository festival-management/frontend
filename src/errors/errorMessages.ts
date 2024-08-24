import { ErrorCodes } from './ErrorCodes';

const errorMessagesEn: { [key in number]: string } = {
    [ErrorCodes.SUCCESS]: "Operation was successful.",

    // Auth
    [ErrorCodes.INVALID_USERNAME_OR_PASSWORD]: "Invalid username or password.",
    [ErrorCodes.USERNAME_TOO_LONG]: "The username is too long.",
    [ErrorCodes.CANNOT_CREATE_ADMIN_USER]: "Cannot create admin user.",
    [ErrorCodes.USER_ALREADY_EXISTS]: "User already exists.",

    // Menus
    [ErrorCodes.MENU_ALREADY_EXISTS]: "Menu already exists.",
    [ErrorCodes.MENU_NOT_FOUND]: "Menu not found.",
    [ErrorCodes.MENU_SHORT_NAME_ALREADY_EXISTS]: "Menu short name already exists.",
    [ErrorCodes.MENU_DATE_ALREADY_EXISTS]: "Menu date already exists.",
    [ErrorCodes.MENU_FIELD_ALREADY_EXISTS]: "Menu field already exists.",
    [ErrorCodes.MENU_FIELD_PRODUCT_ALREADY_EXISTS]: "Menu field product already exists.",
    [ErrorCodes.MENU_ROLE_ALREADY_EXISTS]: "Menu role already exists.",
    [ErrorCodes.MENU_DATE_NOT_FOUND]: "Menu date not found.",
    [ErrorCodes.MENU_FIELD_NOT_FOUND]: "Menu field not found.",
    [ErrorCodes.MENU_FIELD_PRODUCT_NOT_FOUND]: "Menu field product not found.",
    [ErrorCodes.MENU_ROLE_NOT_FOUND]: "Menu role not found.",

    // Orders
    [ErrorCodes.INPUT_MENU_FIELD_PRODUCT_VARIANT]: "Input menu field product variant.",
    [ErrorCodes.INPUT_PRODUCT_VARIANT]: "Input product variant.",
    [ErrorCodes.MENU_DATE_NOT_VALID]: "Menu date is not valid.",
    [ErrorCodes.MENU_FIELD_NOT_EXIST]: "Menu field does not exist.",
    [ErrorCodes.MENU_FIELD_PRODUCT_INGREDIENT_NOT_EXIST]: "Menu field product ingredient does not exist.",
    [ErrorCodes.MENU_FIELD_PRODUCT_VARIANT_NOT_EXIST]: "Menu field product variant does not exist.",
    [ErrorCodes.MENU_FIELD_PRODUCT_NOT_EXIST]: "Menu field product does not exist.",
    [ErrorCodes.MENU_FIELD_TOO_MANY_PRODUCTS]: "Menu field has too many products.",
    [ErrorCodes.MENU_NOT_EXIST]: "Menu does not exist.",
    [ErrorCodes.MENU_ROLE_NOT_EXIST]: "Menu role does not exist.",
    [ErrorCodes.MISSING_MENU_FIELD_PRODUCTS]: "Missing menu field products.",
    [ErrorCodes.MISSING_OBLIGATORY_MENU_FIELDS]: "Missing obligatory menu fields.",
    [ErrorCodes.MISSING_PRODUCT_QUANTITY]: "Missing product quantity.",
    [ErrorCodes.NO_PRODUCTS_AND_MENUS]: "No products and menus.",
    [ErrorCodes.PRODUCT_DATE_NOT_VALID]: "Product date is not valid.",
    [ErrorCodes.PRODUCT_INGREDIENT_NOT_EXIST]: "Product ingredient does not exist.",
    [ErrorCodes.PRODUCT_NOT_EXIST]: "Product does not exist.",
    [ErrorCodes.PRODUCT_ROLE_NOT_EXIST]: "Product role does not exist.",
    [ErrorCodes.PRODUCT_VARIANT_NOT_EXIST]: "Product variant does not exist.",
    [ErrorCodes.SET_GUESTS_NUMBER]: "Set guests number.",

    // Products
    [ErrorCodes.PRODUCT_ALREADY_EXISTS]: "Product already exists.",
    [ErrorCodes.PRODUCT_NOT_FOUND]: "Product not found.",
    [ErrorCodes.PRODUCT_SHORT_NAME_ALREADY_EXISTS]: "Product short name already exists.",
    [ErrorCodes.PRODUCT_DATE_ALREADY_EXISTS]: "Product date already exists.",
    [ErrorCodes.PRODUCT_INGREDIENT_ALREADY_EXISTS]: "Product ingredient already exists.",
    [ErrorCodes.PRODUCT_ROLE_ALREADY_EXISTS]: "Product role already exists.",
    [ErrorCodes.PRODUCT_VARIANT_ALREADY_EXISTS]: "Product variant already exists.",
    [ErrorCodes.PRODUCT_DATE_NOT_FOUND]: "Product date not found.",
    [ErrorCodes.PRODUCT_INGREDIENT_NOT_FOUND]: "Product ingredient not found.",
    [ErrorCodes.PRODUCT_ROLE_NOT_FOUND]: "Product role not found.",
    [ErrorCodes.PRODUCT_VARIANT_NOT_FOUND]: "Product variant not found.",

    // Roles
    [ErrorCodes.ROLE_CANNOT_ORDER]: "Role cannot order.",
    [ErrorCodes.ROLE_NOT_FOUND]: "Role not found.",
    [ErrorCodes.ROLE_ALREADY_EXISTS]: "Role already exists.",

    // Subcategories
    [ErrorCodes.SUBCATEGORY_NOT_FOUND]: "Subcategory not found.",
    [ErrorCodes.SUBCATEGORY_ALREADY_EXISTS]: "Subcategory already exists.",

    // Users
    [ErrorCodes.USER_NOT_FOUND]: "User not found.",

    // Token
    [ErrorCodes.INVALID_JWT_TOKEN]: "Invalid JWT token.",

    // Permission
    [ErrorCodes.ADMIN_OPTION_REQUIRED]: "Admin option required.",
    [ErrorCodes.NOT_ALLOWED]: "Not allowed.",
    [ErrorCodes.NOT_AUTHENTICATED]: "Not authenticated.",

    // Validation
    [ErrorCodes.DATE_RANGE_INVALID]: "Date range is invalid.",
    [ErrorCodes.DUPLICATE_DATE]: "Duplicate date.",
    [ErrorCodes.ONLY_ONE_STATISTICS_CAN_BE_TRUE]: "Only one of `can_statistics` and `can_priority_statistics` can be true.",
    [ErrorCodes.PAPER_SIZE_REQUIRED_IF_CAN_ORDER]: "If `can_order` is `True` then `paper_size` is required.",
    [ErrorCodes.UNKNOWN_ORDER_BY_PARAMETER]: "Unknown order_by parameter.",

    // Default
    [ErrorCodes.GENERIC_HTTP_EXCEPTION]: "Generic HTTP exception.",
    [ErrorCodes.INTERNAL_ERROR_SERVER]: "Internal server error.",
    [ErrorCodes.REQUEST_VALIDATION_ERROR]: "Request validation error."
};

export default function getErrorMessage(errorCode: number, language: string = 'en'): string {
    switch (language) {
        case 'en':
        default:
            return errorMessagesEn[errorCode] || "Unknown error.";
    }
}