<?php 

class menu_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = menu_dao::getInstance();
        //$this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_search_BLL() {
        return $this->dao->search();
    }
}

?>