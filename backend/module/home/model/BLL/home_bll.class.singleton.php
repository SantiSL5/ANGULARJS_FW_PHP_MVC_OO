<?php 

class home_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = home_dao::getInstance();
        //$this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_select_all_categories_BLL() {
        return $this->dao->select_all_categories();
    }

    public function load_select_all_plataforms_BLL() {
        return $this->dao->select_all_plataforms();
    }
}

?>