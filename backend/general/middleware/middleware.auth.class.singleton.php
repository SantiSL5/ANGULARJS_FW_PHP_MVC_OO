<?php

    class middleware {
        private $jwt;
        static $_instance;

        private function __construct() {
            $this->$jwt = jwt::getInstance();
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function decode($token){
            $databaseConfig = include (SITE_ROOT . "credentials/credentials.php");
            $secret = $databaseConfig['secret'];
            $tokenjson=$this->$jwt->decode($token,$secret);
            $tokendecoded=json_decode($tokenjson,true);
            $iat=$tokendecoded['iat'];
            $exp=$tokendecoded['exp'];
            $userid=$tokendecoded['userid'];
            if ($exp>=time()) {
                $result['invalid_token']=false;
                $result['token']=$this->encode($userid);
                $result['userid']=$userid;
            }else {
                $result['invalid_token']=true;
            }
            return $result;
        }
    
        function encode($userid){
            $databaseConfig = include (SITE_ROOT . "credentials/credentials.php");
            $secret = $databaseConfig['secret'];
            ////////////////////////////////////////////////
            //https://github.com/miguelangel-nubla/JWT-PHP//
            ////////////////////////////////////////////////
            $header = '{"typ":"JWT", "alg":"HS256"}';
            $iat=time();
            $exp=time()+(60 * 60);

            if (strpos($userid, '"') !== false) {
                $payload = '{
                    "iat":'.$iat.', 
                    "exp":'.$exp.',
                    "userid":'.$userid.'
                }';
            }else {
                $payload = '{
                    "iat":'.$iat.', 
                    "exp":'.$exp.',
                    "userid":'.'"'.$userid.'"'.'
                }';
            }
            
            $result = $this->$jwt->encode($header, $payload, $secret);
            return $result;
        }
    }
?>