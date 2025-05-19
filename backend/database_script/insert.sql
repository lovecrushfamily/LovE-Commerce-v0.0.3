USE `LovEcommerce_v3` ;

INSERT INTO `LovEcommerce_v3`.`account` (
  account_id, user_name, password_, email, online_, status, created_at, updated_at
) VALUES
  (1, 'user_1', 'pass_1', 'user1@email.com', 'off', 'suspend', NOW(), NOW()),
  (2, 'user_2', 'pass_2', 'user2@email.com', 'on', 'verify', NOW(), NOW()),
  (3, 'user_3', 'pass_3', 'user3@email.com', 'off', 'verify', NOW(), NOW()),
  (4, 'user_4', 'pass_4', 'user4@email.com', 'on', 'suspend', NOW(), NOW()),
  (5, 'user_5', 'pass_5', 'user5@email.com', 'off', 'verify', NOW(), NOW()),
  (6, 'user_6', 'pass_6', 'user6@email.com', 'on', 'verify', NOW(), NOW()),
  (7, 'user_7', 'pass_7', 'user7@email.com', 'off', 'suspend', NOW(), NOW()),
  (8, 'user_8', 'pass_8', 'user8@email.com', 'on', 'verify', NOW(), NOW()),
  (9, 'user_9', 'pass_9', 'user9@email.com', 'off', 'verify', NOW(), NOW()),
  (10, 'user_10', 'pass_10', 'user10@email.com', 'on', 'verify', NOW(), NOW());



