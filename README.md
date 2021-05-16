**correr el servidor**: 
json-server db.json --port 4000

# REDUX
cuando utilizar redux:  cuando el proyecto es grande y va a ser desarrollada por muchas personas
REDUX: te permite manejar el state mas facil conforme la app va creciendo

-solo se tiene un state principal
-el state cambia de acuerdo a lo que sucede en la interfaz de usuario

Principios de redux:
- solo existe un store con todo el state de la app
- los componentes no modifican el state directamente
- el state se modifica por medio de funciones(que son las actions)

Terminologia de redux:
-store: contiene al state (solo hay uno por app)
-dispatch: ejecuta una accion que actualizara el state (manda a llamar a una funcion)
-action: objeto js que tiene un tipo y un payload, funciones q modifican el state
-susccribe: similar a un event listener para el state
-reducers: funciones que saben que hacer con las acciones y el payload

                                                            state y action
                                                store  --------------------------> reducers
para crear las rutas:
1. instalo react-router-dom 

# App.js
2. importo el react router:
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

3. dentro del return agrego:
  return (
    <Router>
        <Switch>
        </Switch>
    </Router>
  );
}
**todo lo q esta fuera del switch se carga en todas las paginas**
**lo que ppongo dentro del switch es lo q quiero que se cargue en cada una**

y voy creando cada uno de los componentes y lo agrego:
empiezo con el header que quiero que vaya en todas las ventanas de la pagina:
1. creo el archivo dentro de la carpeta components y luego lo agrego en el app.js:
 ```
 return (
    <Router>
=====><Header /><====
        <Switch>
        </Switch>
    </Router>
  );
}
 ```
lo coloco fuera del switch pq quiero que este siempre

2. creo las componentes producto, editar producto, nuevo producto, etc.
las agrego dentro del switch:
 ```
 <Router>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Productos} />
          <Route exact path='/productos/nuevo' component={NuevoProducto} />
          <Route exact path='/productos/editar/:id' component={EditarProducto} />
        </Switch>
      </div>
    </Router>
 ```
 3. dentro de header.js:

 # components/Header.js

 quiero que cuando apriete el boton de agregar producto o el titulo que esta en el header('CRUD - React, Redux, REST API & Axios') me dirija a una pagina, para eso utilizo react router dom:

3.1- primero importo el link:
import {Link} from 'react-router-dom';

3.2- luego lo agrego donde yo quiera:
 ```
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <h1>
==================><Link to={'/'} className='text-light'> 
                    CRUD - React, Redux, REST API & Axios
                    </Link></h1>
            </div>
 =================><Link to={'/productos/nuevo'} 
                    className="btn btn-danger nuevo-post d-block d-md-inline-block">
                    Agregar Producto &#43;</Link>
            </nav>);}
 ```

## tablade productos:
dentro de productos.js
```
    return (
        <Fragment>
            <h2 className='text-center my-5'>Listado de Productos</h2>
            <table className='table table-striped'>
                <thead className='bg-primary table-dark'>
                    <tr>
                        <th scope='col'>Nombre</th>
                        <th scope='row'>Precio</th>
                        <th scope='col'>Acciones</th>
                    </tr>
                </thead>
            </table>
        </Fragment>
```
The scope attribute specifies whether a header cell is a header for a column, row, or group of columns or rows.

The <thead> tag is used to group header content in an HTML table.
The <thead> element must have one or more <tr> tags inside.
The <thead> tag must be used as a child of a <table> element, after any <caption> and <colgroup> elements, and before any <tbody>, <tfoot>, and <tr> elements.
The <thead>, <tbody>, and <tfoot> elements will not affect the layout of the table by default. However, you can use CSS to style these elements


## REST API

1. para crear la api instalo json-server:
sudo npm install -g json-server

2. despues creo un archivo q s ellama db.json y dentro pego los datos

3. luego para q sea una api escribo en la consola: json-server db.json --port 4000
por consola me va a salir: \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:4000/productos

  Home
  http://localhost:4000

4. si me meto al link:http://localhost:4000/productos me deben aparecer los datos 

# REDUX
1. instalo redux:
npm i react-redux redux redux-thunk

react redux: tiene funciones para conectar la app de create-react-app con redux
redux-thunk: utilizar funciones asincronas en redux
redux es la libreria como tal

2. Creo un archivo store.js
**El store es el encargado del state de toda la app completa**

