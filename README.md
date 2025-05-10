# Procedimiento para implimentacion

1. Clonar el repositorio
```
git clone https://github.com/yamiletArias/botica.git
```

2. Reconstruir node_modules
```
npm install
```

3. COnstruir el archivo .env
```
DB_HOST=
DB_PORT= 
DB_PASSWORD=
DB_USER=
DB_DATABASE=
```

3. Restarure la BD(db > database.sql)
```sql
CREATE DATABASE appbotica;
USE appbotica;

CREATE TABLE medicamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Analgésico', 'Antibiótico', 'Antiinflamatorio') NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  nomcomercial VARCHAR(40) NULL,
  presentacion ENUM('Tableta', 'Cápsula', 'Jarabe', 'Inyectable') NOT NULL,
  receta ENUM('S', 'N') NOT NULL,
  precio DECIMAL(7,2) NOT NULL
);
```

5. Ejecute el proyecto:
```
npm run dev
```