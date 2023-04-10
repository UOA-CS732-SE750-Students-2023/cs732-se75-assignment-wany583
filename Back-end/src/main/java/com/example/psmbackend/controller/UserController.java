package com.example.psmbackend.controller;

import com.example.psmbackend.controller.request.CheckUserWithCredentialsRequest;
import com.example.psmbackend.controller.request.CheckUserWithToken;
import com.example.psmbackend.controller.response.UserResponse;
import com.example.psmbackend.controller.response.base.CommonResult;
import com.example.psmbackend.entity.User;
import com.example.psmbackend.enums.ResultCodeEnum;
import com.example.psmbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@Slf4j
@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService userService;


    // The api of login page
    @PostMapping("/login")
    public CommonResult<UserResponse> checkUserWithCredentials(@RequestBody CheckUserWithCredentialsRequest request){
        User userWithCredentials = userService.getUserWithCredentials(request.getEmail(), request.getPassword());

        if (Objects.isNull(userWithCredentials)){
            return CommonResult.fail(ResultCodeEnum.VERIFY_ERROR);
        }

        return CommonResult.success(UserResponse.builder().id(userWithCredentials.getId())
                        .email(userWithCredentials.getEmail())
                        .name(userWithCredentials.getName())
                        .token(userWithCredentials.getToken())
                .       build());
    }


}
