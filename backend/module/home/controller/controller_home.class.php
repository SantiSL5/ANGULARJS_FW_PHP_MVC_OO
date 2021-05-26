<?php
class controller_home {
    // function list() {
    //     common::loadView('top_page_home.php', VIEW_PATH_HOME . 'home.html');
    // }
    
    function carousel() {
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_select_all_categories", $con);
    
        echo json_encode($json);
    }

    function plataforms() {
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_select_all_plataforms", $con);
    
        echo json_encode($json);
    }
}