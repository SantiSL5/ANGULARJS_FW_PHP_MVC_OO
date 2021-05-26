<div id="contenido">
    <div class="container">
    	<div class="row">
    			<h3>Lista de videojuegos</h3>
    	</div>
    	<div class="row">
    		<p><a href="index.php?page=controller_videogame&op=create"><img src="view/img/anadir.png"></a></p>
    		
    		<table id="videogames_table" class="display">
                <thead>
                    <tr>
                        <th width=125><b>ID</b></th>
                        <th width=125><b>Codigo</b></th>
                        <th width=125><b>Nombre</b></th>
                        <th width=125><b>Compañia</b></th>
                        <th width=350><b>Acciones</b></th>
                    </tr>
                </thead>
                <tbody>
                <?php
                    if ($rdo->num_rows === 0){
                        echo '<tr>';
                        echo '<td align="center"  colspan="3">NO HAY NINGUN VIDEOJUEGO</td>';
                        echo '</tr>';
                    }else{
                        foreach ($rdo as $row) {
                       		echo '<tr>';
                            echo '<td width=125>'. $row['id'] . '</td>';
                            echo '<td width=125>'. $row['code'] . '</td>';
                    	   	echo '<td width=125>'. $row['nombre'] . '</td>';
                    	   	echo '<td width=125>'. $row['companyia'] . '</td>';
                    	   	echo '<td width=350>';
                    	   	echo '<a class="Button_blue" id="'. $row['id'] . '">Read</a>';
                    	   	echo '&nbsp;';
                    	   	echo '<a class="Button_green" href="index.php?page=controller_videogame&op=update&id='.$row['id'].'">Update</a>';
                    	   	echo '&nbsp;';
                    	   	echo '<a class="Button_red" href="index.php?page=controller_videogame&op=delete&id='.$row['id'].'">Delete</a>';
                    	   	echo '</td>';
                    	   	echo '</tr>';
                        }
                    }
                ?>
                </tbody>
            </table>
    	</div>
    </div>
</div>

<section id="modal">
    <!-- <div id="details-modal" hidden>
        <div id="details">
            <div id="container">
                ID: <div id="id"></div></br>
                Nomre: <div id="nombre"></div></br>
                Companyia: <div id="companyia"></div></br>
                Fecha_Salida: <div id="fecha_salida"></div></br>
                Clasificacion: <div id="clasificacion"></div></br>
                Estado: <div estado="estado"></div></br>
                Generos: <div id="generos"></div></br>
            </div>
        </div>
    </div> -->
</section>