CREATE TABLE `ng_shop_db`.`products` (
  `productId` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `weight` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`productId`)  
 );
