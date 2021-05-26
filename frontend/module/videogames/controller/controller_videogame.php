<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include ($path . "/module/videogames/model/DAOVideogame.php");
    // session_start();
    
    switch($_GET['op']){
        case 'list';
            try{
                $daovideogame = new DAOVideogame();
            	$rdo = $daovideogame->select_all_videogame();
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/videogames/view/list_videogame.php");
    		}
            break;
            
        case 'create';
            include("module/videogames/model/validate.php");
            $check = true;
            if (isset($_POST['create'])){
                $check=validate();
                if ($check){
                    // $_SESSION['id']=$_POST;
                    try{
                        //
                        $daovideogame = new DAOVideogame();
    		            $rdo = $daovideogame->insert_videogame($_POST);
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
		            if($rdo){
            		    echo '<script language="javascript">alert("Registrado en la base de datos correctamente")</script>';
            			$callback = 'index.php?page=controller_videogame&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }
            }
            include("module/videogames/view/create_videogame.php");
            break;
            
        case 'update';
            include("module/videogames/model/validate.php");
            
            $check = true;
            
            if (isset($_POST['update'])){
                $check=validate();
                
                if ($check){
                    // $_SESSION['user']=$_POST;
                    try{
                        $daovideogame = new DAOVideogame();
    		            $rdo = $daovideogame->update_videogame($_POST);
                    }catch (Exception $e){
                        $callback = 'index.php?page=503';
        			    die('<script>window.location.href="'.$callback .'";</script>');
                    }
                    
		            if($rdo){
            			echo '<script language="javascript">alert("Actualizado en la base de datos correctamente")</script>';
            			$callback = 'index.php?page=controller_videogame&op=list';
        			    die('<script>window.location.href="'.$callback .'";</script>');
            		}else{
            			$callback = 'index.php?page=503';
    			        die('<script>window.location.href="'.$callback .'";</script>');
            		}
                }
            }
            
            try{
                $daovideogame = new DAOVideogame();
            	$rdo = $daovideogame->select_videogame($_GET['id']);
            	$videogame=get_object_vars($rdo);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            
            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
        	    include("module/videogames/view/update_videogame.php");
    		}
            break;
            
        case 'read';
            try{
                $daovideogame = new DAOVideogame();
            	$rdo = $daovideogame->select_videogame($_GET['id']);
            	$videogame=get_object_vars($rdo);
            }catch (Exception $e){
                $callback = 'index.php?page=503';
			    die('<script>window.location.href="'.$callback .'";</script>');
            }
            if(!$rdo){
    			$callback = 'index.php?page=503';
    			die('<script>window.location.href="'.$callback .'";</script>');
    		}else{
                include("module/videogames/view/read_videogame.php");
    		}
            break;
            
        case 'delete';
            if (isset($_POST['delete'])){
                try{
                    $daovideogame = new DAOVideogame();
                	$rdo = $daovideogame->delete_videogame($_GET['id']);
                }catch (Exception $e){
                    $callback = 'index.php?page=503';
    			    die('<script>window.location.href="'.$callback .'";</script>');
                }
            	
            	if($rdo){
        			echo '<script language="javascript">alert("Borrado en la base de datos correctamente")</script>';
        			$callback = 'index.php?page=controller_videogame&op=list';
    			    die('<script>window.location.href="'.$callback .'";</script>');
        		}else{
        			$callback = 'index.php?page=503';
			        die('<script>window.location.href="'.$callback .'";</script>');
        		}
            }
            
            include("module/videogames/view/delete_videogame.php");
            break;
        case 'read_modal':
            //echo $_GET["modal"]; 
            //exit;
            try{
                $daovideogame = new DAOVideogame();
                $rdo = $daovideogame->select_videogame($_GET['id']);
            }catch (Exception $e){
                echo json_encode("error");
                exit;
            }
            
            if(!$rdo){
                echo json_encode("error");
                exit;
            }else{
                $videogame=get_object_vars($rdo);
                echo json_encode($videogame);
                exit;
            }
            break;
        default;
            include("view/inc/404.html");
            break;
    }