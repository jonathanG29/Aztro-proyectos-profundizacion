# biblioteca de libros

- Este repositorio esta destinado con el fin de dar solución a  la actividad planteada por el instructor, el cual indica, que deacuerdo al tutorial rapido de remix, se hiciera una lista de 10 elementos los cuales tuvieran su nombre y su imagen. ademas tambien se modificara el readme, para dar a entender como se debe clonar y ejecutar este aplicativo.


## Clonar repositorio

lo primero que debemos hacer es clonar el repositorio de este proyecto yendo al icono de code o copiando el siguiente link:https://github.com/jonathanG29/Aztro-proyectos-profundizacion/tree/main/aztro-remix-tutorial

## Instalción de dependencias

Una vez en hayas clonado el repositoro debes instalar las dependencias que requiere el proyecto para su ejecución, para ello utilizamos el siguiente comando.

```sh
npm i 
```

## Arrancar proyecto

Luego de haber terminado la instalación de las dependencias, vamos a ejecutar el siguiente comando para arrancar nuestro poryecto en el localhost, este nos dara una url para abrir en tu navegador predeterminado. http://localhost:5173/ (este puede varias de acuerdo a usos)

```sh
npm run dev
```

## Conceptos de Remix

### links 

Los links se utilizan para la navegación entre diferente rutas de la aplicación. Se implementan usando el component **Link** de **react-router-dom**. Este componente permite crear enlaces que, al ser cliclados, cambian la URL sin recargar la página

~~~
import { Link } from "remix";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
~~~

### Loader

Los **Loaders** son funciones que se ejecutan en el servidor antes de renderizar una ruta. Se utilizan para cargar datos necesarios para la página. Los datos cargados por un *loader* están disponibles en el componente de la ruta através del hook *useLoaderData*

~~~
import { json, useLoaderData } from "remix";

export let loader = async () => {
  let data = await fetchSomeData();
  return json(data);
}

function MyComponent() {
  let data = useLoaderData();
  return <div>{data.someProperty}</div>;
}
~~~

### Rutas dinámicas

Las rutas dinámicas en Remix permiten crear rutas que incluyen parámetros variables. 

~~~
import { useParams } from "remix";

function Post() {
  let { postId } = useParams();
  return <div>Post ID: {postId}</div>;
}
~~~

### Rutas anidadas
Las rutas anidadas en Remix permiten estructurar la aplicación en componentes más pequeños y reutilizables. Se definen creando subcarpetas dentro de la carpeta routes.

~~~
import { Outlet } from "remix";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}

// filepath: /routes/dashboard/stats.jsx
function Stats() {
  return <div>Stats</div>;
}

~~~
### Componente Outlet

El componente Outlet se utiliza en Remix para renderizar componentes hijos en rutas anidadas. Actúa como un marcador de posición donde se renderizarán los componentes de las rutas hijas

~~~
import { Outlet } from "remix";

function ParentComponent() {
  return (
    <div>
      <h1>Parent Component</h1>
      <Outlet />
    </div>
  );
}
~~~