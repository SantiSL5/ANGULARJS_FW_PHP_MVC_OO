<?php 

class cart_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = cart_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    
    public function listCart() {
        return $this->bll->listCart_BLL();
    }
    
    public function menuCart() {
        return $this->bll->menuCart_BLL();
    }

    public function addCart() {
        return $this->bll->addCart_BLL();
    }

    public function totalCart() {
        return $this->bll->totalCart_BLL();
    }

    public function addQuant() {
        return $this->bll->addQuant_BLL();
    }

    public function substQuant() {
        return $this->bll->substQuant_BLL();
    }

    public function checkout() {
        return $this->bll->checkout_BLL();
    }
}

?>