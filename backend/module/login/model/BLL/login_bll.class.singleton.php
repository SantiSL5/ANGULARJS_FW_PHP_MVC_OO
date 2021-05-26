<?php 

class login_bll {
    private $dao;
    // private $db;
    static $_instance;

    private function __construct() {
        $this->dao = login_dao::getInstance();
        //$this->db = db::getInstance();
    }


    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function register_BLL() {
        return $this->dao->register();
    }
    
    public function login_local_BLL() {
        return $this->dao->login_local();
    }

    public function menu_info_BLL() {
        return $this->dao->menu_info();
    }
    
    public function validate_BLL() {
        return $this->dao->validate_account();
    }

    public function validate_account_BLL() {
        return $this->dao->validate_account();
    }

    public function request_recover_password_BLL() {
        return $this->dao->request_recover_password();
    }

    public function recover_password_BLL() {
        return $this->dao->recover_password();
    }

    public function social_login_BLL() {
        return $this->dao->social_login();
    }
}

?>