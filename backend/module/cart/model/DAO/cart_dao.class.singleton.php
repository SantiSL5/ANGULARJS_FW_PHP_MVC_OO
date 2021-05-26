<?php
    class cart_dao{

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

        function listCart(){
            $token=$_POST['token'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT c.idvideogame,c.cant,v.nombre,v.precio,v.img
                FROM cart c
                INNER JOIN videogames v
                ON v.id=c.idvideogame
                WHERE c.iduser=$userid";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                if ($res) {
                    while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                        $resArray[] = $row;
                    }
                    $result['cart_products']=$resArray;
                }else {
                    $result['cart_products']=null;
                }
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function menuCart(){
            $token=$_POST['token'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT COUNT(*) AS numproducts
                FROM cart c
                INNER JOIN videogames v
                ON v.id=c.idvideogame
                WHERE c.iduser=$userid";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                if (!$res) {
                    $result['num_products']=0;
                }else{
                    $row = $res->fetch_assoc();
                    $result['num_products']=$row['numproducts'];
                }
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }


        function addQuant(){
            $token=$_POST['token'];
            $videogameid=$_POST['idproduct'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "CALL add_Quant($videogameid,$userid);";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['result']=$row['result'];
                $result['quant']=$row['quant'];
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function substQuant(){
            $token=$_POST['token'];
            $videogameid=$_POST['idproduct'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "CALL subst_Quant($videogameid,$userid);";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['result']=$row['result'];
                $result['quant']=$row['quant'];
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function totalCart(){
            $token=$_POST['token'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $totalCart=0;
                $userid=$token['userid'];
                $sql = "CALL totalCart($userid)";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['total_cart']=$row['totalCart'];
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function checkout(){
            $token=$_POST['token'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $totalCart=0;
                $userid=$token['userid'];
                $sql = "CALL order_complete($userid)";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }
    }