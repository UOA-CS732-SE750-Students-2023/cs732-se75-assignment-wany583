package com.example.psmbackend.controller;

import com.example.psmbackend.controller.request.CreatNewProductRequest;
import com.example.psmbackend.controller.request.DeleteProductRequest;
import com.example.psmbackend.controller.request.GetProductByIdRequest;
import com.example.psmbackend.controller.request.UpdateProductRequest;
import com.example.psmbackend.controller.response.base.CommonResult;
import com.example.psmbackend.entity.Product;
import com.example.psmbackend.entity.User;
import com.example.psmbackend.enums.ResultCodeEnum;
import com.example.psmbackend.service.ProductService;
import com.example.psmbackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Objects;


/**
 * The Controller layer serves as the web layer of the application,
 * responsible for handling client requests and returning responses.
 *
 * Receiving HTTP requests, such as GET, POST, PUT, DELETE, etc.
 * Processing business logic
 * Handling request parameters and form data. Controller layer parses the data into Java objects and passes them on to the Service layer for processing.
 *
 *
 */
@Slf4j
@RestController
@RequestMapping(value = "/product")
public class ProductController {

    // Autowire service layer
    @Autowired
    ProductService productService;

    @Autowired
    UserService userService;


    // Create new product information into database
    @PostMapping("/add")
    public CommonResult createNewProduct(@RequestBody CreatNewProductRequest request){

        productService.creatNewProduct(request.getCategoryId(), request.getTitle(),
                request.getDescription(), request.getPrice(), request.getProductImage(), request.getIsActive());

        return CommonResult.success(ResultCodeEnum.SUCCESS);
    }


    // Update product information into database
    // Image url allows to be null.
    @PostMapping("/update")
    public CommonResult updateProduct(@RequestBody UpdateProductRequest request){


        if(Objects.isNull(request.getProductImage())){
            productService.editProductWithoutImage(request.getId(), request.getCategoryId(), request.getTitle(),
                    request.getDescription(), request.getPrice(), request.getIsActive());

        }else {
            productService.editProduct(request.getId(), request.getCategoryId(), request.getTitle(),
                    request.getDescription(), request.getPrice(), request.getProductImage(), request.getIsActive());

        }

        return CommonResult.success(ResultCodeEnum.UPDATE_SUCCESS);
    }

    // Delete product information from database
    // Before that, it needs to check token.
    @PostMapping("/delete")
    public CommonResult deleteProduct(@RequestBody DeleteProductRequest request){

        User userWithToken = userService.getUserWithToken(request.getToken());

        if (userWithToken.getToken().equals(request.getToken())){
            productService.deleteProductById(request.getId());
            return CommonResult.success(ResultCodeEnum.DELETE_SUCCESS);
        }else {
            return CommonResult.fail(ResultCodeEnum.DATA_DELETE_ERROR);
        }

    }


    // Show the product list
    @GetMapping("/list")
    public CommonResult getProductList(){

        List<Product> productList = productService.getProductList();

        if (productList.size() == 0){
            return CommonResult.success(ResultCodeEnum.QUERY_SUCCESS);
        }
        return CommonResult.success(productList);
    }

    // Get certain product information
    @PostMapping("/get")
    public CommonResult getProductById(@RequestBody GetProductByIdRequest request){

        return CommonResult.success(productService.getProductById(request.getId()));
    }






}
