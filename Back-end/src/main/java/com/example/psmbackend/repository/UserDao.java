package com.example.psmbackend.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.psmbackend.entity.User;
import org.apache.ibatis.annotations.Mapper;

/*
The dao layer to implement the interface between database and application.

This dao class is used to operate `user` table.
 */
@Mapper
public interface UserDao extends BaseMapper<User> {
}
