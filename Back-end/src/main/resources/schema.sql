CREATE DATABASE IF NOT EXISTS product_management_system;

USE product_management_system;

drop table if exists product;
drop table if exists user;

CREATE TABLE `user` (
                         `id` int(5) NOT NULL AUTO_INCREMENT,
                         `name` varchar(64) NOT NULL ,
                         `email` varchar(64) NOT NULL,
                         `password` varchar(64) NOT NULL,
                         `token` varchar(128) NOT NULL,
                         PRIMARY KEY (`id`) USING BTREE
);

create table `product`(
                           `id` INT PRIMARY KEY AUTO_INCREMENT,
                           `category_id` int(20),
                           `title` varchar(128),
                           `description` varchar(128),
                           `price` float(2),
                           `product_image` varchar(128),
                           `is_active` int
);

INSERT INTO `user` VALUES
    (1, "admin", "admin@gmail.com", "123456", "dJTsQnKv_UZqF2LeY");

INSERT INTO `product`(`category_id`, `title`, `description`, `price`, `product_image`, `is_active`) values
  (1, 'MacBook Pro ', 'Laptop', 1999, 'https://s1.imagehub.cc/images/2023/04/07/6a62006aea416d10f95aa70acc88adc1.jpeg', 1),
  (1,'Ipad Air', 'Ipad', 1099,'https://s1.imagehub.cc/images/2023/04/07/0a77775d09fa5611134a56b75113fe1f.jpeg',1),
  (1,'PS5','Video Game', 899, 'https://s1.imagehub.cc/images/2023/04/07/35c893695b8691de1b4610f6b11b053a.webp',1),
  (1,'Iphone','Telephone', 1399, 'https://s1.imagehub.cc/images/2023/04/07/400c03e48eb8d99f36c658f4c7f5a68f.jpeg',1),
  (1,'Dyson','Hair Drier', 659, 'https://s1.imagehub.cc/images/2023/04/07/8877f6fd05f0d1e5a0794b6b107de24a.png',1);
