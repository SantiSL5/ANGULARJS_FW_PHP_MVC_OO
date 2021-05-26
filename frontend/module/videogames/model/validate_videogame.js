function validate_code(texto){
    if (texto.length > 0){
        var reg=/\d{3}[a-zA-Z]{6}/;
        return reg.test(texto);
    }
    return false;
}

function validate_nombre(texto){
    if (texto.length > 0){
        var reg=/^[a-zA-Z]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_companyia(texto){
    if (texto.length > 0){
        var reg=/^[a-zA-Z]*$/;
        return reg.test(texto);
    }
    return false;
}

function validate_estado(texto){
    var i;
    var ok=0;
    for(i=0; i<texto.length;i++){
        if(texto[i].checked){
            ok=1
        }
    }
 
    if(ok==1){
        return true;
    }
    if(ok==0){
        return false;
    }
}

function validate_fecha(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}

function validate_clasificacion(texto){
    if (texto.length > 0){
        return true;
    }
    return false;
}

function validate_generos(array){
    var i;
    var ok=0;
    for(i=0; i<array.length;i++){
        if(array[i].checked){
            ok++;
        }
    }
 
    if(ok>=3){
        return true;
    }
    if(ok==0){
        return false;
    }
}

function validate(option){
    var check=true;
    
    var v_code=document.getElementById('code').value;
    var v_nombre=document.getElementById('nombre').value;
    var v_companyia=document.getElementById('companyia').value;
    var v_estado=document.getElementsByName('estado');
    var v_fecha_salida=document.getElementById('fecha').value;
    var v_clasificacion=document.getElementById('clasificacion');
    var v_generos=document.getElementsByName('generos[]');
    
    var r_code=validate_code(v_code);
    var r_nombre=validate_nombre(v_nombre);
    var r_companyia=validate_companyia(v_companyia);
    var r_estado=validate_estado(v_estado);
    var r_fecha_salida=validate_fecha(v_fecha_salida);
    var r_clasificacion=validate_clasificacion(v_clasificacion);
    var r_generos=validate_generos(v_generos);
    
    if(!r_code){
        document.getElementById('error_code').innerHTML = " * El codigo introducido no es valido (3 números 6 letras)";
        check=false;
    }else{
        document.getElementById('error_code').innerHTML = "";
    }
    if(!r_nombre){
        document.getElementById('error_nombre').innerHTML = " * El nombre introducido no es valido";
        check=false;
    }else{
        document.getElementById('error_nombre').innerHTML = "";
    }
    if(!r_companyia){
        document.getElementById('error_companyia').innerHTML = " * La companyia introducida no es valida";
        check=false;
    }else{
        document.getElementById('error_companyia').innerHTML = "";
    }
    if(!r_estado){
        document.getElementById('error_estado').innerHTML = " * No has seleccionado ningun estado";
        check=false;
    }else{
        document.getElementById('error_estado').innerHTML = "";
    }
    if(!r_fecha_salida){
        document.getElementById('error_fecha_salida').innerHTML = " * No has introducido ninguna fecha de salida";
        check=false;
    }else{
        document.getElementById('error_fecha_salida').innerHTML = "";
    }
    if(!r_clasificacion){
        document.getElementById('error_clasificacion').innerHTML = " * No has seleccionado ninguna clasificacion";
        check=false;
    }else{
        document.getElementById('error_clasificacion').innerHTML = "";
    }
    if(!r_generos){
        document.getElementById('error_generos').innerHTML = " * No has seleccionado ningun genero o has seleccionado menos de 3";
        check=false;
    }else{
        document.getElementById('error_generos').innerHTML = "";
    }

    if (check==true) {
        if (option==1) {
            alta_videogame=document.getElementById('alta_videogame');
            button_create=document.getElementById('btn_create');
            document.btn_create.value="create";
            document.alta_videogame.action="?page=controller_videogame&op=create";
            document.alta_videogame.submit();
        }
        if (option==2) {
            alta_videogame=document.getElementById('update_videogame');
            button_update=document.getElementById('btn_update');
            document.btn_update.value="update";
            document.alta_videogame.action="?page=controller_videogame&op=update";
            document.alta_videogame.submit();
        }
    }else{
        return check;
    }
}