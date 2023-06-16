<?php
require_once '../config.php';
header("Content-Type: text/html;charset=utf-8");

$valido['success']=array('success'=>false, 
'mensaje'=>"",
'id_auto'=>"",
'marca'=>"",
'modelo'=>"",
'año'=>"",
'color'=>"",
'costo'=>"");

if($_POST){
    $id=$_POST['id_auto'];
    $sql="SELECT * FROM auto WHERE id_auto=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['id_auto']=$row[0];
    $valido['marca']=$row[1];
    $valido['modelo']=$row[2];
    $valido['año']=$row[3];
    $valido['color']=$row[4];
    $valido['costo']=$row[5];
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR AUTO";
}
$cx->close();
echo json_encode($valido);

?>