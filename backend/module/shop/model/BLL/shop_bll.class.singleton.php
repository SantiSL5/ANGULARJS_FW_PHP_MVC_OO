<?php 

class shop_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = shop_dao::getInstance();
        //$this->db = db::getInstance();
    }


    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function listall_BLL() {
        return $this->dao->listall();
    }

    public function details_BLL() {
        return $this->dao->details();
    }

    public function plataforms_BLL() {
        return $this->dao->plataforms();
    }

    public function categories_BLL() {
        return $this->dao->categories();
    }

    public function rangeslider_BLL() {
        return $this->dao->rangeslider();
    }

    public function showlike_BLL() {
        return $this->dao->showlike();
    }

    public function like_BLL() {
        return $this->dao->like();
    }
}

?>