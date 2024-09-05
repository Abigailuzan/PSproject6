CREATE TABLE `fullstack6-db`.`category` (
  `category_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (1,'Action','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (2,'Animation','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (3,'Children','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (4,'Classics','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (5,'Comedy','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (6,'Documentary','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (7,'Drama','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (8,'Family','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (9,'Foreign','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (10,'Games','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (11,'Horror','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (12,'Music','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (13,'New','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (14,'Sci-Fi','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (15,'Sports','2006-02-15 04:46:27');
INSERT INTO `category` (`category_id`,`name`,`last_update`) VALUES (16,'Travel','2006-02-15 04:46:27');
