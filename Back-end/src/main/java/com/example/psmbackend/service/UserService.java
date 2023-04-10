package com.example.psmbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.psmbackend.entity.User;

/*
the Service layer is a core component that implements the business logic of the application.
It acts as the controller component in the MVC (Model-View-Controller) architecture,
which accesses the database through the DAO (Data Access Object) layer and processes data based on business logic.

This interface provides the operation of `product` table.
 */
public interface UserService extends IService<User> {

    User getUserWithCredentials(String email, String password);

    User getUserWithToken(String token);
}