3. creo una carpeta reducer y dentro creo un index.js y otro llamado producto.js
### en reducer/index:
```
import {combineReducers} from 'redux';
import productosReducer from './productosReducer';
export default combineReducers({
    productos: productosReducer
})
```
### en reducer/producto:
```
const initialState = {
    productos: [],
    error: null,
    loading: false }
export default function (state = initialState, action) {
    switch (action.type) {
        default:
            return state;} }
```
### en store:
```
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer/index';

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__() 
    ));
```
window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__()  es el codigo que se utiliza para q reconozca la extension redux dev tools 

finalmente queda asi:
```
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer/index';
const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
        //a continuacion va el codigo para utilizar redux developer tools

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
export default store;
```


## types: 
**describen lo q esta pasando en la aplicacion se utilizan en el action y en el reduces**

1. creo los types
```
export const AGREGAR_PRODUCTO = 'AGREGAR_PRODUCTO';
export const AGREGAR_PRODUCTO_EXITO = 'AGREGAR_PRODUCTO_EXITO';
export const GUARDAR_PRODUCTO_ERROR = 'AGREGAR_PRODUCTO';
```

2. los importo en el reducer y en el action:
```
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    GUARDAR_PRODUCTO_ERROR
} from '../types/index';
```
3. luego en el action creo una funcion:
```
//crear nuevos prodcutos
export function crearNuevoProductoAction(){
    return() =>{
        console.log('desde action')
    }
}
```

4. luego me voy a nuevoproducto y:

- agrego un onsubmit en el form:
<form
onSubmit={handleSubmit}>

- luego creo la funcion: 
```
 const handleSubmit = e =>{
        e.preventDefault();
        //validar formulario
        //verificar si no hay errores 
        //crear el nuevo producto
    }
```
- importo el action:
import {crearNuevoProductoAction} from '../actions/productosAction';

- agrego el dispatch:
const dispatch = useDispatch();
const agregarProductos = () => dispatch(crearNuevoProductoAction)

- y incluyo la funcion en el submit:
```
    const handleSubmit = e =>{
        e.preventDefault();
        //validar formulario
        //verificar si no hay errores 
        //crear el nuevo producto
        agregarProductos();
    }
```

**useState**
ahora voy a crear el useState para guardar el estado de precio y de nombre para que cuando el usuario escriba se guarde ese dato:

1. creo el useState:

    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

2. dentro de la funcion agregarproductos agrego los elementos del state:

 agregarProductos({
            nombre,
            precio
        });

3. luego agrego dentro del form un onchange q va a guardar el cambio cuando el usuario escribe dentro del formulario:

  value={nombre}
  onChange={e => guardarNombre(e.target.value)}

   value={precio}
   onChange={e => guardarPrecio(Number(e.target.value))}

4. y le paso al dispatch el parametro product q le pasa lod datos: nombre y precio:

const agregarProductos = producto => dispatch(crearNuevoProductoAction(producto)) 

**modificar el state**
1. primero voy a agregar en el action una funcion:
const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
    payload: true
})
2. y luego en el reducer voy a crear el case:
      case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: action.payload
            }


3. luego voy a agregar un try catch cosa de que si yo pongo agregar producto si hay un error se ejecute algo y si hayotra ejecute otra accion:

```
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(agregarProducto());

        try {
            dispatch(agregarProductoExito(producto));
        } catch (error) {
            dispatch(agregarProductoError(true));}}}
```

- 3.1)  agrego la funcion de agregarproductoexito:
```
    const agregarProductoExito = producto =>({
        type: AGREGAR_PRODUCTO_EXITO,
        payload: producto
    })
```
- 3.2) luego en el reducer creo el case:
```
 case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload]
            }
```
- 3.3) agrego la funcion de guardar producto error:
```
  case GUARDAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
                }
```
- 3.4) luego en el reducer creo el case:
```
    const agregarProductoError = estadoDeError =>({
        type: GUARDAR_PRODUCTO_ERROR,
        payload: estadoDeError
    })
```
action.payload es lo que yo paso como payload dentro del action: ejemplo en AGREGAR_PRODUCTO_EXITO: paso como action.payload a producto

el state.productos guarda el estado de productos :  productos: [],

flujo: 

- Intenta agregar un producto, lo cambia a cargando(loading) igual a true
        **dispatch(agregarProducto());**

- si lo agrega, modificamos el state con el nuevo producto agregado
        **dispatch(agregarProductoExito(producto));**

- pero si por algo hubiese un error ejecuto un catch
        **dispatch(agregarProductoError(true));**


### axios
configurar el axios:

1. instalo el axios:
npm i axios

