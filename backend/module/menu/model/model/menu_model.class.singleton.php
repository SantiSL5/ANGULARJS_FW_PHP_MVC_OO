<?php 

class menu_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = menu_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_search() {
        return $this->bll->load_search_BLL();
    }
}

?>