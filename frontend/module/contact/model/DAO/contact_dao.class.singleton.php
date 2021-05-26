<?php

    class contact_dao{
        static $_instance;

        private function __construct() {
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }
        
        function contact(){
            $email['type']='contact';
            $email['email']=$_POST['email'];
            $email['message']=$_POST['message'];
            $result['result']=mail::sendEmail($email);
            return $result['result'];
        }
    }