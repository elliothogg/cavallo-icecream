const connection = require('./database');

//  Add data to database
connection.query("use main;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Using Main Database.')
    console.log('----------------')
});
connection.query("drop table if exists `EachOrdersProducts`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `Delivery`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `Collection`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `Orders`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `Product`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `Size`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `RestaurantInfo`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
connection.query("drop table if exists `CompanyUser`;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE CompanyUser ("+
        "Username varchar(50) NOT NULL,"+
        "Password varchar(100) NOT NULL"+
    ");", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create CompanyUser Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE RestaurantInfo ("+
        "ID varchar(20) NOT NULL,"+
        "RestaurantName varchar(100) NOT NULL,"+
        "Address varchar(100) NOT NULL,"+
        "PostCode varchar(10) NOT NULL,"+
        "Email varchar(100) NOT NULL,"+
        "Telephone varchar(100) NOT NULL,"+
        "WeekdayOpeningTime TIME NOT NULL,"+
        "WeekdayClosingTime TIME NOT NULL,"+
        "WeekendOpeningTime TIME NOT NULL,"+
        "WeekendClosingTime TIME NOT NULL,"+
        "Slogan varchar(50),"+
        "PRIMARY KEY (ID)"+
    ");", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create RestaurantInfo Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE Size ("+
        "Size varchar(20) NOT NULL,"+
        "Price varchar(20) NOT NULL, "+
        "PRIMARY KEY (Size)"+
    ");", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create Product Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE Product ("+
        "ProductID varchar(20) NOT NULL,"+
        "Flavour varchar(20) NOT NULL, "+
        "ExtraCost varchar(20) NOT NULL,"+
        "PRIMARY KEY (ProductID)"+
    ");", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create Product Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE Orders ("+
        "OrderID varchar(30) NOT NULL,"+
        "CustomerEmail varchar(100) NOT NULL,"+
        "CustomerPhone varchar(50) NOT NULL,"+
        "CustomerFirstName varchar(20) NOT NULL,"+
        "CustomerLastName varchar(20) NOT NULL,"+
        "OrderTime varchar(20) NOT NULL,"+
        "BillingAddress varchar(50) NOT NULL,"+
        "BillingPostcode varchar(50) NOT NULL,"+
        "TotalCost float NOT NULL,"+
        "DeliveryOrCollection varchar(30) DEFAULT NULL,"+
        "PRIMARY KEY (OrderID)"+
    "); ", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create Orders Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE EachOrdersProducts ("+
        "OrderID varchar(30) NOT NULL,"+
        "ProductID varchar(20) NOT NULL,"+
        "Size varchar(20) NOT NULL,"+
        "Quantity varchar(20) NOT NULL,"+
        "FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),"+
        "FOREIGN KEY (ProductID) REFERENCES Product(ProductID)"+
    ");", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create EachOrdersProducts Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE Delivery ("+
        "OrderID varchar(30) NOT NULL,"+
        "DeliveryTime varchar(20) NOT NULL,"+
        "DeliveryAddress varchar(50) NOT NULL,"+
        "DeliveryPostcode varchar(50) NOT NULL,"+
        "DriverInstructions varchar(100) Default NULL,"+
        "FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)"+
    "); ", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create Delivery Finish.')
    console.log('----------------')
});

connection.query(
    "CREATE TABLE Collection ("+
        "OrderID varchar(30) NOT NULL,"+
        "CollectionTime varchar(20) NOT NULL,"+
        "FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)"+
    ");", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Create Collection Finish.')
    console.log('----------------')
});
connection.query("show tables;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO CompanyUser (`Username`, `Password`)"+
        "VALUES ('cavallo', 'cavallo7');", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert CompanyUser Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO RestaurantInfo (ID, RestaurantName, Address, PostCode, Email, Telephone, WeekdayOpeningTime, WeekdayClosingTime, WeekendOpeningTime, WeekendClosingTime, Slogan)"+
        "VALUES ('Team05', 'Cavallo', 'Avenue Crescent, Seaton Delaval, Northumberland', 'NE25 0DN', 'cavallo@cavallo.com', '01111222222', '11:00:00', '18:00:00', '11:00:00', '18:00:00', 'Traditional Italian Ice Cream');", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert RestaurantInfo Finish.')
    console.log('----------------')
});


connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F01', 'Vanilla', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F01 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F02', 'Vanilla(Dairy-Free)', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F02 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F03', 'Honeycomb', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F03 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F04', 'Rum and Raisin', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F04 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F05', 'Mint', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F05 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F06', 'Cherry', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F06 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F07', 'Chocolate', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F07 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F08', 'Salted Caramel', '0.75')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F08 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Product(ProductID, Flavour, ExtraCost)" +
        "VALUES ('F09', 'Strawberry', '0')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert F09 Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Size(Size, Price)" +
        "VALUES ('S', '1.75')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert S Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Size(Size, Price)" +
        "VALUES ('M', '2.25')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert M Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Size(Size, Price)" +
        "VALUES ('L', '2.75')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert L Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Size(Size, Price)" +
        "VALUES ('XL', '3.50')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert XL Finish.')
    console.log('----------------')
});

connection.query("INSERT INTO Size(Size, Price)" +
        "VALUES ('XXL', '5.75')", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Insert XXL Finish.')
    console.log('----------------')
});

connection.query("select * from Orders", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Orders.')
    console.log('----------------')
});

connection.query("select * from EachOrdersProducts", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('EachOrdersProducts.')
    console.log('----------------')
});

connection.query("select * from Collection", 
    function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});