2. creo un archivo config/axios:

import axios from 'axios';
const clienteAxios = axios.create({
    baseURL : 'http://localhost:4000/';
});
export default clienteAxios;

3. luego me voy a  productosaction y:

- lo importo:
 import clienteAxios from '../config/axios';

-lo inserto en la api:
 try {
     clienteAxios.post('/productos', producto);    **esto se lo paso a la api**
     dispatch(agregarProductoExito(producto)); **esto se lo paso al state**

4. le agrego el asyn await
```
 return async (dispatch) => {
        dispatch(agregarProducto());
        try {
           await clienteAxios.post('/productos', producto);
```

## useSelector 
hook de redux que se usa para leer lo q tengamos en el state

1. en nuevo producto lo agrego:
   const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);
2. luego del formulario agrego:
```
</form>
        { cargando ? <p>Cargando...</p> : null }
        { error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
```

## mostrar una alerta: 

1. instalo sweeet alert:
npm install --save sweetalert2

2. lo agrego en el try y si se agrega un producto me sale la alerta
```
            Swal.fire(
                'Correcto',
                'El producto se agrego correctamente',
                'success'
            )
```
3. lo agrego en el caatch por si hay un error:
```
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
```
para q cuando se agregue un producto se direccione a la pagina principal agrego {history} en nuevoProducto:
const NuevoProducto = ({history}) => {

y dentro del submit le agrego la redireccion:
  const handleSubmit = e => {
       ...
        //redireccionar
        history.push('/');


## obtener los productos de la api:

1. creo los types:
```
export const COMENZAR_DESCARGA_PRODUCTOS = 'COMENZAR_DESCARGA_PRODUCTOS';
export const DESCARGA_PRODUCTOS_EXITO = 'DESCARGA_PRODUCTOS_EXITO';
export const DESCARGA_PRODUCTOS_ERROR = 'DESCARGA_PRODUCTOS_ERROR';
```
2. me voy al action y los importo:
```
import {
    ...
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR
} from '../types/index';
```
3. luego creo una nueva funcion:
```
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch(descargarProductos());
    }
}
```
4. y agrego el const de descargarProductos():
const descargarProductos = () =>({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

5. dps en el reducer importo y creo los cases:
  case COMENZAR_DESCARGA_PRODUCTOS:
            return{
                ...state,
                loading: action.payload
            }

como es igual al case agregar producto los coloco a los dos juntos:
```
  case COMENZAR_DESCARGA_PRODUCTOS:
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: action.payload
            }
```

6. luego agrego un try catch que va a utilizar las otras dos actions que me quedaban:
```
try{
    const respuesta = await clienteAxios.post('/productos');
    dispatch(descargaProductosExitosa(respuesta.data));
}catch (error) {
    console.log(error);
    dispatch(descargaProductosError())
        }
```
7. y creo sus respectivas funciones:

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});
const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

8. luego me voy al reducer y creo los cases:



## eliminar y editar productos
1. CREO los types:
```
export const OBTENER_PRODUCTO_ELIMINAR = 'OBTENER_PRODUCTO_ELIMINAR';
export const PRODUCTO_ELIMINADO_EXITO = 'PRODUCTO_ELIMINADO_EXITO';
export const PRODUCTO_ELIMINADO_ERROR = 'PRODUCTO_ELIMINADO_ERROR';
```
2. los importo en el action y creo una funcion:

```
export function borrarProductoAction (id) {
    return async (dispatch) => {
        dispatch(obtenerProductosELiminar());
        try{

        }catch (error) {
            console.log(error);
        }}}
```
3. y creo el const:
```
const obtenerProductosELiminar = id =>({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})
```
4. luego voy a producto.js y dentro de producto:
importo las dep de redux:
```
import { useDispatch} from 'react-redux';
import {borrarProductoAction} from '../actions/productosAction';
```

y creo la funcion:

```
const dispatch = useDispatch();
const confirmarELiminarProducto = id =>{
        dispatch(borrarProductoAction(id));
    }
```

5. y lo agrgeo en el boton:
```
  <button 
        type='button'
        className='btn btn-danger'
        onClick={() => confirmarELiminarProducto(id)}>
        Eliminar
        </button>
```

6. en el reducer agrego un state inicial:
const initialState = {
    productos: [],
    error: null,
    loading: false,
    productoELiminar:null
}


7.  creo dos const mas en el action:
```
const eliminarProductoExito= () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError= () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});
```
8. que las agrego en un try catcha dentro de la funcion:
```
          try{
            const resultado= await clienteAxios.delete(`/productos/${id}`);
            dispatch(eliminarProductoExito());
        }catch(error){
            console.log(error)
            dispatch(eliminarProductoError());
        }
    }
}
```
9. creo los cases en el reducer:
```
case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                productos: state.productos.filter( producto => producto.id !== state.productoELiminar),
                productoELiminar: null //lo eliminino del state
            }
 case PRODUCTO_ELIMINADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
                }
```
# agregar confirmacion para que cuando el usuario de le eliminar le consulte si quiere eliminarlo:


utilizo sweet alert: https://sweetalert2.github.io/

para hacerlo mas simple voy a pponer la alerta en Producto.js

1. dentro de eliminar producto voy a agregar la alerta que copio de sweetAlert2:
---------------------------
Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
  }
})

