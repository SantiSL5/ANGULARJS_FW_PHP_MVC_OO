<?php
//////
class common {
    function loadError() {
        require_once (VIEW_PATH_INC . 'top_page.php');
        require_once (VIEW_PATH_INC . 'menu.html');
        require_once (VIEW_PATH_INC . '404.html');
        require_once (VIEW_PATH_INC . 'footer.html');
    }// end_loadError
    
    function loadView($topPage, $view) {
        $topPage = VIEW_PATH_INC . $topPage;
        //////
        if ((file_exists($topPage)) && (file_exists($view))) {
            require_once ($topPage);
            require_once (VIEW_PATH_INC . 'menu.html');
            require_once ($view);
            require_once (VIEW_PATH_INC . 'footer.html');
        }else {
            self::loadError();
        }// end_else
    }// end_loadView
    
    function loadModel($model_path, $model_name, $function, $args = null) {
        $model = $model_path . $model_name . '.class.singleton.php';
        if (file_exists($model)) {
            include_once($model);
            $modelClass = $model_name;
            
            if (!method_exists($modelClass, $function)){
                throw new Exception();
            }

            $obj = $modelClass::getInstance();
            return call_user_func(array($obj, $function),$arrArgument);
            
        } else {
            throw new Exception();
        }
    }// end_accessModel

    function friendlyURL($url) {
        $link = "";
        if (URL_FRIENDLY) {
            $url = explode("&", str_replace("?", "", $url));
            foreach ($url as $key => $value) {
                $aux = explode("=", $value);
                $link .=  $aux[1]."/";
            }
        } else {
            $link = "index.php?" . $url;
        }// end_else
        return SITE_PATH . $link;
    }// end_friendlyURL
}// end_common
