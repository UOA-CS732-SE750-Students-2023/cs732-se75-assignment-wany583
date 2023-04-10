package com.example.psmbackend.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.psmbackend.entity.Product;

import java.util.List;

/*
the Service layer is a core component that implements the business logic of the application.
It acts as the controller component in the MVC (Model-View-Controller) architecture,
which accesses the database through the DAO (Data Access Object) layer and processes data based on business logic.

This interface provides the operation of `product` table.
 */

public interface ProductService extends IService<Product> {

    public void creatNewProduct(Integer categoryId, String title, String description,
                                Float price, String productImage, Integer isActive);

    public void editProduct(Integer id, Integer categoryId, String title, String description,
                            Float price, String productImage, Integer isActive);


    public void editProductWithoutImage(Integer id, Integer categoryId, String title, String description,
                                        Float price, Integer isActive);

    public void deleteProductById(Integer id);

    public List<Product> getProductList();

    public Product getProductById(Integer id);
}
