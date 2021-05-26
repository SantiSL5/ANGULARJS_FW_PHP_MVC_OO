<?php

    function valida_code($code) {
        $sql = "SELECT * FROM videogames WHERE code='$code'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        $row = $res->fetch_assoc();
        $result=$row['code'];
        
        if ($result==$code) {
            return false;
        } else {
            return true;
        }
    }

    function validate(){
        $check = true;

        $code = $_POST['code'];

        $v_code = valida_code($code);

        if ($v_code) {
            $error_code = " ";
        } else {
            echo("<script>alert('El codigo ya existe, introduce otro codigo')</script>");
            $check = false;
        }

        return $check;
    }