package com.example.psmbackend.enums;

import lombok.Getter;

/**
 * Use enum to normalise response format
 * {
 *     state_code: ***,
 *     message: ***
 * }
 */

@Getter
public enum ResultCodeEnum {

    // SUCCESS
    SUCCESS("00000", "Success"),
    QUERY_SUCCESS("00000", "Search successfully, but result is empty"),
    DELETE_SUCCESS("00000", "Delete successfully"),
    UPDATE_SUCCESS("00000", "Update successfully"),


    // ERROR
    VERIFY_ERROR("F0001", "Email or password is wrong!"),
    DATA_CREATE_ERROR("F0002", "Product creates fail."),
    DATA_UPDATE_ERROR("F0003", "Product updates fail."),
    DATA_DELETE_ERROR("F0002", "Product deletes fail."),
    DATA_RETRIEVE_ERROR("F0002", "Product retrieves fail."),

    UNKNOWN_DATABASE_ERROR("C001", "Unknown database error"),
    UNKNOWN_ERROR("C0002", "Unknown error");
    private String code;
    private String message;

    private ResultCodeEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
