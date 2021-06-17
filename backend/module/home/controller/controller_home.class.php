<?php
class controller_home {
    function carousel() {
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_select_all_categories", $con);
        echo json_encode($json);
    }

    function plataforms() {
        $json = common::loadModel(MODEL_PATH_HOME, "home_model", "load_select_all_plataforms", $con);
        echo json_encode($json);
    }
}