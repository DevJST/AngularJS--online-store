CREATE TABLE `ng_shop_db`.`orders` (
  `orderId` INT AUTO_INCREMENT,
  `userId` INT NOT NULL ,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `total` VARCHAR(255) NOT NULL,
  `status` TINYINT(1) NOT NULL,
  PRIMARY KEY (`orderId`)  
);

