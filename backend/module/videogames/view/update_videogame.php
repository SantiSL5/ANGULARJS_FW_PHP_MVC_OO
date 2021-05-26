<div id="contenido">
    <form autocomplete="on" method="POST" name="update_videogame" id="update_videogame">
        <h1>Modificar Videojuego</h1>
        <table border='0'>

            <tr>
                <td>ID: </td>
                <td><input type="text" id="id" name="id" placeholder="id" value="<?php echo $videogame['id'];?>" readonly/></td>
                <td><font color="red">
                    <span id="error_code" class="error">
                        <?php
                            echo "$error_code";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Codigo: </td>
                <td><input type="text" id="code" name="code" placeholder="codigo" value="<?php echo $videogame['code'];?>"/></td>
                <td><font color="red">
                    <span id="error_code" class="error">
                        <?php
                            echo "$error_code";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            
            <tr>
                <td>Nombre: </td>
                <td><input type="text" id="nombre" name="nombre" placeholder="nombre" value="<?php echo $videogame['nombre'];?>"/></td>
                <td><font color="red">
                    <span id="error_nombre" class="error">
                        <?php
                            echo "$error_nombre";
                        ?>
                    </span>
                </font></font></td>
            </tr>
        
            <tr>
                <td>Companyia: </td>
                <td><input type="text" id="companyia" name="companyia" placeholder="companyia" value="<?php echo $videogame['companyia'];?>"/></td>
                <td><font color="red">
                    <span id="error_companyia" class="error">
                        <?php
                            echo "$error_companyia";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            
            <tr>
                <td>Fecha salida: </td>
                <td><input type="text" id="fecha" name="fecha_salida" placeholder="DD-MM-YYYY" value="<?php echo $videogame['fecha_salida'];?>"/></td>
                <td><font color="red">
                    <span id="error_fecha_salida" class="error">
                        <?php
                            echo "$error_fecha_salida";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Clasificacion</td>
                <td><select id="clasificacion" name="clasificacion" placeholder="clasificacion">
                    <?php
                        if($videogame['clasificacion']==="3"){
                    ?>
                        <option value="3" selected>3</option>
                        <option value="7">7</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    <?php
                        }elseif($videogame['clasificacion']==="7"){
                    ?>
                        <option value="3">3</option>
                        <option value="7"selected>7</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    <?php
                        }elseif($videogame['clasificacion']==="12"){
                    ?>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="12"selected>12</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                    <?php
                        }elseif($videogame['clasificacion']==="16"){
                    ?>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="12">12</option>
                        <option value="16"selected>16</option>
                        <option value="18">18</option>
                    <?php
                        }elseif($videogame['clasificacion']==="18"){
                    ?>
                        <option value="3">3</option>
                        <option value="7">7</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="18"selected>18</option>
                    <?php
                        }
                    ?>
                    </select></td>
                <td><font color="red">
                    <span id="error_clasificacion" class="error">
                        <?php
                            echo "$error_clasificacion";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            <tr>
                <td>Estado: </td>
                <td>
                    <?php
                        if ($videogame['estado']==="Nuevo"){
                    ?>
                        <input type="radio" id="estado" name="estado" placeholder="estado" value="Nuevo" checked/>Nuevo
                        <input type="radio" id="estado" name="estado" placeholder="estado" value="Segunda Mano"/>Segunda Mano</td>
                    <?php    
                        }else{
                    ?>
                        <input type="radio" id="estado" name="estado" placeholder="estado" value="Nuevo"/>Nuevo
                        <input type="radio" id="estado" name="estado" placeholder="estado" value="Segunda Mano" checked/>Segunda Mano</td>
                    <?php   
                        }
                    ?>
                <td><font color="red">
                    <span id="error_estado" class="error">
                        <?php
                            echo "$error_estado";
                        ?>
                    </span>
                </font></font></td>
            </tr>
            
            <tr>
                <td>Generos: </td>
                <?php
                    $afi=explode(":", $videogame['generos']);
                ?>
                <td>
                    <?php
                        $busca_array=in_array("Accion", $afi);
                        if($busca_array){
                    ?>
                        Accion <input type="checkbox" id="generos[]" name="generos[]" value="Accion" checked>
                    <?php
                        }else{
                    ?>
                        Accion <input type="checkbox" id="generos[]" name="generos[]" value="Accion">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Shooter", $afi);
                        if($busca_array){
                    ?>
                        Shooter  <input type="checkbox" id="generos[]" name="generos[]" value="Shooter" checked>
                    <?php
                        }else{
                    ?>
                        Shooter  <input type="checkbox" id="generos[]" name="generos[]" value="Shooter">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Estrategia", $afi);
                        if($busca_array){
                    ?>
                        Estrategia <input type="checkbox" id="generos[]" name="generos[]" value="Estrategia" checked>
                    <?php
                        }else{
                    ?>
                        Estrategia <input type="checkbox" id="generos[]" name="generos[]" value="Estrategia">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Simulacion", $afi);
                        if($busca_array){
                    ?>
                        Simulacion   <input type="checkbox" id="generos[]" name="generos[]" value="Simulacion" checked>
                    <?php
                        }else{
                    ?>
                        Simulacion   <input type="checkbox" id="generos[]" name="generos[]" value="Simulacion">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Deporte", $afi);
                        if($busca_array){
                    ?>
                        Deporte   <input type="checkbox" id="generos[]" name="generos[]" value="Deporte" checked>
                    <?php
                        }else{
                    ?>
                        Deporte   <input type="checkbox" id="generos[]" name="generos[]" value="Deporte">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Carreras", $afi);
                        if($busca_array){
                    ?>
                        Carreras   <input type="checkbox" id="generos[]" name="generos[]" value="Carreras" checked>
                    <?php
                        }else{
                    ?>
                        Carreras   <input type="checkbox" id="generos[]" name="generos[]" value="Carreras">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Aventura", $afi);
                        if($busca_array){
                    ?>
                        Aventura   <input type="checkbox" id="generos[]" name="generos[]" value="Aventura" checked>
                    <?php
                        }else{
                    ?>
                        Aventura   <input type="checkbox" id="generos[]" name="generos[]" value="Aventura">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Sandbox", $afi);
                        if($busca_array){
                    ?>
                        Sandbox   <input type="checkbox" id="generos[]" name="generos[]" value="Sandbox" checked>
                    <?php
                        }else{
                    ?>
                        Sandbox   <input type="checkbox" id="generos[]" name="generos[]" value="Sandbox">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Musica", $afi);
                        if($busca_array){
                    ?>
                        Musica   <input type="checkbox" id="generos[]" name="generos[]" value="Musica" checked>
                    <?php
                        }else{
                    ?>
                        Musica   <input type="checkbox" id="generos[]" name="generos[]" value="Musica">
                    <?php
                        }
                    ?>
                    <?php
                        $busca_array=in_array("Puzzle", $afi);
                        if($busca_array){
                    ?>
                        Puzzle   <input type="checkbox" id="generos[]" name="generos[]" value="Puzzle">
                    <?php
                        }else{
                    ?>
                        Puzzle   <input type="checkbox" id="generos[]" name="generos[]" value="Puzzle">
                    <?php
                        }
                    ?>
                </td>
                <td><font color="red">
                    <span id="error_generos" class="error">
                        <?php
                            echo "$error_generos";
                        ?>
                    </span>
                </font></font></td>
            </tr>

            
            <tr>
                <td><button name="update" value="update" id="btn_update" onclick="return validate(2)">Actualizar Videojuego</button></td>
                <td align="right"><a href="index.php?page=controller_videogame&op=list">Volver</a></td>
            </tr>
        </table>
    </form>
</div>