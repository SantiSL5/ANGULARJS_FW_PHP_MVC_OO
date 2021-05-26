<?php 

class shop_model {
    private $bll;
    static $_instance;

    private function __construct() {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function listall() {
        return $this->bll->listall_BLL();
    }

    public function details() {
        return $this->bll->details_BLL();
    }

    public function plataforms() {
        return $this->bll->plataforms_BLL();
    }

    public function categories() {
        return $this->bll->categories_BLL();
    }

    public function rangeslider() {
        return $this->bll->rangeslider_BLL();
    }

    public function showlike() {
        return $this->bll->showlike_BLL();
    }

    public function like() {
        return $this->bll->like_BLL();
    }
}

?>