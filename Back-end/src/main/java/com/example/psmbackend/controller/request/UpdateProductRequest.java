package com.example.psmbackend.controller.request;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateProductRequest {

    private Integer id;

    private Integer categoryId;

    private String title;

    private String description;

    private Float price;

    private String productImage;

    private Integer isActive;
}
