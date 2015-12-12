CREATE TABLE `ng_shop_db`.`users` (
  `userId` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`userId`)
 );

ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL DEFAULT 'pass' AFTER name;