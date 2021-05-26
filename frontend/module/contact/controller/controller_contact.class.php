<?php
class controller_contact {
    function list() {
        common::loadView('top_page_contact.php', VIEW_PATH_CONTACT . 'contact.html');
    }

    function contact(){
        $json = common::loadModel(MODEL_PATH_CONTACT, "contact_model", "contact", $con);
        echo json_encode($json);
    }
}