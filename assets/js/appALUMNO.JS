var urlServer="";
var sesion=localStorage.getItem("nombre");

const checarSesion=()=>{
  if(sesion==null){
    window.location.href="index.html";
  }
  document.querySelector("#usuario").innerHTML=sesion;
}

const cerrarSesion=()=>{
    localStorage.clear();
    window.location.href="index.html";
}


const agregarAlumno= async()=>{
    var numcontrol=document.querySelector("#numcontrol").value;
    var nombre=document.querySelector("#nombre").value;
    var fecha=document.querySelector("#fecha").value;
    var grupo=document.querySelector("#grupo").value;
    var carrera=document.querySelector("#carrera").value;
    

    if(numcontrol.trim()==='' ||
    nombre.trim()==='' ||
    fecha.trim()==='' ||
    grupo.trim()==='' ||
    carrera.trim()===''){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD ALUMNO'
          })  
        return;       
    }


    // INSERTAR A LA BASE DE DATOS
    const datos=new FormData();
    datos.append("numcontrol",numcontrol);
    datos.append("nombre",nombre);
    datos.append("fecha",fecha);
    datos.append("grupo",grupo);
    datos.append("carrera",carrera);
    

    var respuesta=await fetch(urlServer+"php/alumno/agregarAlumno.php",{
        method:'POST',
        body:datos
    });

    var resultado=await respuesta.json();

    if(resultado.success==true){
        Swal.fire({
            icon: 'success',
            title: 'EXITO!',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNO'
          }) 
          document.querySelector("#formAgregar").reset();
         
    }else{
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: resultado.mensaje,
            footer: 'CRUD ALUMNO'
          }) 
    }
    document.querySelector("#agregarModal").click();
    cargarAlumnos();
}

const cargarAlumnos=async()=>{

    var respuesta=await fetch(urlServer+"php/alumno/cargarAlumnos.php",{});
    var registrosHTML=``;
    var resultado=await respuesta.json();

    //console.log(resultado);

    resultado.data.forEach(fila=>{
        registrosHTML+=`
        <tr>
        <td>${fila[1]}</td>
        <td>${fila[2]}</td>
        <td>${fila[3]}</td>
        <td>${fila[4]}</td>
        <td>${fila[5]}</td>
        <td><button class="btn btn-success "  data-bs-toggle="modal" data-bs-target="#editarModal" onclick="cargarAlumno(${fila[0]})"><i class="bi bi-pencil-square p-1"></i>Editar</button></td>
        <td><button class="btn btn-danger" onclick="eliminarAlumno(${fila[0]})"> <i class="bi bi-trash p-1"></i>Eliminar</button></td>
      </tr>
        `;
    });
    document.querySelector("#registros").innerHTML=registrosHTML;

}

const eliminarAlumno=(alumnoid)=>{
    Swal.fire({
        title: '¿Estás seguro de eliminar este Cliente?',
        showDenyButton: true,
        confirmButtonText: 'SI',
        confirmButtonColor: '#198754',
        denyButtonText: 'NO',
      }).then(async(result) => {
        if (result.isConfirmed) {

            const datos=new FormData();
                datos.append("id_alumno",alumnoid);

            var respuesta=await fetch(urlServer+"php/alumno/eliminarAlumno.php",{
                method:'POST',
                body:datos
            });
        
            var resultado=await respuesta.json();
        
            if(resultado.success==true){
                Swal.fire({
                    icon: 'success',
                    title: 'EXITO!',
                    text: resultado.mensaje,
                    footer: 'CRUD ALUMNO'
                  }) 
                 
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: resultado.mensaje,
                    footer: 'CRUD ALUMNO'
                  }) 
            }
            cargarAlumnos();         
        } 
      })
}

const cargarAlumno=async(id_alumno)=>{
    const datos=new FormData();
    datos.append("id_alumno",id_alumno);
    
    var respuesta=await fetch(urlServer+"php/alumno/cargarAlumno.php",{
        method:'POST',
        body:datos
    });
    
    var resultado=await respuesta.json();

    document.querySelector("#id_alumno").value=resultado.id_alumno;
    document.querySelector("#enumcontrol").value=resultado.numcontrol;
    document.querySelector("#enombre").value=resultado.nombre;
    document.querySelector("#efecha").value=resultado.fecha;
    document.querySelector("#egrupo").value=resultado.grupo;
    document.querySelector("#ecarrera").value=resultado.carrera;


}

const editarAlumno=async()=>{
    var alumno=document.querySelector("#id_alumno").value;
    var numcontrol=document.querySelector("#enumcontrol").value;
    var nombre=document.querySelector("#enombre").value;
    var fecha=document.querySelector("#efecha").value;
    var grupo=document.querySelector("#egrupo").value;
    var carrera=document.querySelector("#ecarrera").value;

    if(numcontrol.trim()==='' ||
    nombre.trim()==='' ||
    fecha.trim()==='' ||
    grupo.trim()==='' ||
    carrera.trim()==='' ){
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'FALTA LLENAR CAMPOS',
            footer: 'CRUD CONTACTOS'
          })  
        return;       
    }

     // MODIFICAR EN LA BASE DE DATOS
     const datos=new FormData();
     datos.append("id_alumno",alumno);
     datos.append("numcontrol",numcontrol);
     datos.append("nombre",nombre);
     datos.append("fecha",fecha);
     datos.append("grupo",grupo);
     datos.append("carrera",carrera);
     
 
     var respuesta=await fetch(urlServer+"php/alumno/editarAlumno.php",{
         method:'POST',
         body:datos
     });
 
     var resultado=await respuesta.json();
     document.querySelector("#editarModal").click();
     if(resultado.success==true){        
         Swal.fire({
             icon: 'success',
             title: 'EXITO!',
             text: resultado.mensaje,
             footer: 'CRUD ALUMNO'
           }) 
           document.querySelector("#formEditar").reset();
          
     }else{
         Swal.fire({
             icon: 'error',
             title: 'ERROR',
             text: resultado.mensaje,
             footer: 'CRUD ALUMNO'
           }) 
     }     
     cargarAlumnos();

}