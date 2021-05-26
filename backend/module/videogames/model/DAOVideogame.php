<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");
    
	class DAOVideogame{
		function insert_videogame($datos){
			$first=true;
			$code=$datos["code"];
			$nombre=$datos["nombre"];
        	$companyia=$datos["companyia"];
        	$fecha_salida=$datos["fecha_salida"];
        	$clasificacion=$datos["clasificacion"];
        	$estado=$datos["estado"];
        	foreach ($datos["generos"] as $indice) {
				if($first==true){
					$generos=$generos."$indice";
					$first=false;
				}else {
					$generos=$generos.":$indice";
				}
        	}
        	$sql = " INSERT INTO videogames (code, nombre, companyia, fecha_salida, clasificacion, estado, generos)"
        		. " VALUES ('$code', '$nombre', '$companyia', '$fecha_salida', '$clasificacion', '$estado', '$generos')";

            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
			return $res;
		}
		
		function select_all_videogame(){
			$sql = "SELECT * FROM videogames ORDER BY nombre ASC";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
		}
		
		function select_videogame($videogame){
			$sql = "SELECT * FROM videogames WHERE id='$videogame'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql)->fetch_object();
            connect::close($conexion);
            return $res;
		}
		
		function update_videogame($datos){
			$first=true;
			$id=$datos["id"];
			$code=$datos["code"];
			$nombre=$datos["nombre"];
        	$companyia=$datos["companyia"];
        	$fecha_salida=$datos["fecha_salida"];
        	$clasificacion=$datos["clasificacion"];
        	$estado=$datos["estado"];
        	foreach ($datos["generos"] as $indice) {
				if($first==true){
					$generos=$generos."$indice";
					$first=false;
				}else {
					$generos=$generos.":$indice";
				}
        	}
        	
        	$sql = " UPDATE videogames SET code='$code', nombre='$nombre', companyia='$companyia', fecha_salida='$fecha_salida', clasificacion='$clasificacion',"
        		. " estado='$estado', generos='$generos' WHERE id='$id'";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
			return $res;
		}
		
		function delete_videogame($videogame){
			$sql = "DELETE FROM videogames WHERE id='$videogame'";
			
			$conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
		}
	}