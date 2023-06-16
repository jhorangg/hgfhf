<?php
require_once '../config.php';

$valido['success']=array('success'=>false, 'mensaje'=>"");

if($_POST){
    $marca=$_POST['marca'];
    $modelo=$_POST['modelo'];
    $año=$_POST['año'];
    $color=$_POST['color'];
    $costo=$_POST['costo'];
    
    $sqlInsertar="INSERT INTO auto VALUES(null,'$marca','$modelo','$año','$color','$costo')";
    if($cx->query($sqlInsertar)===true){
        $valido['success']=true;
        $valido['mensaje']="SE GUARDO CORRECTAMENTE";
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