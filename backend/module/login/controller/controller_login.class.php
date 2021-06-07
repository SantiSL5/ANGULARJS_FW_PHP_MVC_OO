<?php

class controller_login {    
    function register() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "register", $con);
        echo json_encode($json);
    }
    
    function login_local() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "login_local",$con);
        echo json_encode($json);
    }

    function menu_info() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "menu_info", $con);
        echo json_encode($json);
    }

    function validate() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "validate", $con);
        echo json_encode($json);
    }

    function validate_account() {
        ob_start();
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "validate_account", $con);
        echo json_encode($json);
        ob_end_clean();
        header('Location: '.SITE_PATH . 'login/');
    }

    function request_recover_password() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "request_recover_password", $con);
        echo json_encode($json);
    }

    function recover_password() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "recover_password", $con);
        echo json_encode($json);
    }

    function social_login() {
        $json = common::loadModel(MODEL_PATH_LOGIN, "login_model", "social_login", $con);
        echo json_encode($json);
    }
}