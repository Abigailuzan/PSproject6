CREATE TABLE `fullstack6-db`.`admin` (
  `staff_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address_id` SMALLINT UNSIGNED NOT NULL,
  `picture` BLOB NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `store_id` TINYINT UNSIGNED NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT '1',
  `username` VARCHAR(16) NOT NULL,
  `password` VARCHAR(40) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin' NULL DEFAULT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`staff_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
INSERT INTO `admin` (`staff_id`,`first_name`,`last_name`,`address_id`,`picture`,`email`,`store_id`,`active`,`username`,`password`,`last_update`) VALUES (1,'abigail','uzan',3,NULL,'a0583240144@gmail.com',1,1,'Mike','123456789','2006-02-15 03:57:16');
INSERT INTO `admin` (`staff_id`,`first_name`,`last_name`,`address_id`,`picture`,`email`,`store_id`,`active`,`username`,`password`,`last_update`) VALUES (2,'rivki','lehman',4,NULL,'lehman050@gmail.com',2,1,'Jon','987654321','2006-02-15 03:57:16');