INSERT INTO `LovEcommerce_v3`.`customer` (
  customer_id, customer_name, gender, phone, avatar, date_of_birth, nationality, address, created_at, updated_at
) VALUES
  (1, 'Customer_1', 'female', '0901234561', 'avatar_1.jpg', '1990-01-01', 'USA', '101 First St', NOW(), NOW()),
  (2, 'Customer_2', 'male', '0901234562', 'avatar_2.jpg', '1991-02-01', 'Canada', '102 First St', NOW(), NOW()),
  (3, 'Customer_3', 'female', '0901234563', 'avatar_3.jpg', '1992-03-01', 'UK', '103 First St', NOW(), NOW()),
  (4, 'Customer_4', 'male', '0901234564', 'avatar_4.jpg', '1993-04-01', 'Germany', '104 First St', NOW(), NOW()),
  (5, 'Customer_5', 'female', '0901234565', 'avatar_5.jpg', '1994-05-01', 'France', '105 First St', NOW(), NOW()),
  (6, 'Customer_6', 'male', '0901234566', 'avatar_6.jpg', '1995-06-01', 'Japan', '106 First St', NOW(), NOW()),
  (7, 'Customer_7', 'female', '0901234567', 'avatar_7.jpg', '1996-07-01', 'Vietnam', '107 First St', NOW(), NOW()),
  (8, 'Customer_8', 'male', '0901234568', 'avatar_8.jpg', '1997-08-01', 'China', '108 First St', NOW(), NOW()),
  (9, 'Customer_9', 'female', '0901234569', 'avatar_9.jpg', '1998-09-01', 'India', '109 First St', NOW(), NOW()),
  (10, 'Customer_10', 'male', '0901234570', 'avatar_10.jpg', '1999-10-01', 'Brazil', '110 First St', NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`category` (
  category_id, category_name, parent_id, traits, description_, created_at, updated_at
) VALUES
  (1, 'Electronics', NULL, 'Tech, Devices', 'All electronic gadgets', NOW(), NOW()),
  (2, 'Smartphones', 1, 'Phones, Android', 'All kinds of smartphones', NOW(), NOW()),
  (3, 'Laptops', 1, 'Computers, Portable', 'Modern laptops', NOW(), NOW()),
  (4, 'Home Appliances', NULL, 'Kitchen, Living', 'Appliances for home', NOW(), NOW()),
  (5, 'Furniture', NULL, 'Wood, Metal', 'Tables and chairs', NOW(), NOW()),
  (6, 'Books', NULL, 'Paper, Literature', 'Novels and textbooks', NOW(), NOW()),
  (7, 'Fashion', NULL, 'Clothes, Shoes', 'Wearable items', NOW(), NOW()),
  (8, 'Gaming', 1, 'Consoles, Accessories', 'Gaming items and gear', NOW(), NOW()),
  (9, 'Cameras', 1, 'DSLR, Mirrorless', 'Photography gear', NOW(), NOW()),
  (10, 'Health', NULL, 'Fitness, Medical', 'Healthcare products', NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`coupon` (
  coupon_id, coupon_name, discount, min_amount, max_amount, limit_, image, start_day, end_day, created_at, updated_at
) VALUES
  (1, 'NewUser10', 10.00, 50.00, 200.00, 100, 'coupon1.jpg', '2025-01-01', '2025-12-31', NOW(), NOW()),
  (2, 'SuperSave', 15.00, 75.00, 250.00, 50, 'coupon2.jpg', '2025-01-01', '2025-12-31', NOW(), NOW()),
  (3, 'MegaDiscount', 20.00, 100.00, 300.00, 25, 'coupon3.jpg', '2025-01-01', '2025-12-31', NOW(), NOW()),
  (4, 'SpringSale', 8.00, 40.00, 150.00, 80, 'coupon4.jpg', '2025-01-01', '2025-12-31', NOW(), NOW()),
  (5, 'FlashDeal', 12.00, 60.00, 180.00, 70, 'coupon5.jpg', '2025-01-01', '2025-12-31', NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`shop` (
  shop_id, shop_name, description_, address, phone_no, image_, rating, status, created_at, updated_at, seller_id
) VALUES
  (1, 'TechieStore', 'All about gadgets', 'City Center 1', '0901111111', 'shop1.jpg', 4.5, 'pending', NOW(), NOW(), 1),
  (2, 'FashionWave', 'Latest in fashion', 'Mall Ave 2', '0902222222', 'shop2.jpg', 4.0, 'pending', NOW(), NOW(), 2),
  (3, 'BookBunker', 'Books & Novels', 'Reading Ln', '0903333333', 'shop3.jpg', 3.8, 'pending', NOW(), NOW(), 3),
  (4, 'FurnitureFix', 'Tables and sofas', 'Home St 4', '0904444444', 'shop4.jpg', 4.2, 'pending', NOW(), NOW(), 4),
  (5, 'HealthPlus', 'Fitness and meds', 'Clinic Rd', '0905555555', 'shop5.jpg', 4.6, 'pending', NOW(), NOW(), 5);


INSERT INTO `LovEcommerce_v3`.`product` (
  product_id, product_name, description_, traits, stock, sale_off, price, images, status, rating, category_id, shop_id, created_at, updated_at
) VALUES
  (1, 'Smartphone X', 'Latest model with AI chip', 'black, 128GB', 50, 10.00, 699.99, 'img1.jpg,img2.jpg', 'pending', 4.5, 2, 1, NOW(), NOW()),
  (2, 'Laptop Pro 15', 'Lightweight & powerful', 'silver, 16GB RAM', 30, 5.00, 1299.99, 'img3.jpg,img4.jpg', 'pending', 4.7, 3, 1, NOW(), NOW()),
  (3, 'Gaming Console Z', 'Next-gen gaming', '4K, HDR', 20, 15.00, 499.99, 'img5.jpg', 'pending', 4.8, 8, 1, NOW(), NOW()),
  (4, 'Wooden Chair', 'Modern design chair', 'oak wood', 100, 0.00, 89.99, 'img6.jpg', 'pending', 4.1, 5, 4, NOW(), NOW()),
  (5, 'Electric Oven', 'Fast & efficient', '1200W', 40, 8.00, 159.99, 'img7.jpg', 'pending', 4.0, 4, 4, NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`order` (
  order_id, customer_id, total_amount, status, address, payment, coupon_id, created_at, updated_at
) VALUES
  (1, 1, 759.99, 'pending', '123 Main Street', 'credit card', 1, NOW(), NOW()),
  (2, 2, 1399.99, 'shipping', '456 Maple Ave', 'paypal', 2, NOW(), NOW()),
  (3, 3, 529.99, 'delivery', '789 Oak Lane', 'cash on delivery', NULL, NOW(), NOW()),
  (4, 4, 89.99, 'pending', '321 Elm St', 'debit card', NULL, NOW(), NOW()),
  (5, 5, 169.99, 'pending', '654 Pine Rd', 'paypal', 3, NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`item` (
  item_id, product_id, order_id, delivery_id, quantity, price, status, discount, payment, note
) VALUES
  (1, 1, 1, 1, 1, 699.99, 'Approve', 10.00, 'credit card', 'Handle with care'),
  (2, 2, 2, 2, 1, 1299.99, 'Prepare', 5.00, 'paypal', NULL),
  (3, 3, 3, 3, 1, 499.99, 'Export', 15.00, 'cash on delivery', 'Fragile item'),
  (4, 4, 4, 4, 2, 89.99, 'Approve', 0.00, 'debit card', NULL),
  (5, 5, 5, 5, 1, 159.99, 'pending', 8.00, 'paypal', NULL);


INSERT INTO `LovEcommerce_v3`.`wishlist` (
  customer_id, product_id, quantity, created_at, updated_at
) VALUES
  (1, 1, 1, NOW(), NOW()),
  (1, 3, 2, NOW(), NOW()),
  (2, 2, 1, NOW(), NOW()),
  (3, 4, 3, NOW(), NOW()),
  (4, 5, 1, NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`review` (
  product_id, customer_id, rating, comment, liked, images, shop_reply, created_at, updated_at
) VALUES
  (1, 1, 5, 'Awesome phone!', TRUE, 'review1.jpg', 'Thank you!', NOW(), NOW()),
  (2, 2, 4, 'Solid performance.', TRUE, NULL, 'Glad you like it!', NOW(), NOW()),
  (3, 3, 5, 'Gaming beast!', TRUE, 'review3.jpg', 'Enjoy your games!', NOW(), NOW()),
  (4, 4, 3, 'Looks good, but not comfy.', FALSE, NULL, NULL, NOW(), NOW()),
  (5, 5, 4, 'Oven works fine.', TRUE, NULL, 'Thank you!', NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`feedback` (
  account_id, rating, content, created_at
) VALUES
  (1, 5, 'Great platform!', NOW()),
  (2, 4, 'Nice features but UI could improve.', NOW()),
  (3, 3, 'Average experience.', NOW()),
  (4, 5, 'Perfect for my shop!', NOW()),
  (5, 4, 'Fast support.', NOW());


INSERT INTO `LovEcommerce_v3`.`delivery` (
  delivery_id, name, cost, category_id, description, created_at, updated_at
) VALUES
  (1, 'FastExpress', 15.00, 2, 'Fast shipping nationwide', NOW(), NOW()),
  (2, 'EcoDelivery', 5.00, 5, 'Affordable green delivery', NOW(), NOW()),
  (3, 'SafeShip', 10.00, 1, 'Secure and insured', NOW(), NOW()),
  (4, 'NextDay', 12.00, 3, 'Next day delivery', NOW(), NOW()),
  (5, 'StandardPost', 3.00, 4, 'Basic postal service', NOW(), NOW());


INSERT INTO `LovEcommerce_v3`.`voucher` (
  voucher_id, voucher_name, discount, min_amount, limit_, delivery_id, start_day, end_day, created_at, updated_at
) VALUES
  (1, 'ShipFree', 100.00, 50.00, 100, 1, '2025-01-01', '2025-12-31', NOW(), NOW()),
  (2, 'SaverShip', 5.00, 20.00, 200, 2, '2025-01-01', '2025-12-31', NOW(), NOW()),
  (3, 'GoldDelivery', 10.00, 70.00, 150, 3, '2025-01-01', '2025-12-31', NOW(), NOW()),
  (4, 'BudgetBox', 3.00, 30.00, 250, 5, '2025-01-01', '2025-12-31', NOW(), NOW()),
  (5, 'ExpressBonus', 7.00, 60.00, 80, 4, '2025-01-01', '2025-12-31', NOW(), NOW());
