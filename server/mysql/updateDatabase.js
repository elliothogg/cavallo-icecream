const connection = require('./database');

//   Add data to database
connection.query("use main;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Using Main Database.')
    console.log('----------------')
});

// connection.query("drop table if exists `EachOrdersProducts`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `Delivery`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `Collection`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `CustomersOrders`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `Customer`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `Product`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `RestaurantInfo`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });
// connection.query("drop table if exists `CompanyUser`;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE Customer ("+
//         "CustomerEmail varchar(100) NOT NULL,"+
//         "CustomerFirstName varchar(100) NOT NULL,"+
//         "CustomerLastName varchar(100) NOT NULL,"+
//         "CustomerAddress varchar(100) NOT NULL,"+
//         "CustomerPostCode varchar(100) NOT NULL,"+
//         "CustomerTelephone varchar(100) NOT NULL,"+
//         "PRIMARY KEY (CustomerEmail)"+
//     "); ", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create Customer Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE CompanyUser ("+
//         "Username varchar(50) NOT NULL,"+
//         "Password varchar(100) NOT NULL"+
//     ");", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create CompanyUser Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE RestaurantInfo ("+
//         "ID varchar(20) NOT NULL,"+
//         "RestaurantName varchar(100) NOT NULL,"+
//         "Address varchar(100) NOT NULL,"+
//         "PostCode varchar(10) NOT NULL,"+
//         "Email varchar(100) NOT NULL,"+
//         "Telephone varchar(100) NOT NULL,"+
//         "WeekdayOpeningTime TIME NOT NULL,"+
//         "WeekdayClosingTime TIME NOT NULL,"+
//         "WeekendOpeningTime TIME NOT NULL,"+
//         "WeekendClosingTime TIME NOT NULL,"+
//         "Slogan varchar(50),"+
//         "PRIMARY KEY (ID)"+
//     ");", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create RestaurantInfo Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE Product ("+
//         "ProductID varchar(20) NOT NULL,"+
//         "Description varchar(40) NOT NULL, "+
//         "Size varchar(30) NOT NULL,"+
//         "TotalCost float(10) NOT NULL,"+
//         "PRIMARY KEY (ProductID)"+
//     ");", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create Product Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE CustomersOrders ("+
//         "OrderID varchar(20) NOT NULL,"+
//         "CustomerEmail varchar(20) NOT NULL,"+
//         "OrderDate DATETIME NOT NULL,"+
//         "BillingAddress varchar(50) NOT NULL,"+
//         "BillingPostcode varchar(50) NOT NULL,"+
//         "TotalCost float NOT NULL,"+
//         "Status varchar(30) DEFAULT NULL,"+
//         "PRIMARY KEY (OrderID),"+
//         "FOREIGN KEY (CustomerEmail) REFERENCES Customer(CustomerEmail)"+
//     "); ", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create CustomersOrders Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE EachOrdersProducts ("+
//         "OrderID varchar(20) NOT NULL,"+
//         "ProductID varchar(20) NOT NULL,"+
//         "Quantity varchar(20) NOT NULL,"+
//         "FOREIGN KEY (OrderID) REFERENCES CustomersOrders(OrderID),"+
//         "FOREIGN KEY (ProductID) REFERENCES Product(ProductID)"+
//     ");", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create EachOrdersProducts Finish.')
//     console.log('----------------')
// });


