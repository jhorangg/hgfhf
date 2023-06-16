<?php
require_once '../config.php';
header("Content-Type: text/html;charset=utf-8");

$valido['success']=array('success'=>false, 
'mensaje'=>"",
'id_alumno'=>"",
'numcontrol'=>"",
'nombre'=>"",
'fecha'=>"",
'grupo'=>"",
'carrera'=>"");

if($_POST){
    $id=$_POST['id_alumno'];
    $sql="SELECT * FROM alumno WHERE id_alumno=$id";
    $resultado=$cx->query($sql);
    $row=$resultado->fetch_array();
    $valido['success']=true;
    $valido['mensaje']="SE ENCONTRO REGISTRO";
    $valido['id_alumno']=$row[0];
    $valido['numcontrol']=$row[1];
    $valido['nombre']=$row[2];
    $valido['fecha']=$row[3];
    $valido['grupo']=$row[4];
    $valido['carrera']=$row[5];
}else{
    $valido['success']=false;
    $valido['mensaje']="ERROR AL CARGAR CONTACTO";
}
$cx->close();
echo json_encode($valido);

?>