package com.example.psmbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.psmbackend.entity.User;
import com.example.psmbackend.repository.UserDao;
import com.example.psmbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import net.sf.jsqlparser.util.validation.metadata.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {


    @Autowired
    private UserDao userDao;

    @Override
    public User getUserWithCredentials(String email, String password){

        User user;
        QueryWrapper<User> wrapper = new QueryWrapper<>();

        wrapper.lambda().eq(User::getEmail, email)
                .eq(User::getPassword, password);

        try {
            user = userDao.selectOne(wrapper);
        } catch (Exception e) {
            log.error("Login error ", e);
            throw new DatabaseException(e);
        }
        return user;

    }


    @Override
    public User getUserWithToken(String token) {
        User user;
        QueryWrapper<User> wrapper = new QueryWrapper<>();

        wrapper.lambda().eq(User::getToken, token);

        try {
            user = userDao.selectOne(wrapper);
        } catch (Exception e) {
            log.error("Login error ", e);
            throw new DatabaseException(e);
        }
        return user;
    }
}
