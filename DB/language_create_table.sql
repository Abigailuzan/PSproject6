CREATE TABLE `fullstack6-db`.`language` (
  `language_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` CHAR(20) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`language_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
INSERT INTO `language` (`language_id`,`name`,`last_update`) VALUES (1,'English','2006-02-15 05:02:19');
INSERT INTO `language` (`language_id`,`name`,`last_update`) VALUES (2,'Italian','2006-02-15 05:02:19');
INSERT INTO `language` (`language_id`,`name`,`last_update`) VALUES (3,'Japanese','2006-02-15 05:02:19');
INSERT INTO `language` (`language_id`,`name`,`last_update`) VALUES (4,'Mandarin','2006-02-15 05:02:19');
INSERT INTO `language` (`language_id`,`name`,`last_update`) VALUES (5,'French','2006-02-15 05:02:19');
INSERT INTO `language` (`language_id`,`name`,`last_update`) VALUES (6,'German','2006-02-15 05:02:19');
