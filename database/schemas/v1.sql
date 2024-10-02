-- Inventory Items Table
CREATE TABLE item (
    id serial PRIMARY KEY ,
    description VARCHAR(255),
    unit_price DECIMAL(10, 2),
    quantity INT
    -- Additional attributes as needed
);

-- Transactions Table
CREATE TABLE transaction (
    id serial PRIMARY KEY,
    transaction_type VARCHAR(50),
    quantity INT,
    transaction_date DATE
    -- Additional attributes as needed`
);

-- Orders Table
CREATE TABLE order (
    id serial PRIMARY KEY,
    order_date DATE,
    customer_supplier VARCHAR(255),
    status VARCHAR(50)
    -- Additional attributes as needed
);

-- Inventory Items-Transactions Relationship Table (One-to-many)
CREATE TABLE item_transaction (
    item_id INT,
    transaction_id INT,
    PRIMARY KEY (item_id, transaction_id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);

-- Orders-Transactions Relationship Table (One-to-many)
CREATE TABLE order_transaction (
    order_id INT,
    transaction_id INT,
    PRIMARY KEY (order_id, transaction_id),
    FOREIGN KEY (order_id) REFERENCES order(id),
    FOREIGN KEY (transaction_id) REFERENCES transaction(id)
);