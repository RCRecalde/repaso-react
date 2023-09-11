import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2';

function App() {
  //gestion de estados: acceso al valor 
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();
  const [id, setId] = useState();


  const [editar, setEditar] = useState(false);


  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>El empleado " + nombre + " fue registrado </i>",
        icon: 'success',
        timer: 3000
      })
    });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: "<i>El empleado " + nombre + " fue actualizado </i>",
        icon: 'success',
        timer: 3000
      })
    });
  }

  const deleteEmpleado = (val) => {
    Swal.fire({
      title: 'Confirmar eliminación',
      html: "<i>¿Desea eliminar a " + val.nombre + "?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire(
          'Eliminado!',
          val.nombre + ' fue eliminado.',
          'success'
        );
      });     
      }
    })


  }

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }


  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  }

  getEmpleados()

  return (
    <div className="container">

      <div className="card text-center">
        <div className="card-header">
          Gestión de Empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre: </span>
            <input type="text" onChange={(event) => {
              // proceso/evento cada vez que cambie el campo
              setNombre(event.target.value);
            }}
              className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="nombre" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Edad: </span>
            <input type="number" onChange={(event) => {
              // proceso/evento cada vez que cambie el campo
              setEdad(event.target.value);
            }}
              className="form-control"
              value={edad} placeholder="Ingrese su edad" aria-label="edad" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">País: </span>
            <input type="text" onChange={(event) => {
              // proceso/evento cada vez que cambie el campo
              setPais(event.target.value);
            }}
              className="form-control"
              value={pais}
              placeholder="Ingrese un país" aria-label="pais" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Cargo: </span>
            <input type="text" onChange={(event) => {
              // proceso/evento cada vez que cambie el campo
              setCargo(event.target.value);
            }}
              className="form-control"
              value={cargo}
              placeholder="Ingrese su cargo" aria-label="cargo" aria-describedby="basic-addon1" />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Años: </span>
            <input type="text" onChange={(event) => {
              // proceso/evento cada vez que cambie el campo
              setAnios(event.target.value);
            }}
              className="form-control" value={anios} placeholder="Años de experiencia" aria-label="anios" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            editar ?
              <div>
                <button className='btn btn-warning m-2 ' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
              </div> :
              <button className='btn btn-success' onClick={add}>Registrar</button>

          }


        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return <tr key={val.id}>
                <th> {val.id} </th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">

                    <button type="button" onClick={() => {
                      editarEmpleado(val);
                    }} className="btn btn-info">Editar</button>
                    <button type="button" onClick={() => {
                      deleteEmpleado(val);
                    }} className="btn btn-danger">Eliminar</button>

                  </div>
                </td>
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  );
}

export default App;
