import { ErrorCodes } from './ErrorCodes';

const errorMessagesEn: { [key in ErrorCodes]: string } = {
    [ErrorCodes.INVALID_USERNAME_OR_PASSWORD]: "Invalid username or password.",
    [ErrorCodes.USERNAME_TOO_LONG]: "The username is too long.",
    [ErrorCodes.CANNOT_CREATE_ADMIN_USER]: "Cannot create admin user.",
    [ErrorCodes.ROLE_NOT_FOUND]: "Role not found.",
    [ErrorCodes.USER_ALREADY_EXISTS]: "User already exists.",
    [ErrorCodes.INPUT_MENU_FIELD_PRODUCT_VARIANT]: "Error in menu field product variant.",
    [ErrorCodes.INPUT_PRODUCT_VARIANT]: "Error in product variant field.",
    [ErrorCodes.MENU_DATE_NOT_VALID]: "Menu date is not valid.",
    [ErrorCodes.MENU_FIELD_NOT_EXIST]: "Menu field does not exist.",
    [ErrorCodes.MENU_FIELD_PRODUCT_INGREDIENT_NOT_EXIST]: "Product ingredient in menu field does not exist.",
    [ErrorCodes.MENU_FIELD_PRODUCT_VARIANT_NOT_EXIST]: "Product variant in menu field does not exist.",
    [ErrorCodes.MENU_FIELD_PRODUCT_NOT_EXIST]: "Product in menu field does not exist.",
    [ErrorCodes.MENU_FIELD_TOO_MANY_PRODUCTS]: "Too many products in menu field.",
    [ErrorCodes.MENU_NOT_EXIST]: "Menu does not exist.",
    [ErrorCodes.MENU_ROLE_NOT_EXIST]: "Menu role does not exist.",
    [ErrorCodes.MISSING_MENU_FIELD_PRODUCTS]: "Missing products in menu field.",
    [ErrorCodes.MISSING_OBLIGATORY_MENU_FIELDS]: "Missing obligatory menu fields.",
    [ErrorCodes.MISSING_PRODUCT_QUANTITY]: "Missing product quantity.",
    [ErrorCodes.NO_PRODUCTS_AND_MENUS]: "No products and menus available.",
    [ErrorCodes.PRODUCT_DATE_NOT_VALID]: "Product date is not valid.",
    [ErrorCodes.PRODUCT_INGREDIENT_NOT_EXIST]: "Product ingredient does not exist.",
    [ErrorCodes.PRODUCT_NOT_EXIST]: "Product does not exist.",
    [ErrorCodes.PRODUCT_ROLE_NOT_EXIST]: "Product role does not exist.",
    [ErrorCodes.PRODUCT_VARIANT_NOT_EXIST]: "Product variant does not exist.",
    [ErrorCodes.SET_GUESTS_NUMBER]: "Set the number of guests.",
    [ErrorCodes.INVALID_JWT_TOKEN]: "Invalid JWT token.",
    [ErrorCodes.NOT_ALLOWED]: "Action not allowed.",
    [ErrorCodes.NOT_AUTHENTICATED]: "Not authenticated.",
    [ErrorCodes.GENERIC_HTTP_EXCEPTION]: "Generic HTTP exception.",
    [ErrorCodes.INTERNAL_ERROR_SERVER]: "Internal server error.",
    [ErrorCodes.REQUEST_VALIDATION_ERROR]: "Request validation error.",
};

export default function getErrorMessage(errorCode: ErrorCodes, language: string = 'en'): string {
    switch (language) {
        case 'en':
        default:
            return errorMessagesEn[errorCode] || "Unknown error.";
    }
}