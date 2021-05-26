<?php 

class contact_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = contact_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function contact() {
        return $this->bll->contact_BLL();
    }
}

?>