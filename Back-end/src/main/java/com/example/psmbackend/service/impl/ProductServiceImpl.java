package com.example.psmbackend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.psmbackend.entity.Product;
import com.example.psmbackend.entity.User;
import com.example.psmbackend.repository.ProductDao;
import com.example.psmbackend.repository.UserDao;
import com.example.psmbackend.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import net.sf.jsqlparser.util.validation.metadata.DatabaseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Use mybatis-plus to operate the database.
 */

@Service
@Slf4j
public class ProductServiceImpl extends ServiceImpl<ProductDao, Product> implements ProductService {


    @Autowired
    private ProductDao productDao;


    @Override
    public void creatNewProduct(Integer categoryId, String title, String description, Float price, String productImage, Integer isActive) {

        Product product = Product.builder().categoryId(categoryId)
                .title(title)
                .description(description)
                .price(price)
                .productImage(productImage)
                .isActive(isActive).build();
        try{
            productDao.insert(product);
        }catch (Exception e){
            log.error("Insert error");
            throw new DatabaseException(e);
        }
    }

    @Override
    public void editProduct(Integer id, Integer categoryId, String title, String description, Float price, String productImage, Integer isActive) {

        UpdateWrapper<Product> wrapper = new UpdateWrapper<>();
        wrapper.lambda().eq(Product::getId, id);
        Product product = Product.builder().categoryId(categoryId)
                .title(title)
                .description(description)
                .price(price)
                .productImage(productImage)
                .isActive(1).build();

        try{
            productDao.update(product, wrapper);
        }catch (Exception e){
            log.error("Update error");
            throw new DatabaseException(e);
        }
    }

    @Override
    public void editProductWithoutImage(Integer id, Integer categoryId, String title, String description, Float price, Integer isActive) {
        UpdateWrapper<Product> wrapper = new UpdateWrapper<>();
        wrapper.lambda().eq(Product::getId, id);
        Product product = Product.builder().categoryId(categoryId)
                .title(title)
                .description(description)
                .price(price)
                .isActive(1)
                .build();

        try{
            productDao.update(product, wrapper);
        }catch (Exception e){
            log.error("Update error");
            throw new DatabaseException(e);
        }

    }

    @Override
    public void deleteProductById(Integer id) {

        QueryWrapper<Product> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(Product::getId, id);

        try{
            productDao.delete(wrapper);
        }catch (Exception e){
            log.error("Delete error");
            throw new DatabaseException(e);
        }

    }

    @Override
    public List<Product> getProductList() {
        List<Product> productList;
        QueryWrapper<Product> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(Product::getIsActive, 1);

        try{
            productList = productDao.selectList(wrapper);
        }catch (Exception e){
            log.error("Get product list error");
            throw new DatabaseException(e);
        }
        return productList;
    }

    @Override
    public Product getProductById(Integer id) {
        Product product;
        QueryWrapper<Product> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(Product::getId, id);

        try{
            product = productDao.selectOne(wrapper);
        }catch (Exception e){
            log.error("Get product info error");
            throw new DatabaseException(e);
        }
        return product;
    }
}
