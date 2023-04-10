package com.example.psmbackend.controller.response.base;

import com.example.psmbackend.enums.ResultCodeEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResult<T> {
    private String code;
    private String message;
    private T result;


    /**
     *
     *
     * @param <T>
     * @return
     */
    public static <T> CommonResult<T> success() {
        return new CommonResult<T>(
                ResultCodeEnum.SUCCESS.getCode(), ResultCodeEnum.SUCCESS.getMessage(), null);
    }

    /**
     *
     *
     * @param result
     * @param <T>
     * @return
     */
    public static <T> CommonResult<T> success(T result) {
        return new CommonResult<T>(
                ResultCodeEnum.SUCCESS.getCode(), ResultCodeEnum.SUCCESS.getMessage(), result);
    }

    /**
     *
     *
     * @param result
     * @param <T>
     * @return
     * @Param message
     */
    public static <T> CommonResult<T> success(T result, String message) {
        return new CommonResult<T>(ResultCodeEnum.SUCCESS.getCode(), message, result);
    }

    /**
     *
     *
     * @param result
     * @param <T>
     * @return
     * @Param message
     */
    public static <T> CommonResult<T> success(T result, ResultCodeEnum resultCode) {
        return new CommonResult<T>(resultCode.getCode(), resultCode.getMessage(),result);
    }

    /**
     *
     *
     * @param resultCode
     */
    public static <T> CommonResult<T> fail(ResultCodeEnum resultCode) {
        return new CommonResult<T>(resultCode.getCode(), resultCode.getMessage(), null);
    }

    /**
     *
     *
     * @param resultCode
     * @param message
     */
    public static <T> CommonResult<T> fail(ResultCodeEnum resultCode, String message) {
        return new CommonResult<T>(resultCode.getCode(), message, null);
    }

    /**
     * @param resultCode
     * @param message
     */
    public static <T> CommonResult<T> fail(String resultCode, String message) {
        return new CommonResult<T>(resultCode, message, null);
    }


}