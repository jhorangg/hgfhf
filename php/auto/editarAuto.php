<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $id=$_POST['id_auto'];
    $marca=$_POST['marca'];
    $modelo=$_POST['modelo'];
    $año=$_POST['año'];
    $color=$_POST['color'];
    $costo=$_POST['costo'];
    
    $sqlEditar="UPDATE auto SET 
                marca='$marca',
                modelo='$modelo',
                año='$año',
                color='$color',
                costo='$costo' 
                WHERE id_auto=$id";
    if($cx->query($sqlEditar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
    }else{
        $valido['success']=false;
        $valido['mensaje']="ERROR: NO SE GUARDO";
    }

}else{
    $valido['success']=false;
    $valido['mensaje']="NO SE GUARDO";
}
echo json_encode($valido);



?>