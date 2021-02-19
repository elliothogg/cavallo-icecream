const connection = require('./database');

//   Add data to database
connection.query("use main;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Using Main Database.')
    console.log('----------------')
});

// connection.query("drop table if exists People;", function(error, results, fields){
//     if(error)throw error;
//     console.log(results);
//     console.log('Finish.')
//     console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `User` (" +
//         "`Username` varchar(50) NOT NULL," +
//         "`Password` varchar(100) NOT NULL," +
//         "PRIMARY KEY (`Username`)"+
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create User Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Customer`(" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`FirstName` varchar(100) NOT NULL," +
//         "`LastName` varchar(100) NOT NULL," +
//         "`Address` varchar(100) NOT NULL," +
//         "`PostCode` varchar(100) NOT NULL," +
//         "`Email` varchar(100) NOT NULL," +
//         "`Telephone` varchar(100) NOT NULL," +
//         "`DeliveryPreferences` varchar(100) DEFAULT NULL," +
//         "`Username` varchar(50) NOT NULL," +
//         "PRIMARY KEY (`ID`)," +
//         "KEY `Customer_FK` (`Username`)," +
//         "CONSTRAINT `Customer_FK` FOREIGN KEY (`Username`) REFERENCES `User` (`Username`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 

//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Customer Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Shop` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`ShopName` varchar(100) NOT NULL," +
//         "`Address` varchar(100) NOT NULL," +
//         "`PostCode` varchar(10) NOT NULL," +
//         "`Email` varchar(100) NOT NULL," +
//         "`Telephone` int(11) NOT NULL," +
//         "`WeekdayOpeningTime` time NOT NULL," +
//         "`WeekdayClosingTime` time NOT NULL," +
//         "`WeekendOpeningTime` time NOT NULL," +
//         "`WeekendClosingTime` time NOT NULL," +
//         "`OwnerName` varchar(100) NOT NULL," +
//         "`Username` varchar(50) NOT NULL," +
//         "PRIMARY KEY (`ID`)," +
//         "KEY `Shop_FK` (`Username`)," +
//         "CONSTRAINT `Shop_FK` FOREIGN KEY (`Username`) REFERENCES `User` (`Username`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Shop Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Size` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`Size` varchar(30) NOT NULL," +
//         "`Cost` float NOT NULL," +
//         "PRIMARY KEY (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Size Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Flavour` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`Flavour` varchar(40) NOT NULL," +
//         "`Surcharge` float NOT NULL," +
//         "PRIMARY KEY (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Flavour Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Product` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`SizeID` int(11) NOT NULL," +
//         "`FlavourID` int(11) NOT NULL," +
//         "`TotalCost` float NOT NULL," +
//         "`ShopID` int(11) NOT NULL," +
//         "PRIMARY KEY (`ID`)," +
//         "KEY `Product_FK` (`FlavourID`)," +
//         "KEY `Product_FK_1` (`SizeID`)," +
//         "KEY `Product_FK_2` (`ShopID`)," +
//         "CONSTRAINT `Product_FK_2` FOREIGN KEY (`ShopID`) REFERENCES `Shop` (`ID`)," +
//         "CONSTRAINT `Product_FK` FOREIGN KEY (`FlavourID`) REFERENCES `Flavour` (`ID`)," +
//         "CONSTRAINT `Product_FK_1` FOREIGN KEY (`SizeID`) REFERENCES `Size` (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Product Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Payment` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`Card` float NOT NULL," +
//         "`BillingAddress` varchar(100) NOT NULL," +
//         "`DiscountCode` varchar(100) DEFAULT NULL," +
//         "`GiftCard` varchar(100) DEFAULT NULL," +
//         "`Date` date NOT NULL," +
//         "PRIMARY KEY (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Payment Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Order` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`CustomeID` int(11) NOT NULL," +
//         "`PaymentID` int(11) NOT NULL," +
//         "`ProductID` int(11) NOT NULL," +
//         "`TotalCost` float NOT NULL," +
//         "PRIMARY KEY (`ID`)," +
//         "KEY `Order_FK` (`CustomeID`)," +
//         "KEY `Order_FK_1` (`ProductID`)," +
//         "KEY `Order_FK_2` (`PaymentID`)," +
//         "CONSTRAINT `Order_FK` FOREIGN KEY (`CustomeID`) REFERENCES `Customer` (`ID`)," +
//         "CONSTRAINT `Order_FK_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ID`)," +
//         "CONSTRAINT `Order_FK_2` FOREIGN KEY (`PaymentID`) REFERENCES `Payment` (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Order Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Delivery` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`OrderID` int(11) NOT NULL," +
//         "`Date` date NOT NULL," +
//         "`Time` time NOT NULL," +
//         "PRIMARY KEY (`ID`)," +
//         "KEY `Delivery_FK` (`OrderID`)," +
//         "CONSTRAINT `Delivery_FK` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Delivery Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "CREATE TABLE `Collection` (" +
//         "`ID` int(11) NOT NULL AUTO_INCREMENT," +
//         "`OrderID` int(11) NOT NULL," +
//         "`Date` date NOT NULL," +
//         "`Time` time NOT NULL," +
//         "PRIMARY KEY (`ID`)," +
//         "KEY `Collection_FK` (`OrderID`)," +
//         "CONSTRAINT `Collection_FK` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`ID`)" +
//         ") ENGINE=InnoDB DEFAULT CHARSET=latin1;", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Create Collection Table Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "INSERT INTO Flavour (Flavour, Surcharge)" +
//     "VALUES ('Plain Vanilla', '0'), " +
//     "('Plain Vanilla (Gluten Free)', '0'), " +
//     "('Honeycomb', '0'), ('Rum and Raisin', '0'), " +
//     "('Mint', '0'), ('Cherry', '0'), ('Chocolate', '0'), " +
//     "('Salted Caramel', '0.75'), ('Strawberry', '0');", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Insert Flavour Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "INSERT INTO Size (Size, Cost)" +
//     "VALUES ('Small', '1.75'), ('Medium', '2,25'), " +
//     "('Large', '2.75'), ('Extra Large', '3.5'), ('Extra Extra Large', '5.75');", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Insert Size Finish.')
//         console.log('----------------')
// });

// connection.query(
//     "INSERT INTO User (Username, Password)" +
//     "VALUES ('admin', '123456');", 
//     function(error, results, fields){
//         if(error)throw error;
//         console.log(results);
//         console.log('Insert User Finish.')
//         console.log('----------------')
// });

connection.query("show tables;", function(error, results, fields){
    if(error)throw error;
    console.log(results);
    console.log('Finish.')
    console.log('----------------')
});
