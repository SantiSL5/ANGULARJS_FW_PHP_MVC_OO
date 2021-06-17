-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 172.18.0.2    Database: videogames
-- ------------------------------------------------------
-- Server version	5.6.51

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `iduser` varchar(45) NOT NULL,
  `idvideogame` int(11) NOT NULL,
  `cant` int(11) DEFAULT NULL,
  PRIMARY KEY (`iduser`,`idvideogame`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `cart_of_order`
--

DROP TABLE IF EXISTS `cart_of_order`;
/*!50001 DROP VIEW IF EXISTS `cart_of_order`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `cart_of_order` AS SELECT 
 1 AS `idvideogame`,
 1 AS `cant`,
 1 AS `total_line`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_name` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_name`),
  UNIQUE KEY `category_UNIQUE` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Accion','/frontend/assets/img/accion.jpeg'),('Aventura','/frontend/assets/img/aventura.jpeg'),('Carreras','/frontend/assets/img/carreras.jpeg'),('Deporte','/frontend/assets/img/deporte.jpeg'),('Estrategia','/frontend/assets/img/estrategia.jpeg'),('Musica','/frontend/assets/img/musica.jpeg'),('Puzzle','/frontend/assets/img/puzzle.jpeg'),('Sandbox','/frontend/assets/img/sandbox.jpg'),('Shooter','/frontend/assets/img/shooter.jpeg'),('Simulacion','/frontend/assets/img/simulacion.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `iduser` varchar(45) NOT NULL,
  `idvideogame` int(11) NOT NULL,
  PRIMARY KEY (`iduser`,`idvideogame`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES ('LU_60c10d8121125560119082',2),('LU_60c10d8121125560119082',15);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER insert_like
AFTER INSERT ON favorites 
FOR EACH ROW
BEGIN
	UPDATE videogames SET likes=(
		SELECT COUNT(*) FROM favorites
        WHERE idvideogame=NEW.idvideogame
    )
    WHERE id=NEW.idvideogame;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER delete_like
AFTER DELETE ON favorites 
FOR EACH ROW
BEGIN
	UPDATE videogames SET likes=(
		SELECT COUNT(*) FROM favorites
        WHERE idvideogame=OLD.idvideogame
    )
    WHERE id=OLD.idvideogame;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orderlines`
--

DROP TABLE IF EXISTS `orderlines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderlines` (
  `idline` int(11) NOT NULL AUTO_INCREMENT,
  `idorder` int(11) DEFAULT NULL,
  `idproduct` int(11) DEFAULT NULL,
  `cant` int(11) DEFAULT NULL,
  `totalprice` int(11) DEFAULT NULL,
  PRIMARY KEY (`idline`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderlines`
--

LOCK TABLES `orderlines` WRITE;
/*!40000 ALTER TABLE `orderlines` DISABLE KEYS */;
INSERT INTO `orderlines` VALUES (1,1,14,2,70),(2,1,15,1,125),(3,2,1,1,30),(4,2,2,1,40),(5,2,3,1,23),(6,2,9,1,34),(7,2,14,3,105),(8,2,16,1,12),(9,3,9,1,34),(10,3,13,1,105),(11,3,14,1,35),(12,3,15,1,125),(13,4,1,1,30);
/*!40000 ALTER TABLE `orderlines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `idorder` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` varchar(45) NOT NULL,
  `totalprice` int(11) DEFAULT NULL,
  `state` int(1) DEFAULT NULL,
  PRIMARY KEY (`idorder`,`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'LU_60c10d8121125560119082',195,0),(2,'LU_60c10d8121125560119082',244,0),(3,'LU_60c10d8121125560119082',299,0),(4,'LU_60c10d8121125560119082',30,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataform`
--

DROP TABLE IF EXISTS `plataform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plataform` (
  `plataforma` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`plataforma`),
  UNIQUE KEY `plataforma_UNIQUE` (`plataforma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataform`
--

LOCK TABLES `plataform` WRITE;
/*!40000 ALTER TABLE `plataform` DISABLE KEYS */;
INSERT INTO `plataform` VALUES ('3DS','/frontend/assets/img/general.png'),('DS','/frontend/assets/img/general.png'),('PC','/frontend/assets/img/general.png'),('PS1','/frontend/assets/img/general.png'),('PS2','/frontend/assets/img/general.png'),('PS3','/frontend/assets/img/general.png'),('PS4','/frontend/assets/img/general.png'),('PS5','/frontend/assets/img/general.png'),('SWITCH','/frontend/assets/img/general.png'),('WII','/frontend/assets/img/general.png'),('XBOX1','/frontend/assets/img/general.png'),('XBOX360','/frontend/assets/img/general.png');
/*!40000 ALTER TABLE `plataform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `avatar` varchar(150) DEFAULT NULL,
  `validate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('GU_fLkLxm0jdTf2MxJxhWOvhVpwtHl2','Santiago Soler Llin','santiagosolerllin@gmail.com','','client','https://lh3.googleusercontent.com/a/AATXAJyRsOu1VoJ5N8F2RpvgrSGN1KyvcfHfETGtGSDw=s96-c',NULL),('LU_60c10d8121125560119082','SantiSL5','santisolerllin@gmail.com','$2y$10$kCpiGzc60WGECNvmpHjmsudd4RN/Q35SLRZ5HSoHBd4Ezwk.oHliW','client','https://www.gravatar.com/avatar/7e55a9727854e9550e7b66de77a00b78?s=40&d=identicon','true');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videogames`
--

DROP TABLE IF EXISTS `videogames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videogames` (
  `id` varchar(45) NOT NULL,
  `code` varchar(45) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `companyia` varchar(45) DEFAULT NULL,
  `fecha_salida` varchar(45) DEFAULT NULL,
  `clasificacion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `generos` varchar(255) DEFAULT NULL,
  `plataforma` varchar(45) DEFAULT NULL,
  `precio` int(45) DEFAULT NULL,
  `unidades` varchar(45) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `views` varchar(45) DEFAULT '0',
  `likes` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videogames`
--

LOCK TABLES `videogames` WRITE;
/*!40000 ALTER TABLE `videogames` DISABLE KEYS */;
INSERT INTO `videogames` VALUES ('1','123sasass','embestida','asdfasfd','17/01/2021','3','Nuevo','Accion:Shooter:Estrategia:Simulacion:Deporte:Carreras:Aventura:Sandbox:Musica:Puzzle','PC',30,'37','/frontend/assets/img/general.png','101','0'),('10','432hdjskd','hidroworld','sdfsadfasfd','16/02/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS1',34,'64','/frontend/assets/img/general.png','0','0'),('11','543dshsjk','naturaleza','sadfsadf','16/01/2021','16','Segunda Mano','Accion:Simulacion:Deporte','WII',25,'11','/frontend/assets/img/general.png','1','0'),('12','314dshgsd','exploration','joepwa','17/02/2021','16','Nuevo','Accion:Simulacion:Deporte','PS5',35,'23','/frontend/assets/img/general.png','0','0'),('13','124fjskgl','3Dentreteinment','asdfsdaf','17/02/2021','18','Segunda Mano','Shooter:Simulacion:Carreras','PS5',105,'23','/frontend/assets/img/general.png','0','0'),('14','642haejcl','toroloco','asdfdsaf','17/02/2021','18','Segunda Mano','Accion:Simulacion:Deporte','DS',35,'42','/frontend/assets/img/general.png','12','0'),('15','124fjskgp','corre','fasdea','17/02/2021','18','Nuevo','Shooter:Simulacion:Carreras','PS5',125,'45','/frontend/assets/img/general.png','10','1'),('16','134fjsjrd','lupon','afdsf','17/02/2021','18','Segunda Mano','Accion:Simulacion:Deporte','WII',12,'4','/frontend/assets/img/general.png','0','0'),('17','174fjsjrd','jurni','asdfdsaf','17/02/2021','18','Nuevo','Accion:Simulacion:Deporte','DS',67,'0','/frontend/assets/img/general.png','0','0'),('2','123sesese','alalbamirar','dfadsf','16/01/2021','3','Nuevo','Accion:Shooter:Estrategia','PS4',40,'5','/frontend/assets/img/general.png','42','1'),('3','321asdasd','dungeons','dsafjksadfhj','16/01/2021','3','Nuevo','Accion:Shooter:Estrategia:Carreras:Aventura:Sandbox','XBOX1',23,'48','/frontend/assets/img/general.png','1','0'),('4','432asjsda','dragons','hsafdhjgdgiu','16/01/2021','12','Segunda Mano','Accion:Shooter:Estrategia:Aventura','XBOX360',43,'23','/frontend/assets/img/general.png','0','0'),('5','321ghdhds','legueofbikes','gdsagshiu','22/01/2021','18','Nuevo','Accion:Simulacion:Deporte:Puzzle','DS',27,'15','/frontend/assets/img/general.png','0','0'),('6','432jhdaho','olassalvajes','dasfhkjds','16/02/2021','16','Segunda Mano','Accion:Shooter:Simulacion:Carreras','3DS',54,'50','/frontend/assets/img/general.png','0','0'),('7','341acdwes','festival','adsfsdaf','15/02/2021','3','Nuevo','Shooter:Simulacion:Carreras','SWITCH',75,'40','/frontend/assets/img/general.png','0','0'),('8','531rgewsa','orotodo','sdafasdf','16/01/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS3',46,'35','/frontend/assets/img/general.png','0','0'),('9','762gdhssa','mujasa','dsafasfd','23/01/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS2',34,'23','/frontend/assets/img/general.png','0','0');
/*!40000 ALTER TABLE `videogames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'videogames'
--

--
-- Dumping routines for database 'videogames'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_Quant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `add_Quant`(videogameid int, userid VARCHAR(45))
BEGIN
	DECLARE stock INT;
	DECLARE quant INT;
    DECLARE exist INT;
    DECLARE exist_videogame INT;
    set exist=(
		SELECT COUNT(*) 
        FROM cart 
        WHERE idvideogame=videogameid && iduser=userid
    );
	set exist_videogame=(
		SELECT COUNT(*) 
        FROM videogames
        WHERE id=videogameid
    );
    IF exist<>0 and exist_videogame<>0 THEN
		SET stock=(
			SELECT unidades
			FROM videogames v
			WHERE id=videogameid
		);
		SET quant=(
			SELECT c.cant
			FROM videogames v
			INNER JOIN cart c
			ON c.idvideogame=v.id
			WHERE c.idvideogame=videogameid && c.iduser=userid
		);
		IF stock=0 THEN
			SELECT 2 AS result;
		ELSE
			IF stock>=quant+1 THEN
				UPDATE cart 
				SET cant=cant+1
				WHERE idvideogame=videogameid && iduser=userid;
				SELECT 1 AS result,quant+1 AS quant;
			ELSE
				SELECT 0 AS result,quant;
			END IF;
		END IF;
	ELSE IF exist_videogame<>0 THEN
		SET stock=(
			SELECT unidades
			FROM videogames v
			WHERE id=videogameid
		);
		IF stock=0 THEN
			SELECT 2 AS result;
		ELSE
			SELECT userid;
			INSERT cart (iduser,idvideogame,cant)
			VALUES (userid,videogameid,1);
			SELECT 1 AS result, 1 AS quant;
		END IF;
	ELSE
		SELECT NULL AS result;
	END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `order_complete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `order_complete`(userid VARCHAR(45))
BEGIN
	DECLARE total_order INT;
    DECLARE actual_order INT;
    DECLARE idproduct INT;
    DECLARE cant_product INT;
    DECLARE totalprice INT;
	DECLARE fin INTEGER DEFAULT 0;
	DECLARE orderlines_cursor CURSOR FOR
    SELECT idvideogame AS idproduct,cant AS cant_product,total_line AS totalprice
    FROM cart_of_order;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
    SET total_order=(
		SELECT SUM(c.cant*v.precio) AS totalCart
		FROM cart c
		INNER JOIN videogames v
		ON c.idvideogame=v.id
		WHERE c.iduser=userid);
    
	INSERT INTO orders (iduser,totalprice,state)
    VALUES(userid,total_order,1);

	OPEN orderlines_cursor;
		order_lines: LOOP
			SET actual_order=(
				SELECT o.idorder
				FROM orders o
				WHERE o.iduser=userid AND state=1);
                
			FETCH orderlines_cursor INTO idproduct,cant_product,totalprice;
			IF fin = 1 THEN
			   LEAVE order_lines;
			END IF;
            
            INSERT INTO orderlines (idorder,idproduct,cant,totalprice)
			SELECT actual_order,idproduct,cant_product AS cant,totalprice;
            
			UPDATE videogames v
			SET v.unidades=v.unidades-cant_product
			WHERE v.id=idproduct;
            
			DELETE FROM cart
			WHERE iduser = (
				SELECT o.iduser
				FROM orders o
				WHERE o.idorder=actual_order AND state=1);

		END LOOP order_lines;
	CLOSE orderlines_cursor;
    
		UPDATE orders
		SET state=0
		WHERE idorder=actual_order;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `subst_Quant` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `subst_Quant`(videogameid int, userid VARCHAR(45))
BEGIN
	DECLARE stock INT;
	DECLARE quant INT;
	DECLARE exist_videogame INT;
	SET quant=(
		SELECT c.cant
		FROM videogames v
		INNER JOIN cart c
		ON c.idvideogame=v.id
		WHERE c.idvideogame=videogameid && c.iduser=userid
	);
	set exist_videogame=(
		SELECT COUNT(*) 
        FROM videogames
        WHERE id=videogameid
    );
    IF exist_videogame<>0 THEN
		IF 0<quant-1 THEN
			UPDATE cart 
			SET cant=cant-1
			WHERE idvideogame=videogameid && iduser=userid;
			SELECT 0<quant-1 AS result, quant-1 as quant;
		ELSE
			DELETE FROM cart
			WHERE idvideogame=videogameid && iduser=userid;
			SELECT "delete" AS result, quant-1 as quant;
		END IF;
	ELSE
		SELECT NULL AS result;
	END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `totalCart` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `totalCart`(userid VARCHAR(45))
BEGIN
	SELECT SUM(c.cant*v.precio) AS totalCart
	FROM cart c
	INNER JOIN videogames v
	ON c.idvideogame=v.id
    WHERE c.iduser=userid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `cart_of_order`
--

/*!50001 DROP VIEW IF EXISTS `cart_of_order`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `cart_of_order` AS select `c`.`idvideogame` AS `idvideogame`,`c`.`cant` AS `cant`,(`c`.`cant` * `v`.`precio`) AS `total_line` from (`cart` `c` join `videogames` `v` on((`c`.`idvideogame` = `v`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-17  3:53:40
