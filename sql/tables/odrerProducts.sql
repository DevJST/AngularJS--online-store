CREATE TABLE `ng_shop_db`.`order_products` (
  `orderProductId` INT NULL AUTO_INCREMENT,
  `orderId` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `price` VARCHAR(255) NOT NULL,
  `weight` VARCHAR(255) NOT NULL,
  `quantity` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`orderProductId`),
  FOREIGN KEY (`orderId`) REFERENCES orders(`orderId`)
);