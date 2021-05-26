<div id="contenido">
    <h1>Informacion del Videojuego</h1>
    <p>
    <table border='2'>
        <tr>
            <td>ID: </td>
            <td>
                <?php
                    echo $videogame['id'];
                ?>
            </td>
        </tr>

        <tr>
            <td>ID: </td>
            <td>
                <?php
                    echo $videogame['code'];
                ?>
            </td>
        </tr>
    
        <tr>
            <td>Nombre: </td>
            <td>
                <?php
                    echo $videogame['nombre'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Companyia: </td>
            <td>
                <?php
                    echo $videogame['companyia'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Fecha_salida: </td>
            <td>
                <?php
                    echo $videogame['fecha_salida'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Clasificacion: </td>
            <td>
                <?php
                    echo $videogame['clasificacion'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Estado: </td>
            <td>
                <?php
                    echo $videogame['estado'];
                ?>
            </td>
        </tr>
        
        <tr>
            <td>Generos: </td>
            <td>
                <?php
                    echo $videogame['generos'];
                ?>
            </td>
            
        </tr>

    </table>
    </p>
    <p><a href="index.php?page=controller_videogame&op=list">Volver</a></p>
</div>