<?php

class controller_cart {
    function list() {
        common::loadView('top_page_cart.php', VIEW_PATH_CART . 'cart.html');
    }

    function listCart() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "listCart", $con);
        echo json_encode($json);
    }
    
    function menuCart() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "menuCart",$con);
        echo json_encode($json);
    }

    function addCart() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "addCart",$con);
        echo json_encode($json);
    }

    function totalCart() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "totalCart", $con);
        echo json_encode($json);
    }

    function addQuant() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "addQuant",$con);
        echo json_encode($json);
    }

    function substQuant() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "substQuant", $con);
        echo json_encode($json);
    }

    function checkout() {
        $json = common::loadModel(MODEL_PATH_CART, "cart_model", "checkout", $con);
        echo json_encode($json);
    }
}