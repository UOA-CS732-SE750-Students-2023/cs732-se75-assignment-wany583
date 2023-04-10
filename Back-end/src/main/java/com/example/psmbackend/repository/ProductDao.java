package com.example.psmbackend.repository;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.psmbackend.entity.Product;
import org.apache.ibatis.annotations.Mapper;

/*
The dao layer to implement the interface between database and application.

This dao class is used to operate `product` table.
 */
@Mapper
public interface ProductDao extends BaseMapper<Product> {
}
