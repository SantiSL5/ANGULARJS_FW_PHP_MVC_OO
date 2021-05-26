<?php

class controller_shop {
    function list() {
        common::loadView('top_page_shop.php', VIEW_PATH_SHOP . 'shop.html');
    }
    
    function listall() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "listall", $con);
        echo json_encode($json);
    }
    
    function details() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "details",$con);
        echo json_encode($json);
    }

    function plataforms() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "plataforms", $con);
        echo json_encode($json);
    }

    function categories() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "categories", $con);
        echo json_encode($json);
    }

    function rangeslider() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "rangeslider", $con);
        echo json_encode($json);
    }

    function showlike() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "showlike", $con);
        echo json_encode($json);
    }

    function like() {
        $json = common::loadModel(MODEL_PATH_SHOP, "shop_model", "like", $con);
        echo json_encode($json);
    }

}