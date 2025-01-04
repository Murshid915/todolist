-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `decription` text,
  `deadline` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (3,'Login Setupp','Login setup design and backend','2024-12-18 01:34:00','Not Started'),(4,'Signup Setup','Signup setup design and backend','2024-11-18 06:30:00','In Progress'),(5,'Setup Backend','Initialize node.js backend','2024-01-17 12:13:54','Completed'),(6,'Integrate payment gateway','Integrate stripes for handling','2025-01-02 09:30:00','On going'),(7,'Set Up SEO','Implement SEO best practises','2025-01-07 13:00:00','Not started'),(8,'jdevops','hghgh','2024-12-18 19:04:00','In Progress'),(9,'json data','at the kalli mut','2024-12-19 16:59:00','Not Started');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(70) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'ali','2353','ali@gmail.com','Alimanzil'),(3,'john','123sd','rosh12@gmail.com',NULL),(4,'mursh','@7865',NULL,'zubaidamanzil'),(5,'krithik','9876','krithi@gmail.com',NULL),(6,'ameen','7654','ammeen@gmail.com','ameenmanzil'),(7,'anas','7864','anus@gmail.com','anusamanmanzil'),(8,'Abid','4322','abid@gmail.com','abidmanzil');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userst`
--

DROP TABLE IF EXISTS `userst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userst` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userst`
--

LOCK TABLES `userst` WRITE;
/*!40000 ALTER TABLE `userst` DISABLE KEYS */;
INSERT INTO `userst` VALUES (1,'Mursh','murshi479@gmail.com','$2b$10$/qsnlzj5JmNChDfPaNqNPOXPfIx7iDQF5Wgy1MD29vdNamDR6ZDwW'),(2,'Mursh','mursh@hgm.com','$2b$10$Tsk.FMg5Of073YxSgLgVR.GFcPxlSW9D7kXbkX8oKp.YixvvBf59u'),(3,'Mursh','mursh.@hgm.com','$2b$10$DHJEsrfxZlW5pwbaJeCDvugwOwf8.1IVhPaqAWceXNwiN1zOaa00i'),(4,'Murshi','mu.rsh@hgm.com','$2b$10$L4NCRn8hkhml26.Rc4nb9.MiFs4L.FKJS2h7GVlPWYXK4RfXn0lt2'),(5,'Mursh','zb@gm.com','$2b$10$pPlynod4ZScKFYeq/m4w9.FXWad4gPfAPoBazUENAlRQwrOMDG5SC'),(6,'Mursh','zb.@gm.com','$2b$10$Cqp33vQp8D2kZ45PkIPhDO6J8x3zBpi7cd14A3WjR77iOqVedfMd6'),(7,'Mursh','mursh@hgm.com','$2b$10$0.9Ph1e/dkUqug3MJiWL7O.pG14RgGCHnhrG.FlfSdiSyR94/SgBu'),(8,'Murshid','murshi@hgm.com','$2b$10$FJ1yKF3LIlQ6UsWtO8lIwuCGbt.19oNJgUqvysOl5n0HHW/.HGuuS');
/*!40000 ALTER TABLE `userst` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-04 12:18:26
