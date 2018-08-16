/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `cSessionInfo`;
CREATE TABLE `cSessionInfo` (
  `open_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `uuid` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skey` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_visit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `session_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_info` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`open_id`),
  KEY `openid` (`open_id`) USING BTREE,
  KEY `skey` (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='会话管理用户信息';

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `cbook` ( 
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `isbn` varchar(20) NOT NULL, 
    `openid` varchar(50) NOT NULL, 
    `title` varchar(100) NOT NULL, 
    `image` varchar(100) DEFAULT NULL, 
    `alt` varchar(100) NOT NULL, 
    `publisher` varchar(100) NOT NULL, 
    `summary` varchar(1000) NOT NULL, 
    `price` varchar(100) DEFAULT NULL, 
    `rate` float DEFAULT NULL, 
    `tags` varchar(100) DEFAULT NULL, 
    `author` varchar(100) DEFAULT NULL, 
    `count` int(11) DEFAULT '0', 
    PRIMARY KEY (`id`) 
) 
ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

CREATE table cComment(
    id int not null auto_increment PRIMARY KEY,
    openid varchar(100) not null,
    bookid varchar(10) not null,
    comment varchar(200) not null,
    phone varchar(50),
    location VARCHAR(50)
)
ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;