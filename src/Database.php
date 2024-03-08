<?php
//Database connector for establishing middleware

namespace Acme;

use PDO;
use PDOException;
class Database {
    private $host = "mysql27.mydevil.net";
    private $db_name = "m1415_cpt";
    private $username = "m1415_oze";
    private $password = "6Uq_:.Bx:dZKTKW90Ascu&6uqc39Q5";
    private static $conn;

    private function __construct() {
        try {
            self::$conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            self::$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
    }

    public static function getConnection() {
        if (self::$conn === null) {
            new Database();
        }
        return self::$conn;
    }
}