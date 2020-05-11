DROP TABLE IF EXISTS kenniskaarten;

CREATE TABLE `kenniskaarten` (
  `kenniskaart_ID` Integer(10) NOT NULL AUTO_INCREMENT,
  `titel` Varchar(255),
  `what` Varchar(1023),
  `why` Varchar(1023),
  `how` Varchar(1023),
  `voorbeeld` Varchar(255),
  `rol` Varchar(255),
  `vaardigheid` Varchar(255),
  `hboi` Varchar(255),
  `datetime` TIMESTAMP,
  PRIMARY KEY (`kenniskaart_ID`)
);
