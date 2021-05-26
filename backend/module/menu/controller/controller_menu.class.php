<?php
class controller_menu {
    function autoComplete(){
        $json = common::loadModel(MODEL_PATH_MENU, "menu_model", "load_search",$con);
        echo json_encode($json);
    }
}