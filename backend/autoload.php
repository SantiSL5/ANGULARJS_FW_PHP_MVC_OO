<?php 

//////
require ('paths.php');
//////
// spl_autoload_register(null, false);
spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php,.auth.class.singleton.php');
spl_autoload_register('loadClasses');
//////
function loadClasses($className) {
    $breakClass = explode('_', $className);
    $modelName = "";
    //////
    if (isset($breakClass[1])) {
        $modelName = strtoupper($breakClass[1]);
    }// end_if
    
    //////
    if (file_exists(SITE_ROOT . 'module/' . $breakClass[0] . '/model/'. $modelName . '/' . $className . '.class.singleton.php')) {
        set_include_path(SITE_ROOT . 'module/' . $breakClass[0] . '/model/' . $modelName.'/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'module/' . $breakClass[0] . '/model/' . $className . '.class.singleton.php')) {
        set_include_path(SITE_ROOT . 'module/' . $breakClass[0] . '/model/' . $className . '.class.singleton.php'.'/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.class.singleton.php')){
        set_include_path(SITE_ROOT . 'model/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.class.php')){
        set_include_path(SITE_ROOT . 'model/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'general/classes/' . $className . '.class.singleton.php')) {
        set_include_path(SITE_ROOT . 'general/classes/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'general/middleware/' . $className . '.auth.class.singleton.php')) {
        set_include_path(SITE_ROOT . 'general/middleware/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'general/utils/' . $className . '.inc.php')) {
        set_include_path(SITE_ROOT . 'general/utils/');
        spl_autoload($className);
    }else if (file_exists(SITE_ROOT . 'model/' . $className . '.php')) {
        set_include_path(SITE_ROOT . 'model/');
        spl_autoload($className);
    }// end_else
}// end_loadClasses

?>