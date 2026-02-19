-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: localhost    Database: jabuti
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.9-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `configuracao`
--

DROP TABLE IF EXISTS `configuracao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuracao` (
  `id_configuracao` int(11) NOT NULL,
  `timeout_atividade` int(11) DEFAULT NULL,
  `timeout_acesso` int(11) DEFAULT NULL,
  `velocidade` int(11) DEFAULT NULL,
  `modelo` int(1) NOT NULL,
  `tipomedida` int(1) NOT NULL,
  `servidor` varchar(35) NOT NULL,
  `calibragem10` float NOT NULL,
  `calibragem45` float NOT NULL,
  `calibragem90` float NOT NULL,
  `calibragem180` float NOT NULL,
  `calibragem360` float NOT NULL,
  `versao` varchar(10) NOT NULL,
  `hostcamera` varchar(80) DEFAULT NULL,
  `usacamera` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_configuracao`),
  KEY `idx_modelo` (`modelo`),
  KEY `idx_tipomedida` (`tipomedida`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracao`
--

LOCK TABLES `configuracao` WRITE;
/*!40000 ALTER TABLE `configuracao` DISABLE KEYS */;
INSERT INTO `configuracao` VALUES (1,NULL,NULL,0,1,1,'192.168.1.20',70.6,319,637.5,1275,2550,'v03.16','http://192.168.0.123:8081/',1);
/*!40000 ALTER TABLE `configuracao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos`
--

DROP TABLE IF EXISTS `equipamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipamentos` (
  `id_equipamento` int(11) NOT NULL AUTO_INCREMENT,
  `id_senha` varchar(45) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `endereco` varchar(45) DEFAULT NULL,
  `status` int(1) NOT NULL,
  `ssid` varchar(45) DEFAULT NULL,
  `ssid_senha` varchar(45) DEFAULT NULL,
  `host` varchar(45) DEFAULT NULL,
  `datacadastro` datetime NOT NULL,
  PRIMARY KEY (`id_equipamento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos_executar`
--

DROP TABLE IF EXISTS `equipamentos_executar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipamentos_executar` (
  `id_equipamento` int(11) NOT NULL,
  `conteudo` text,
  `executar` int(11) NOT NULL,
  PRIMARY KEY (`id_equipamento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos_executar`
--

LOCK TABLES `equipamentos_executar` WRITE;
/*!40000 ALTER TABLE `equipamentos_executar` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipamentos_executar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo`
--

DROP TABLE IF EXISTS `modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulo` (
  `id_modulo` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(128) NOT NULL,
  PRIMARY KEY (`id_modulo`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo`
--

LOCK TABLES `modulo` WRITE;
/*!40000 ALTER TABLE `modulo` DISABLE KEYS */;
INSERT INTO `modulo` VALUES (-1,'Painel de Controle'),(1,'Módulo 1'),(2,'Módulo 2'),(3,'Módulo 3'),(4,'Módulo 4');
/*!40000 ALTER TABLE `modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa` (
  `id_pessoa` int(11) NOT NULL AUTO_INCREMENT,
  `id_pessoa_tipo` int(11) NOT NULL,
  `nome` varchar(128) NOT NULL,
  `instituicao` varchar(128) DEFAULT NULL,
  `equipe` varchar(128) DEFAULT NULL,
  `ultimo_acesso` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email` varchar(128) NOT NULL,
  `login` varchar(32) NOT NULL,
  `senha` varchar(32) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `data_nascimento` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `interativo` int(11) NOT NULL,
  `direto` int(1) NOT NULL,
  `equipamento_padrao` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_pessoa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (-1,1,'Admin Plus',NULL,NULL,'2016-03-02 07:49:08','','','c29053df8c44e58b9daa79e35ae0645e',0,'0000-00-00 00:00:00',0,0,NULL),(1,1,'Admin',NULL,NULL,'2016-03-02 07:49:08','','','f0d3ce9b9e5c4b38902dda0a2a18d836',0,'0000-00-00 00:00:00',0,0,NULL);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa_modulo`
--

DROP TABLE IF EXISTS `pessoa_modulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa_modulo` (
  `id_pessoa` int(11) NOT NULL,
  `id_modulo` int(11) NOT NULL,
  `conteudo` text,
  `enviou` int(11) DEFAULT NULL,
  `ultima_atualizacao` timestamp NULL DEFAULT NULL,
  UNIQUE KEY `idx_pessoa_modulo` (`id_pessoa`,`id_modulo`),
  KEY `idx_pessoa` (`id_pessoa`),
  KEY `idx_modulo` (`id_modulo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa_modulo`
--

LOCK TABLES `pessoa_modulo` WRITE;
/*!40000 ALTER TABLE `pessoa_modulo` DISABLE KEYS */;
INSERT INTO `pessoa_modulo` VALUES (-1,1,'',NULL,NULL);
/*!40000 ALTER TABLE `pessoa_modulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa_tipo`
--

DROP TABLE IF EXISTS `pessoa_tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pessoa_tipo` (
  `id_pessoa_tipo` int(11) NOT NULL,
  `descricao` varchar(128) NOT NULL,
  PRIMARY KEY (`id_pessoa_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa_tipo`
--

LOCK TABLES `pessoa_tipo` WRITE;
/*!40000 ALTER TABLE `pessoa_tipo` DISABLE KEYS */;
INSERT INTO `pessoa_tipo` VALUES (1,'Administrador'),(2,'Moderador'),(3,'Usuário');
/*!40000 ALTER TABLE `pessoa_tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessao`
--

DROP TABLE IF EXISTS `sessao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessao` (
  `id_sessao` varchar(64) NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data_ultimo_login` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data_ultimo_acesso` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data_expira` timestamp NULL DEFAULT NULL,
  `user_agent` varchar(256) NOT NULL,
  `remote_ip` varchar(64) DEFAULT NULL,
  `request_method` varchar(8) DEFAULT NULL,
  `query_string` tinytext,
  `script_name` varchar(64) DEFAULT NULL,
  `dados_sessao` text,
  `estado` int(11) NOT NULL,
  UNIQUE KEY `idx_session_id` (`id_sessao`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessao`
--

LOCK TABLES `sessao` WRITE;
/*!40000 ALTER TABLE `sessao` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipomedida`
--

DROP TABLE IF EXISTS `tipomedida`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipomedida` (
  `codigo` int(11) NOT NULL,
  `nome` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipomedida`
--

LOCK TABLES `tipomedida` WRITE;
/*!40000 ALTER TABLE `tipomedida` DISABLE KEYS */;
INSERT INTO `tipomedida` VALUES (1,'Graus/Passos'),(2,'Tempo(ms)');
/*!40000 ALTER TABLE `tipomedida` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vw_usuario_cadastrado`
--

DROP TABLE IF EXISTS `vw_usuario_cadastrado`;
/*!50001 DROP VIEW IF EXISTS `vw_usuario_cadastrado`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_usuario_cadastrado` AS SELECT 
 1 AS `id_pessoa`,
 1 AS `nome`,
 1 AS `instituicao`,
 1 AS `equipe`,
 1 AS `data_nascimento`,
 1 AS `email`,
 1 AS `direto`,
 1 AS `equipamentopadrao`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vw_usuario_logado`
--

DROP TABLE IF EXISTS `vw_usuario_logado`;
/*!50001 DROP VIEW IF EXISTS `vw_usuario_logado`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vw_usuario_logado` AS SELECT 
 1 AS `id_pessoa`,
 1 AS `nome`,
 1 AS `equipe`,
 1 AS `id_modulo`,
 1 AS `modulo_nome`,
 1 AS `conteudo`,
 1 AS `enviou`,
 1 AS `tempo_logado`,
 1 AS `tempo_parado`,
 1 AS `equipamentopadrao`,
 1 AS `equipamentopadrao_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_usuario_cadastrado`
--

/*!50001 DROP VIEW IF EXISTS `vw_usuario_cadastrado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_usuario_cadastrado` AS select `p`.`id_pessoa` AS `id_pessoa`,`p`.`nome` AS `nome`,`p`.`instituicao` AS `instituicao`,`p`.`equipe` AS `equipe`,`p`.`data_nascimento` AS `data_nascimento`,`p`.`email` AS `email`,`p`.`direto` AS `direto`,`e`.`nome` AS `equipamentopadrao` from (`pessoa` `p` left join `equipamentos` `e` on((`e`.`id_equipamento` = `p`.`equipamento_padrao`))) where (`p`.`id_pessoa` not in (1,-(1))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vw_usuario_logado`
--

/*!50001 DROP VIEW IF EXISTS `vw_usuario_logado`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_usuario_logado` AS select `p`.`id_pessoa` AS `id_pessoa`,`p`.`nome` AS `nome`,`p`.`equipe` AS `equipe`,`m`.`id_modulo` AS `id_modulo`,`m`.`descricao` AS `modulo_nome`,coalesce(`pm`.`conteudo`,'') AS `conteudo`,`pm`.`enviou` AS `enviou`,time_to_sec(timediff(now(),`p`.`ultimo_acesso`)) AS `tempo_logado`,time_to_sec(timediff(now(),`pm`.`ultima_atualizacao`)) AS `tempo_parado`,`e`.`nome` AS `equipamentopadrao`,`e`.`id_equipamento` AS `equipamentopadrao_id` from (((`pessoa` `p` join `modulo` `m` on((`p`.`id_modulo` = `m`.`id_modulo`))) left join `pessoa_modulo` `pm` on(((`p`.`id_pessoa` = `pm`.`id_pessoa`) and (`p`.`id_modulo` = `pm`.`id_modulo`)))) left join `equipamentos` `e` on((`e`.`id_equipamento` = `p`.`equipamento_padrao`))) where ((`p`.`id_pessoa` <> 1) and (time_to_sec(timediff(now(),`p`.`ultimo_acesso`)) < 3600) and (`p`.`id_pessoa` not in (1,-(1)))) */;
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

-- Dump completed on 2016-03-02  4:50:18