---------------------------

```
    const confirmarELiminarProducto = id =>{
        //preguntar al usuario
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto que se elimina no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!!',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {

            //pasarlo al action
            dispatch(borrarProductoAction(id));
            }
          })
    }
```
pero tambien en el cation agrego dentro del try:

```
try{
    const resultado= await clienteAxios.delete(`/productos/${id}`);
    dispatch(eliminarProductoExito());
    //si se elimina mostrar alerta
    Swal.fire(
        'Eliminado!',
        'El producto se elimino correctamente',
        'success'
        )
```

## colocar en activo el producto que quiero editar

para que cuando presione en editar me rediriga al producto q seleccione voy a utilizar un hook que se llama ***useHistory***

1. lo exporto en Producto.js:
import { useHistory } from 'react-router';

2. lo agrego como el usedispatch:
```
const Producto = ({producto}) => {
    const dispatch = useDispatch();
===> const history = useHistory()
```
3. y creo una funcion que redirige de forma programada:
```
    const redireccionarEdicion = producto =>{
        history.push(`/productos/editar/${producto.id}`)
    }
```
4. despues modifico el form y reemplazo el link por button:

PASO DE ESTO:
``` 
    <Link 
    to={`/productos/editar/${id}`}
        className='btn btn-primary mr-2'
    
        >
        Editar
    </Link>
```
A ESTO:
```
<button 
        type='button' 
        className='btn btn-primary mr-2'
        onClick={ () => redireccionarEdicion(producto)} 
        >
        Editar
    </button>
```

##Seleccionando el producto a editar:
1. creo tres types:
   OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR

2. los importo en el action y creo una funcion para colocar producto en edicion:
```
export function obtenerProductoEditar (producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto));       
    }
}
```
3. luego creo el const de la respectiva funcion
```
const obtenerProductoEditarAction= producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

```
4. me boy al reducer y creo su case:
```
    case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoeditar: action.payload
            }
```
5. Y agrgeo un state inicial  mas:
const initialState = {
    ...
    productoeditar: null
}

6. dps me voy a editarproducto.js y creo un const
    const producto = useSelector(state => state.productos.productoeditar);
    if(!producto) return null;

    const {nombre, precio, id} = producto;
7. y agrego en cada input el value:
      value={nombre}
      value={precio}

## crear la accion
1. creo un nuevo type:
2. lo agrgeo en el action:
```
export function  editarProductoAction(producto) {
    return async (dispatch) =>{
        dispatch(editarProducto(producto));
        try{
            const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
        }catch (error){
        }
    }
}
```
3. creo el const:
```
const editarProducto = ()=> ({
    type: COMENZAR_EDICION_PRODUCTO
});
```
4. luego me voy a editar producto e importo el action:
import {editarProductoAction} from '../actions/productosActions';

5. y creo un submit:
```
  const handleSubmit = e =>{
        e.preventDefault();

        editarProductoAction();
    }
```
6. q se lo agrego al formulario

7. creo el state:
```
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    })
```
8. llenar el state automaticamente
```
        useEffect(() =>{
            guardarProducto(productoeditar);
        }, [productoeditar]);
```
8. creo un on change:
```
    const handleChange = e =>{
        guardarProducto({
            ...state,
            [e.target.name] : e.target.value
        })
    }
```
9. y lo agrego dentro del formulario de cada input:
   onChange={handleChange}

10. agrego el dispatch dentro de editar producto:
```
const EditarProducto = () => {
    const dispatch = useDispatch();
    const handleSubmit = e =>{
        e.preventDefault();
 ====>dispatch(editarProductoAction(producto));
    }
```

