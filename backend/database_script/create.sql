SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema LovEcommerce_v3
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `LovEcommerce_v3` ;

CREATE SCHEMA IF NOT EXISTS `LovEcommerce_v3` ;
USE `LovEcommerce_v3` ;

-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`account` (
	`account_id` INT NOT NULL AUTO_INCREMENT ,
	`user_name` VARCHAR(50) NOT NULL,
	`password` VARCHAR(100) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	`online` ENUM('on', 'off') NOT NULL DEFAULT 'off',
	`status` ENUM('verify', 'suspend') NOT NULL DEFAULT 'verify',
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`account_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`customer` (
	`customer_id` INT NOT NULL ,
	`customer_name` VARCHAR(100) NOT NULL,
	`gender` ENUM('male', 'female', 'other') NOT NULL,
	`phone` VARCHAR(20) NOT NULL,
	`avatar` TEXT NULL,
	`date_of_birth` DATE NULL,
	`nationality` VARCHAR(50) NULL,
	`address` TEXT NULL,
	`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`customer_id`),
	CONSTRAINT `fk_customer_account`
	FOREIGN KEY (`customer_id`)
	REFERENCES `LovEcommerce_v3`.`account` (`account_id`)
	ON DELETE CASCADE
	ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`feedback` (
  `account_id` INT NOT NULL,
  `rating` TINYINT NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`),
  CONSTRAINT `fk_feedback_account`
    FOREIGN KEY (`account_id`)
    REFERENCES `LovEcommerce_v3`.`account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`category` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(100) NOT NULL,
  `parent_id` INT NULL,
  `traits` TEXT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  CONSTRAINT `fk_category_parent`
    FOREIGN KEY (`parent_id`)
    REFERENCES `LovEcommerce_v3`.`category` (`category_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`shop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`shop` (
  `shop_id` INT NOT NULL AUTO_INCREMENT,
  `shop_name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `address` TEXT NOT NULL,
  `phone_no` VARCHAR(20) NOT NULL,
  `image` TEXT NULL,
  `rating` FLOAT NULL,
  `status` ENUM('pending', 'verify', 'suspend', 'banned') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `seller_id` INT NULL,
  PRIMARY KEY (`shop_id`),
  INDEX `fk_shop_seller_idx` (`seller_id` ASC),
  CONSTRAINT `fk_shop_seller`
    FOREIGN KEY (`seller_id`)
    REFERENCES `LovEcommerce_v3`.`account` (`account_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`product` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `traits` TEXT NULL,
  `stock` INT NOT NULL,
  `sale_off` DECIMAL(5,2) NULL DEFAULT 0.00,
  `price` DECIMAL(10,2) NOT NULL,
  `images` TEXT NULL,
  `status` ENUM('pending', 'sold-out') NOT NULL DEFAULT 'pending',
  `rating` FLOAT NULL,
  `category_id` INT NULL,
  `shop_id` INT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  INDEX `fk_product_category_idx` (`category_id` ASC),
  INDEX `fk_product_shop_idx` (`shop_id` ASC),
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `LovEcommerce_v3`.`category` (`category_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_shop`
    FOREIGN KEY (`shop_id`)
    REFERENCES `LovEcommerce_v3`.`shop` (`shop_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`wishlist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`wishlist` (
  `customer_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`, `product_id`),
  CONSTRAINT `fk_wishlist_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `LovEcommerce_v3`.`customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlist_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `LovEcommerce_v3`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`review`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`review` (
  `product_id` INT NOT NULL,
  `customer_id` INT NOT NULL,
  `rating` TINYINT NOT NULL,
  `comment` TEXT NULL,
  `liked` BOOLEAN DEFAULT FALSE,
  `images` TEXT NULL,
  `shop_reply` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`, `customer_id`),
  CONSTRAINT `fk_review_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `LovEcommerce_v3`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_review_customer`
    FOREIGN KEY (`customer_id`)
    REFERENCES `LovEcommerce_v3`.`customer` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`coupon`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`coupon` (
  `coupon_id` INT NOT NULL AUTO_INCREMENT,
  `coupon_name` VARCHAR(100) NOT NULL,
  `discount` DECIMAL(5,2) NOT NULL,
  `min_amount` DECIMAL(10,2) NOT NULL,
  `max_amount` DECIMAL(10,2) NOT NULL,
  `limit` INT DEFAULT NULL,
  `image` TEXT NULL,
  `start_day` DATE NOT NULL,
  `end_day` DATE NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`coupon_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- Table `LovEcommerce_v3`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`order` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `account_id` INT NOT NULL,
  `total_amount` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'delivery', 'shipping') NOT NULL DEFAULT 'pending',
  `address` TEXT NOT NULL,
  `payment` VARCHAR(100) NULL,
  `coupon_id` INT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  INDEX `fk_order_account_idx` (`account_id` ASC),
  INDEX `fk_order_coupon_idx` (`coupon_id` ASC),
  CONSTRAINT `fk_order_customer`
    FOREIGN KEY (`account_id`)
    REFERENCES `LovEcommerce_v3`.`account` (`account_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_coupon`
    FOREIGN KEY (`coupon_id`)
    REFERENCES `LovEcommerce_v3`.`coupon` (`coupon_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`delivery` (
  `delivery_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `cost` DECIMAL(10,2) NOT NULL,
  `category_id` INT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`delivery_id`),
  CONSTRAINT `fk_delivery_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `LovEcommerce_v3`.`category` (`category_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`voucher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`voucher` (
  `voucher_id` INT NOT NULL AUTO_INCREMENT,
  `voucher_name` VARCHAR(100) NOT NULL,
  `discount` DECIMAL(5,2) NOT NULL,
  `min_amount` DECIMAL(10,2) NOT NULL,
  `limit` INT DEFAULT NULL,
  `delivery_id` INT NOT NULL,
  `start_day` DATE NOT NULL,
  `end_day` DATE NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`voucher_id`),
  INDEX `fk_voucher_delivery_idx` (`delivery_id` ASC),
  CONSTRAINT `fk_voucher_delivery`
    FOREIGN KEY (`delivery_id`)
    REFERENCES `LovEcommerce_v3`.`delivery` (`delivery_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `LovEcommerce_v3`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `LovEcommerce_v3`.`item` (
  `item_id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `order_id` INT NOT NULL,
  `delivery_id` INT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `status` ENUM('pending', 'Approve', 'Prepare', 'Export') NOT NULL DEFAULT 'pending',
  `discount` DECIMAL(5,2) NULL,
  `payment` VARCHAR(100) NULL,
  `note` TEXT NULL,
  PRIMARY KEY (`item_id`),
  INDEX `fk_item_product_idx` (`product_id` ASC),
  INDEX `fk_item_order_idx` (`order_id` ASC),
  INDEX `fk_item_delivery_idx` (`delivery_id` ASC),
  CONSTRAINT `fk_item_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `LovEcommerce_v3`.`product` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_item_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `LovEcommerce_v3`.`order` (`order_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_item_delivery`
    FOREIGN KEY (`delivery_id`)
    REFERENCES `LovEcommerce_v3`.`delivery` (`delivery_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

