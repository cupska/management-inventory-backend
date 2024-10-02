CREATE   TABLE item (
    id serial PRIMARY KEY ,
    description VARCHAR(255),
    unit_price DECIMAL(10, 2),
    quantity INT
    -- Additional attributes as needed
);