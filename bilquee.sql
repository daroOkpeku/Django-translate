CREATE TABLE customer_menuitem (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2),
    category_id INT
);

CREATE TABLE customer_category (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE customer_ordermodel (
    id INT PRIMARY KEY,
    created_on DATETIME,
    price DECIMAL(10, 2),
    name VARCHAR(255),
    email VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code INT,
    is_paid BOOLEAN,
    is_shipped BOOLEAN
);

CREATE TABLE customer_ordermodel_items (
    ordermodel_id INT,
    menuitem_id INT
);

CREATE TABLE admin_logentry (
    id INT PRIMARY KEY,
    action_time DATETIME,
    user_id INT,
    content_type INT,
    object_id INT,
    object_repr VARCHAR(255),
    action_flag INT,
    change_message TEXT
);


-- Insert into customer_menuitem
INSERT INTO customer_menuitem (id, name, description, image, price, category_id) VALUES
(1, 'Toast and Egg', '3 slices of bread with scrambled vegetable eggs', 'https://ik.imagekit.io/len9hqqjtd/menu_images/bread_and_egg.jpeg?updatedAt=1725730955060', 500.00, 1),
(2, 'Rice and Chicken', 'A plate of rice with fried chicken and plantain.', 'https://ik.imagekit.io/len9hqqjtd/menu_images/rice_and_chicken.jpeg?updatedAt=1725730954892', 800.00, 2),
(3, 'Pounded Yam', 'Pounded Yam and Egusi soup', 'https://ik.imagekit.io/len9hqqjtd/menu_images/pounded_yam.jpeg?updatedAt=1725730955363', 900.00, 3),
(4, 'Water', 'Water', 'https://ik.imagekit.io/len9hqqjtd/menu_images/water.jpeg?updatedAt=1725730954478', 100.00, 4),
(5, 'Juice', 'orange juice', 'https://ik.imagekit.io/len9hqqjtd/menu_images/juice.jpeg?updatedAt=1725730955762', 180.00, 4);

-- Insert into customer_category
INSERT INTO customer_category (id, name) VALUES
(1, 'Breakfast'),
(2, 'Lunch'),
(3, 'Dinner'),
(4, 'Drinks');

-- Insert into customer_ordermodel
INSERT INTO customer_ordermodel (id, created_on, price, name, email, street, city, state, zip_code, is_paid, is_shipped) VALUES
(1, '2024-09-06 03:59:52', 280.00, 'test1', '123@gmail.com', 'somewhwere', 'Asokoro', 'F.C.T', 900001, true, false),
(2, '2024-09-06 04:01:03', 150.00, 'test 2', '321@gmail.com', 'alongxyz', 'Maitama', 'F.C.T', 900001, false, false),
(3, '2024-09-06 06:47:54', 500.00, 'test 3', '1234@gmail.com', '123', 'Gwarimpa', 'Kogi', 900001, true, false),
(4, '2024-09-06 12:24:45', 1800.00, 'Bil', 'bil@gmail.com', '1234', 'Aj', 'F.C.T', 900001, false, false),
(5, '2024-09-06 12:27:26', 380.00, 'Bil', 'bil@gmail.com', '123', 'Asokoro', 'Abuja', 90001, false, false),
(6, '2024-09-06 12:27:26', 560.00, 'Bil', 'bil@gmail.com', '123', 'Asokoro', 'Abuja', 90001, false, false),
(7, '2024-09-06 12:32:27', 1800.00, 'bil', 'bil@gmail.com', '1234@', 'asokoro', 'F.C.T', 900001, false, false),
(8, '2024-09-06 12:32:27', 2600.00, 'bil', 'bil@gmail.com', '1234@', 'asokoro', 'F.C.T', 900001, false, false),
(9, '2024-09-06 23:40:31', 180.00, 'Bilqees', '123@gmail.com', '123', 'city', 'state', 900001, true, false),
(10, '2024-09-06 23:41:49', 1800.00, 'Bil', '123@gmail.com', '123', 'Asokoro', 'f.c.t', 900001, false, false),
(11, '2024-09-06 23:41:49', 2600.00, 'Bil', '123@gmail.com', '123', 'Asokoro', 'f.c.t', 900001, false, false),
(12, '2024-09-06 23:46:17', 1180.00, 'Bilqees', 'bil@gmail.com', '1234', 'Asokoro', 'f.c.t', 900001, false, false),
(13, '2024-09-06 23:46:17', 1360.00, 'Bilqees', 'bil@gmail.com', '1234', 'Asokoro', 'f.c.t', 900001, false, false),
(14, '2024-09-07 00:07:15', 1100.00, 'Bil', 'bil@gmail.com', '1234', 'Asokoro', 'f.c.t', 90001, false, false),
(15, '2024-09-07 00:07:16', 1200.00, 'Bil', 'bil@gmail.com', '1234', 'Asokoro', 'f.c.t', 90001, false, false);

-- Insert into customer_ordermodel_items (many-to-many relationship)
INSERT INTO customer_ordermodel_items (ordermodel_id, menuitem_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 5),
(3, 1),
(3, 5),
(5, 4),
(5, 5),
(6, 4),
(6, 5),
(7, 1),
(7, 2),
(8, 1),
(8, 2),
(9, 1),
(9, 4),
(10, 1),
(10, 2),
(11, 1),
(11, 2),
(12, 1),
(12, 5),
(13, 1),
(13, 5),
(14, 1),
(14, 4),
(15, 1),
(15, 4);

-- Insert into admin_logentry
INSERT INTO admin_logentry (id, action_time, user_id, content_type, object_id, object_repr, action_flag, change_message) VALUES
(1, '2024-09-04 21:29:36', 1, 8, 1, 'Breakfast', 1, '[{\"added\": {}}]'),
(2, '2024-09-04 21:29:44', 1, 8, 2, 'Lunch', 1, '[{\"added\": {}}]'),
(3, '2024-09-04 21:29:55', 1, 8, 3, 'Dinner', 1, '[{\"added\": {}}]'),
(4, '2024-09-04 21:30:03', 1, 8, 4, 'Drinks', 1, '[{\"added\": {}}]'),
(5, '2024-09-04 21:42:04', 1, 9, 1, 'Toast and Egg', 1, '[{\"added\": {}}]'),
(6, '2024-09-04 21:53:51', 1, 9, 2, 'Rice and Chicken', 1, '[{\"added\": {}}]'),
(7, '2024-09-04 21:55:59', 1, 9, 3, 'Pounded Yam', 1, '[{\"added\": {}}]'),
(8, '2024-09-04 21:59:36', 1, 9, 4, 'Water', 1, '[{\"added\": {}}]'),
(9, '2024-09-04 22:00:11', 1, 9, 5, 'Juice', 1, '[{\"added\": {}}]'),
(10, '2024-09-05 01:17:05', 1, 9, 5, 'Juice', 2, '[]'),
(11, '2024-09-06 03:19:06', 1, 3, 1, 'Staff', 1, '[{\"added\": {}}]'),
(12, '2024-09-06 03:25:30', 1, 4, 1, 'admin', 2, '[{\"changed\": {\"password\": [\"*****\"]}}]'),
(13, '2024-09-06 03:28:36', 1, 9, 2, 'Rice and Chicken', 2, '[]'),
(14, '2024-09-06 03:29:04', 1, 9, 2, 'Rice and Chicken', 1, '[{\"added\": {}}]'),
(15, '2024-09-06 03:39:17', 1, 9, 1, 'Toast and Egg', 2, '[]');
