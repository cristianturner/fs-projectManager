# fs-projectManager
# [fs projectManager]
 
[Descripción breve: Esta app nos ayuda a registrar tareas nuevas las cuales podemos marcarlas como pendientes, concluidas, tambien tiene estadisticas de cuantas pendientes y concluidas se tiene, ademas de un CRUD basico para las acciones correspondientes.]
 
<!-- BADGE_CI -->
 
## 🚀 Instalación local
 
```bash
git clone [https://github.com/cristianturner/fs-projectManager]
cd [fs-projectManager]
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL=
JWT_SECRET=
PORT=
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).
# prueba de proteccion
