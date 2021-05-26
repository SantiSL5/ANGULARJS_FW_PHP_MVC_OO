<?php
    class login_dao{
        private $middleware;
        static $_instance;

        private function __construct() {
            $this->$middleware = middleware::getInstance();
        }

        public static function getInstance() {
            if(!(self::$_instance instanceof self)){
                self::$_instance = new self();
            }
            return self::$_instance;
        }

        function register(){
            $username=$_POST['username'];
            $email=$_POST['email'];
            $pass=$_POST['password'];
            $type="client";
            $check=$this->validate($username,$email);
            if ($check['username'] && $check['email']) {
                $id_user=$this->generateid($email);
                $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
                $hashavatar= md5( strtolower( trim( $email ) ) );
                $avatar="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";
                $sql ="INSERT INTO users (id, username, email,password,type,avatar,validate) VALUES ('$id_user','$username','$email','$hashed_pass','$type', '$avatar', 'false')";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                connect::close($conexion);
                $email_data['type']='validate';
                $email_data['email']=$_POST['email'];
                $token=$this->$middleware->encode($id_user);
                $email_data['token']="http://localhost/login/validate_account/$token";
                $result['result']=mail::sendEmail($email_data);
                $check['result']=$result['result'];
                $check[0]=true;
            }else{
                $check[0]=false;
            }
            return $check;
        }

        function login_local(){
            $username_check=$_POST['username_login'];
            $pass_check=$_POST['password_login'];
            $sql = "SELECT * FROM users WHERE username='$username_check' AND id LIKE 'LU_%'";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            $row = $res->fetch_assoc();
            $userid=$row['id'];
            $username=$row['username'];
            $password=$row['password'];
            $validate=$row['validate'];
            if ($username==$username_check) {
                if ($validate=='false') {
                    $result['validate']=false;
                }else {
                    if (password_verify($pass_check, $password)) {
                        $result['token'] = $this->$middleware->encode($userid);
                        $result['correct_password']=true;
                        $result['username_created']=true;
                        $result['validate']=true;
                    }else{
                        $result['correct_password']=false;
                        $result['username_created']=true;
                        $result['validate']=true;
                    }
                }
            } else {
                $result['username_created']=false;
                $result['correct_password']=false;
            }
            connect::close($conexion);
            return $result;
        }

        function menu_info(){
            $token=$_POST['token'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT * FROM users WHERE id='$userid'";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['invalid_token']=false;
                $result['username']=$row['username'];
                $result['avatar']=$row['avatar'];
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function valida_user($user) {
            $sql = "SELECT * FROM users WHERE username='$user' AND id LIKE 'LU_%'";
    
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            $row = $res->fetch_assoc();
            $result=$row['username'];
            
            if ($result==$user) {
                return false;
            } else {
                return true;
            }
        }
    
        function valida_email($email) {
            $sql = "SELECT * FROM users WHERE email='$email'";
    
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            $row = $res->fetch_assoc();
            $result=$row['email'];
            
            if ($result==$email) {
                return false;
            } else {
                return true;
            }
        }

        function valida_email_recover($email) {
            $sql = "SELECT * FROM users WHERE email='$email' AND id LIKE 'LU%'";
    
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            $row = $res->fetch_assoc();
            $result=$row['email'];
            
            if ($result==$email) {
                $check['email']=true;
                $check['id']=$row['id'];
            } else {
                $check['email']=false;
            }

            return $check;
        }
        
        function generateid($email){
            $id_user=uniqid($email,true);
            $id_user=str_replace($email, "LU_", $id_user);
            $id_user=str_replace(".", "", $id_user);
            return $id_user;
        }

        function validate($user,$email){
            $check['username'] = $this->valida_user($user);
            $check['email'] = $this->valida_email($email);
            return $check;
        }

        public function validate_account() {
            $token=$_GET['arg'];
            if ($token) {
                $v_token=$this->$middleware->decode($token);
                if ($v_token['invalid_token'] == true) {
                    $id_user=$v_token['userid'];
                    $sql = "SELECT * FROM users WHERE id='$id_user'";
                    $sql2 = "DELETE FROM users WHERE id='$id_user'";
                    $conexion = connect::con();
                    $res = mysqli_query($conexion, $sql);
                    if ($res) {
                        $row = $res->fetch_assoc();
                        if ($row['validate']=='false') {
                            $res2 = mysqli_query($conexion, $sql2);
                        }
                    }
                    connect::close($conexion);
                    setcookie("validate", "Token_invalido", time() + 60, '/');
                }else {
                    $id_user=$v_token['userid'];
                    $sql = "SELECT * FROM users WHERE id='$id_user'";
                    $sql2 = "UPDATE users SET validate='true' WHERE id='$id_user'";
                    $conexion = connect::con();
                    $res = mysqli_query($conexion, $sql);
                    if ($res) {
                        $row = $res->fetch_assoc();
                        if ($row['validate']=='false') {
                            $res2 = mysqli_query($conexion, $sql2);
                            setcookie("validate", "Cuenta_validada", time() + 60, '/');
                        }else if ($row['validate']=='true'){
                            setcookie("validate", "Esta_cuenta_ya_ha_sido_validada", time() + 60, '/');
                        }
                    }
                    connect::close($conexion);
                }
            }
        }

        public function request_recover_password(){
            $email=$_POST['email'];
            $check=$this->valida_email_recover($email);
            if ($check['email']) {
                $email_data['type']='recover_password';
                $email_data['email']=$_POST['email'];
                $token=$this->$middleware->encode($check['id']);
                $email_data['token']="http://localhost/login/listrecover/$token";
                $result['result']=mail::sendEmail($email_data);
                $check[0]=true;
            }else{
                $check[0]=false;
            }
            return $check;
        }

        public function recover_password(){
            $password=$_POST['password'];
            $token=$_POST['token'];
            if ($token) {
                $v_token=$this->$middleware->decode($token);
                // var_dump($v_token);
                if ($v_token['invalid_token']) {
                    $result[0]=false;
                    $result['invalid_token']=true;
                    connect::close($conexion);
                }else {
                    $id_user=$v_token['userid'];
                    $sql = "SELECT * FROM users WHERE id='$id_user'";
                    $hashed_pass = password_hash($password, PASSWORD_DEFAULT);
                    $conexion = connect::con();
                    $res = mysqli_query($conexion, $sql);
                    if ($res) {
                        $sql2 = "UPDATE users SET password='$hashed_pass' WHERE id='$id_user'";
                        $res2 = mysqli_query($conexion, $sql2);
                        $result[0]=true;
                        $result['invalid_token']=false;
                    }else {
                        $result[0]=false;
                        $result['invalid_token']=false;
                    }
                    connect::close($conexion);
                }
                $result['token']=true;
            }else {
                $result[0]=false;
                $result['token']=false;
            }   
            return $result;
        }

        public function social_login(){
            $type=$_POST['type'];
            $id_user=$_POST['id'];
            $username=$_POST['username'];
            $email=$_POST['email'];
            $photo=$_POST['photo'];
            if ($type=='GU') {
                $sql = "SELECT * FROM users WHERE id='GU_$id_user'";
            }elseif ($type='GHU') {
                $sql = "SELECT * FROM users WHERE id='GHU_$id_user'";
            }
            if ($this->valida_email($email)) {
                $email_check=true;
            }else {
                $email_check=false;
            }
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            if ($res) {
                $row = $res->fetch_assoc();
                if ($row) {
                    $userid=$row['id'];
                    $result['token']=$this->$middleware->encode($userid);
                    $result['operation']='login';
                }else {
                    if ($email_check==true) {
                        $result['email']=false;
                        $type_u='client';
                        $userid="$type"."_"."$id_user";
                        $sql2 ="INSERT INTO users (id, username, email,type,avatar) VALUES ('$userid','$username','$email','$type_u', '$photo')";
                        $res2 = mysqli_query($conexion, $sql2);
                        $result['token']=$this->$middleware->encode($userid);
                        $result['email']=true;
                        $result['operation']='register';
                    }else {
                        $result['operation']='email-in-use';
                        $result['email']=false;
                    }
                }
            }else {
                if ($email_check==true) {
                    $result['email']=false;
                    $type_u='client';
                    $userid="$type"."_"."$id_user";
                    $sql2 ="INSERT INTO users (id, username, email,type,avatar) VALUES ('$userid','$username','$email','$type_u', '$photo')";
                    $res2 = mysqli_query($conexion, $sql2);
                    $result['token']=$this->$middleware->encode($userid);
                    $result['email']=true;
                    $result['operation']='register';
                }else {
                    $result['operation']='email-in-use';
                    $result['email']=false;
                }
            }
            connect::close($conexion);
            return $result;
        }
    }