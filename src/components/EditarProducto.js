import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {editarProductoAction} from '../actions/productosAction';

const EditarProducto = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    
    //nuevo state deproducto
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })


    //producto a editar
    const productoeditar = useSelector(state => state.productos.productoeditar);
    
        //llenar el state automaticamente
        useEffect(() =>{
            guardarProducto(productoeditar);
        }, [productoeditar]);

    //leer los DATOS del formulario
    const handleChange = e =>{
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, precio} = producto;

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(editarProductoAction(producto));
        history.push('/');
    }


    return (
      <div className="row justify-content-center my-5">
      <div className="col-md-8">
          <div className="card">
              <div className="card-body">
                  <h2 className="text-center mb-4 font-weight-bold">
                      Editar Producto
                  </h2>

                  <form 
                  onSubmit={handleSubmit}>
                  <div className="form-group">
                          <label>Nombre Producto</label>
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Nombre Producto"
                              name="nombre"
                              value={nombre}
                              onChange={handleChange}
                          />
                      </div>
                      
                      <div className="form-group">
                          <label>Precio Producto</label>
                          <input
                              type="number"
                              className="form-control"
                              placeholder="Precio Producto"
                              name="precio"
                              value={precio}
                              onChange={handleChange}
                          />
                      </div>
                      <button
                      type='submit'
                      className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                      >Guardar Cambios</button>
                  </form>
              </div>
          </div>
          </div>
          </div>
      );
}
 
export default EditarProducto;