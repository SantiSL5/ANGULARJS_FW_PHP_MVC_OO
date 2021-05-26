<div id="contenido">
<!-- onsubmit="return validate(); -->
    <form autocomplete="off" method="POST" name="alta_videogame" id="alta_videogame">
        <h1>Videojuego nuevo</h1>
        <table border='0'>
            <tr>
                <td>Codigo: </td>
                <td><input type="text" id="code" name="code" placeholder="codigo" value=""/></td>
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
                <td><input type="text" id="nombre" name="nombre" placeholder="nombre" value=""/></td>
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
                <td><input type="text" id="companyia" name="companyia" placeholder="companyia" value=""/></td>
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
                <td><input type="text" id="fecha" name="fecha_salida" placeholder="DD-MM-YYYY" value=""/></td>
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
                    <option value="3">3</option>
                    <option value="7">7</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="18">18</option>
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
                <td><input type="radio" id="estado" name="estado" placeholder="estado" value="Nuevo"/>Nuevo
                    <input type="radio" id="estado" name="estado" placeholder="estado" value="Segunda Mano"/>Segunda Mano</td>
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
                <td>
                    Accion <input type="checkbox" id="generos[]" name="generos[]" value="Accion">
                    Shooter  <input type="checkbox" id="generos[]" name="generos[]" value="Shooter">
                    Estrategia <input type="checkbox" id="generos[]" name="generos[]" value="Estrategia">
                    Simulacion   <input type="checkbox" id="generos[]" name="generos[]" value="Simulacion">
                    Deporte   <input type="checkbox" id="generos[]" name="generos[]" value="Deporte">
                    Carreras   <input type="checkbox" id="generos[]" name="generos[]" value="Carreras">
                    Aventura   <input type="checkbox" id="generos[]" name="generos[]" value="Aventura">
                    Sandbox   <input type="checkbox" id="generos[]" name="generos[]" value="Sandbox">
                    Musica   <input type="checkbox" id="generos[]" name="generos[]" value="Musica">
                    Puzzle   <input type="checkbox" id="generos[]" name="generos[]" value="Puzzle">
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
                <td><button name="create" value="create" id="btn_create" onclick="return validate(1)">Registrar Videojuego</button></td>
                <td align="right"><a href="index.php?page=controller_videogame&op=list">Volver</a></td>
            </tr>

        </table>
    </form>
</div>