## agrego una redireccion
1. importo el hook de history y lo coloco dnetro de la funcion:
```
import { useHistory } from 'react-router';
productosActions';
const EditarProducto = () => {
    const history = useHistory();
```
2. lo redirecciono al componente principal, lo coloco en el submit para q cuando el usuario de click se redireccione:
```
    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(editarProductoAction(producto));
       
        history.push('/');
    }
```
3. agrego dentro del action el dispatch de exito:
```
        try{
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch(editarProductoExito(producto));
        }catch (error){
            console.log(error);
        }}}
const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})
```
4. y luego creo el case en el reducer:

**tomamos todos los productos del state iteramos en ellos y comparamos: si el payoad q le estamos pasando, su id, 
es igual al producto q estamos iterando en ese momento, reemplaza el producto actual con lo q se pase como payload
el payload de editar producto exito es el producto actual**

```
      case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                productoeditar: null,
                productos: state.productos.map(producto => 
                    producto.id === action.payload.id ? producto = action.payload : producto);
            }
```

Y ṕor ultimo agrego el case que me faltaba:         
case PRODUCTO_EDITADO_ERROR: en el reducer




# crear un segundo reducer
1. en reducers creo un archivo alerta
****************************
const handleClick = e => {
    e.preventDefault();
   console.log('click')
}
2. en alertaReducer:
creo el reducer:
```
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

const initialState = {
    alerta: null
}
export default function (state = initialState, action) {
    switch (action.type) {
    default:
            return state;
    }
} 
```
3. lo agrego en el index de reducer, mmedixantte el combineReducers puedo incluir muchos reducers:
```
import alertaReducer from './alertaReducer';
export default combineReducers({
    productos: productosReducer,
    alerta: alertaReducer
})
```
4. luego creo el action de alerta:
y creo la base:
```
import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types';

export function mostrarAlerta(alerta) {
    return (dispatch) => {

        dispatch(mostrarAlertaError(alerta));
    }}
const mostrarAlertaError = alerta => ({
    type: MOSTRAR_ALERTA,
    payload: alerta
});
```
5. me voy a nuevo producto:
y exporto la funcion mostrar alerta:

import {mostrarAlerta} from '../actions/alertaAction';


y en el submit agrego dentro del if la alerta:
 ```
 const handleSubmit = e => {
       
        if(nombre.trim() === '' || precio <= 0){
           const alerta = {
               msg: 'Ambos campos son obligatorios',
               classes: 'alert alert-danger text-center text-uppercase p3'
           }
           mostrarAlerta(alerta);
        }
 ```

6. pero para q se ejecute debo agregar el dispatch
 ```
  if(nombre.trim() === '' || precio <= 0){
        ...
 ======>dispatch(mostrarAlerta(alerta));
        }
 ```
 7. en el reducer creo el case:
     case MOSTRAR_ALERTA:
            return{
                ...state,
                alerta: action.payload
            }
alerta: action.payload me devuelte lo que le pase como payload en alertaAction: esto me lleva a  
dispatch(crearAlerta(alerta)) que si me fijo en nuevo producto agregue:
  const alerta = {
               msg: 'Ambos campos son obligatorios',
               classes: 'alert alert-danger text-center text-uppercase p3'
           }
           dispatch(mostrarAlerta(alerta))
entonces devolveria el contenido de const alerta


## mostarr la alerta:
1. agrego el state en el store dentro de omponents/NuevoProducto.js:
    const alerta = useSelector(state => state.alerta.alerta);
2. y agrego en el return:
 ```
 </h2>
        { error ? <p 
        className={alerta.classes}>{alerta.msg}</p> : null }
        <form
 ```

 **para ocultar la alerta:**
dentro del action:
 ```
export function ocultarAlertaAction() {
    return (dispatch) => {
        dispatch(ocultarAlerta())
    }
}
const ocultarAlerta = ()=> ({
    type: OCULTAR_ALERTA
});
 ```
luego creo el case: 
 ```
       case OCULTAR_ALERTA:
            return{
                ...state,
                alerta: null
            }
 ```
 y en nuevo producto agrego el dispatch:
  ```
    const handleSubmit = e => {
        e.preventDefault();
        ...
        //verificar si no hay errores 
        dispatch(ocultarAlertaAction());
 ```

# boton para eliminar todos los productos del listado:




**Se espera a que el Usuario de click**
<button
    onClick={handleClick}
></button>
 
**Exactamente lo mismo que lo anterior**
<button
    onClick={() => handleClick}
></button>
 
**La función se ejecuta apenas se renderice el componente**
<button
    onClick={handleClick()}
></button>