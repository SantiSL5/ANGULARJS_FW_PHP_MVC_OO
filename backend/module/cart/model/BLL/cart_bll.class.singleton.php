<?php 

class cart_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = cart_dao::getInstance();
        //$this->db = db::getInstance();
    }


    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function listCart_BLL() {
        return $this->dao->listCart();
    }
    
    public function menuCart_BLL() {
        return $this->dao->menuCart();
    }

    public function addCart_BLL() {
        return $this->dao->addCart();
    }

    public function totalCart_BLL() {
        return $this->dao->totalCart();
    }

    public function addQuant_BLL() {
        return $this->dao->addQuant();
    }

    public function substQuant_BLL() {
        return $this->dao->substQuant();
    }

    public function checkout_BLL() {
        return $this->dao->checkout();
    }
}

?>