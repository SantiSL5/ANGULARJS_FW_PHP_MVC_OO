<?php 

class home_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = home_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_select_all_categories() {
        return $this->bll->load_select_all_categories_BLL();
    }

    public function load_select_all_plataforms() {
        return $this->bll->load_select_all_plataforms_BLL();
    }
}

?>