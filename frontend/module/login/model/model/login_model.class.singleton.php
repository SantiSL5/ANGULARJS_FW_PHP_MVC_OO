<?php 

class login_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function register() {
        return $this->bll->register_BLL();
    }

    public function login_local() {
        return $this->bll->login_local_BLL();
    }

    public function menu_info() {
        return $this->bll->menu_info_BLL();
    }

    public function validate() {
        return $this->bll->validate_BLL();
    }

    public function validate_account() {
        return $this->bll->validate_account_BLL();
    }

    public function request_recover_password() {
        return $this->bll->request_recover_password_BLL();
    }

    public function recover_password() {
        return $this->bll->recover_password_BLL();
    }

    public function social_login() {
        return $this->bll->social_login_BLL();
    }
}

?>