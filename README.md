#  Listado de Ejercicios PHP 


Aplicación web creada con **Laravel 12**, **Inertia.js** y **Vue 3** cuyo objetivo es mostrar y gestionar un conjunto de **ejercicios prácticos** de Programación en Entorno Servidor (PHP).  
Está pensada como herramienta docente para que los estudiantes puedan visualizar los ejercicios y el profesor pueda administrarlos fácilmente.

---

##  Objetivos del proyecto

- Mostrar a los estudiantes un **listado organizado por temas** con acceso al enunciado y ejecución del código.
- Permitir al profesor/administrador **añadir, editar o eliminar temas y ejercicios**.
- Integrar los ejercicios existentes definidos en **archivos `.ini`** ya usados en clases.
- Ofrecer una interfaz moderna, responsiva y fácil de usar con **TailwindCSS** y **DaisyUI**.

---

## ⚙ Tecnologías utilizadas

| Tecnología | Uso principal |
|-------------|---------------|
| **Laravel 12** | Backend PHP y gestión de rutas/controladores |
| **Inertia.js** | Comunicación entre Laravel y Vue sin API REST |
| **Vue 3 (Composition API)** | Interfaz interactiva del lado del cliente |
| **TailwindCSS + DaisyUI** | Estilos, componentes y diseño responsive |
| **Filament (opcional)** | Administración visual de modelos (Unidades, Ejercicios) |
| **MySQL / SQLite** | Base de datos para almacenar unidades y ejercicios |
| **Docker (opcional)** | Entorno de desarrollo reproducible |

---

##  Estructura general del proyecto

laravel/
├── app/
│ ├── Http/
│ │ ├── Controllers/
│ │ │ ├── MainController.php
│ │ │ ├── Auth/
│ │ │ │ └── AuthenticatedSessionController.php
│ │ │ └── Admin/
│ │ │ ├── UnitController.php
│ │ │ └── ExerciseController.php
│ ├── Models/
│ │ ├── Unit.php
│ │ └── Exercise.php
│ └── ...
├── resources/
│ ├── js/
│ │ ├── Pages/
│ │ │ ├── Main.vue
│ │ │ ├── Dashboard.vue
│ │ │ └── Auth/Login.vue
│ │ └── Components/
│ │ ├── MenuLeft.vue
│ │ └── Layouts/HeaderTitle.vue
│ └── css/app.css
├── database/
│ ├── migrations/
│ └── seeders/
└── routes/
├── web.php
└── auth.php



##  Instalación y ejecución

1. **Clonar el repositorio**

```bash
   git clone https://github.com/usuario/ListadoEjercicios.git
   cd ListadoEjercicios
```
   
2.-  Instalar dependencias

```bash
composer install
npm install
```

3.- Configurar el entorno

```bash
cp .env.example .env
php artisan key:generate
```

4.- Configurar base de datos

Edita el archivo .env con tus credenciales.

Ejecuta las migraciones y seeders:

```bash
php artisan migrate --seed
```

5.- Iniciar servidor

```bash
php artisan serve
npm run dev
```

6.- Accede en tu navegador a http://localhost:8000

** Uso de la aplicación

Para estudiantes 👩‍🏫 
Acceso público al listado de temas y ejercicios.

Visualización del enunciado (en texto o iframe).

Ejecución del código o visualización del resultado.

Para el profesor / administrador
Acceso autenticado mediante login.

Panel para gestionar temas y ejercicios.

Posibilidad de sincronizar o importar ejercicios desde ficheros .ini.

***  Autenticación
El sistema de login está integrado mediante Laravel Breeze y se presenta en forma de ventana modal sobre la SPA principal.
Mientras el modal está visible, el fondo se mantiene ligeramente oscurecido y difuminado (efecto backdrop-blur).

***  Rutas principales
Ruta	Descripción	Middleware
/	Página principal con el listado de ejercicios.	Pública
/login	Formulario de acceso.	Invitado
/dashboard	Panel del profesor/administrador.	Auth
/profile	Edición del perfil del usuario autenticado.	Auth

*** Funcionalidades previstas
1.  Listado dinámico de temas y ejercicios.

1. Menú lateral plegable.

1. Modal de login con fondo difuminado.

1. Importación automática desde ficheros .ini.

1. Panel Filament para administración avanzada.

1. Filtro de ejercicios por tema.

1. Multilenguaje (es/en).

1. Exportación de ejercicios a JSON / Markdown.

** Diario de desarrollo
Registro cronológico de los avances, decisiones y tareas del proyecto.

Fecha	Descripción
2025-10-01	Creación del proyecto base con Laravel + Inertia + Vue.
2025-10-03	Implementación del menú lateral y maquetación inicial.
2025-10-06	Lectura y combinación de ficheros .ini de ejercicios.
2025-10-08	Creación del modal de login con fondo difuminado.
2025-10-10	Integración de Tailwind v4 y revisión de plugins.
2025-10-11	Pruebas de autenticación y redirección tras login.
(pendiente)	Implementar CRUD de temas y ejercicios desde el panel.


** 👨‍💻 Autor
Profesor Manuel Romero
Departamento de Informática — CPIFP Los Enlaces (Zaragoza, España)
📧 manuelromeromiguel@gmail.com

** 📄 Licencia
Proyecto distribuido bajo licencia MIT.
Su uso está permitido con fines educativos, siempre citando la fuente original.


** Agradecimientos
A los estudiantes del ciclo DAW/DWES por su implicación y retroalimentación.

Y al ecosistema de Laravel, Vue e Inertia por facilitar un entorno moderno y didáctico.


