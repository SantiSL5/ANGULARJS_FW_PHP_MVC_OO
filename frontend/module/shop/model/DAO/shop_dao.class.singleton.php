<?php
    class shop_dao {
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

        function listall(){
            $minrange=$_POST['minrange'];
            $maxrange=$_POST['maxrange'];
            $plataform=$_POST['plataform'];
            $age=$_POST['age'];
            $genero=$_POST['genero'];
            $nombre=$_POST['search'];
            $sql2 = "SELECT COUNT(id) AS count FROM videogames WHERE plataforma LIKE '%$plataform%' AND clasificacion LIKE '%$age%' AND generos LIKE '%$genero%' AND nombre LIKE '$nombre' ORDER BY views";
            $sql = "SELECT * FROM videogames WHERE precio BETWEEN $minrange AND $maxrange AND plataforma LIKE '%$plataform%' AND clasificacion LIKE '%$age%' AND generos LIKE '%$genero%' AND nombre LIKE '%$nombre%' ORDER BY views DESC";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            $res2 =mysqli_query($conexion, $sql2);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            while($row2 = $res2->fetch_array(MYSQLI_ASSOC)) {
                $resArray2[] = $row2;
            }

            if (!$resArray) {
                return $resArray2;
            }else{

                $resArraytotal[] = array_merge($resArray2,$resArray);  
                return $resArraytotal[0];
            }
        }

        function details(){
            $videogame=$_POST['id'];
            $sql = "SELECT * FROM videogames WHERE id='$videogame'";
            $sql2 = "UPDATE videogames SET views=views+1 WHERE id='$videogame'";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            mysqli_query($conexion, $sql2);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }

        function plataforms(){
            $sql = "SELECT * FROM plataform";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }

        function categories(){
            $sql = "SELECT * FROM category";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }

        function rangeslider(){
            $sql = "SELECT MAX(precio) maxim, MIN(precio) minim FROM videogames;";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }

        function showlike(){
            $token=$_POST['token'];
            $idproduct=$_POST['idproduct'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT iduser,idvideogame
                FROM favorites
                WHERE iduser=$userid && idvideogame=$idproduct";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                if (!$res) {
                    $result['like']=false;
                }else{
                    $row = $res->fetch_assoc();
                    if ($row['iduser']==$userid && $row['idvideogame']==$idproduct) {
                        $result['like']=true;
                    }else {
                        $result['like']=false;
                    }
                }
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function like(){
            $token=$_POST['token'];
            $idproduct=$_POST['idproduct'];
            $token=$this->$middleware->decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT COUNT(*) AS 'check'
                FROM favorites 
                WHERE iduser=$userid && idvideogame=$idproduct";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                if ($row['check']==0) {
                    // echo("user:".$iduser."pro: ".$idproduct);
                    $sql2="INSERT INTO favorites (iduser, idvideogame) VALUES ($userid,$idproduct)";
                    $result['like']=true;
                }else {
                    $sql2="DELETE FROM favorites WHERE iduser=$userid && idvideogame=$idproduct";
                    $result['like']=false;
                }
                $res2 = mysqli_query($conexion, $sql2);
                $result['invalid_token']=false;
                $result['token']=$this->$middleware->encode($userid);
                connect::close($conexion);
            }
            return $result;
        }
        // function viewup($videogame) {
            
        //     $conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        // }
    }