// connection.query(
//     "CREATE TABLE Delivery ("+
//         "OrderID varchar(20) NOT NULL,"+
//         "DeliveryTime DATETIME NOT NULL,"+
//         "DeliveryAddress varchar(50) NOT NULL,"+
//         "DeliveryPostcode varchar(50) NOT NULL,"+
//         "FOREIGN KEY (OrderID) REFERENCES CustomersOrders(OrderID)"+
//     "); ", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create Delivery Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE Collection ("+
//         "OrderID varchar(20) NOT NULL,"+
//         "CollectionTime DATETIME NOT NULL,"+
//         "FOREIGN KEY (OrderID) REFERENCES CustomersOrders(OrderID)"+
//     ");", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Create Collection Finish.')
//     console.log('----------------')
// });
// connection.query("show tables;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO CompanyUser (`Username`, `Password`)"+
//         "VALUES ('cavallo', 'cavallo7');", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert CompanyUser Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO RestaurantInfo (ID, RestaurantName, Address, PostCode, Email, Telephone, WeekdayOpeningTime, WeekdayClosingTime, WeekendOpeningTime, WeekendClosingTime, Slogan)"+
//         "VALUES ('Cav01', 'Cavallo (Seaton Delaval)', 'Avenue Crescent, Seaton Delaval, Northumberland', 'NE25 0DN', 'cavallo@cavallo.com', '01111222222', '11:00:00', '18:00:00', '11:00:00', '18:00:00', 'Traditional Italian Ice Cream');", 
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert RestaurantInfo Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P01S', 'Plain Vanilla', 'Small', '1.75'), "+
//         "('P01M', 'Plain Vanilla', 'Medium', '2.25'),"+
//         "('P01L', 'Plain Vanilla', 'Large', '2.75'),"+
//         "('P01XL', 'Plain Vanilla', 'Extra Large', '3.50'),"+
//         "('P01XXL', 'Plain Vanilla', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P01 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P02S', 'Plain Vanilla(Dairy-Free)', 'Small', '1.75'), "+
//         "('P02M', 'Plain Vanilla(Dairy-Free)', 'Medium', '2.25'),"+
//         "('P02L', 'Plain Vanilla(Dairy-Free)', 'Large', '2.75'),"+
//         "('P02XL', 'Plain Vanilla(Dairy-Free)', 'Extra Large', '3.50'),"+
//         "('P02XXL', 'Plain Vanilla(Dairy-Free)', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P02 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P03S', 'Honeycomb', 'Small', '1.75'), "+
//         "('P03M', 'Honeycomb', 'Medium', '2.25'),"+
//         "('P03L', 'Honeycomb', 'Large', '2.75'),"+
//         "('P03XL', 'Honeycomb', 'Extra Large', '3.50'),"+
//         "('P03XXL', 'Honeycomb', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P03 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P04S', 'Rum and Raisin', 'Small', '1.75'), "+
//         "('P04M', 'Rum and Raisin', 'Medium', '2.25'),"+
//         "('P04L', 'Rum and Raisin', 'Large', '2.75'),"+
//         "('P04XL', 'Rum and Raisin', 'Extra Large', '3.50'),"+
//         "('P04XXL', 'Rum and Raisin', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P04 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P05S', 'Mint', 'Small', '1.75'), "+
//         "('P05M', 'Mint', 'Medium', '2.25'),"+
//         "('P05L', 'Mint', 'Large', '2.75'),"+
//         "('P05XL', 'Mint', 'Extra Large', '3.50'),"+
//         "('P05XXL', 'Mint', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P05 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P06S', 'Cherry', 'Small', '1.75'), "+
//         "('P06M', 'Cherry', 'Medium', '2.25'),"+
//         "('P06L', 'Cherry', 'Large', '2.75'),"+
//         "('P06XL', 'Cherry', 'Extra Large', '3.50'),"+
//         "('P06XXL', 'Cherry', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P06 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P07S', 'Chocolate', 'Small', '1.75'), "+
//         "('P07M', 'Chocolate',  'Medium', '2.25'),"+
//         "('P07L', 'Chocolate',  'Large', '2.75'),"+
//         "('P07XL', 'Chocolate',  'Extra Large', '3.50'),"+
//         "('P07XXL', 'Chocolate', 'Extra Extra Large', '5.75');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P07 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P08S', 'Salted Caramel', 'Small', '2.5'), "+
//         "('P08M', 'Salted Caramel',  'Medium', '3.00'),"+
//         "('P08L', 'Salted Caramel', 'Large', '3.50'),"+
//         "('P08XL', 'Salted Caramel', 'Extra Large', '4.25'),"+
//         "('P08XXL', 'Salted Caramel', 'Extra Extra Large', '6.50');",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P08 Finish.')
//     console.log('----------------')
// });

// connection.query("INSERT INTO Product (ProductID, Description, Size, TotalCost)"+
//         "VALUES ('P09S', 'Strawberry', 'Small', '1.75'), "+
//         "('P09M', 'Strawberry', 'Medium', '2.25'),"+
//         "('P09L', 'Strawberry', 'Large', '2.75'),"+
//         "('P09XL', 'Strawberry', 'Extra Large', '3.50'),"+
//         "('P09XXL', 'Strawberry', 'Extra Extra Large', '5.75'); ",
//     function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Insert P09 Finish.')
//     console.log('----------------')
// });
