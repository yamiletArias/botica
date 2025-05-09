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

INSERT INTO medicamentos (tipo, nombre, nomcomercial, presentacion, receta, precio)
VALUES
('Analgésico', 'Paracetamol', 'Doloforte', 'Tableta', 'N', 4.50),
('Antibiótico', 'Amoxicilina', 'Amoxil', 'Cápsula', 'S', 12.00),
('Antiinflamatorio', 'Ibuprofeno', 'Advil', 'Tableta', 'N', 7.80),
('Analgésico', 'Metamizol', 'Neo-Melubrina', 'Inyectable', 'S', 15.20),
('Antibiótico', 'Ciprofloxacino', 'Ciprolon', 'Tableta', 'S', 18.30),
('Antiinflamatorio', 'Diclofenaco', 'Voltaren', 'Inyectable', 'S', 10.00),
('Analgésico', 'Ketorolaco', 'Dolac', 'Inyectable', 'S', 14.50),
('Antibiótico', 'Azitromicina', 'Zithromax', 'Tableta', 'S', 22.75),
('Antiinflamatorio', 'Naproxeno', 'Flanax', 'Tableta', 'N', 9.00),
('Analgésico', 'Tramadol', 'Tramal', 'Cápsula', 'S', 11.80),
('Antibiótico', 'Claritromicina', 'Klaricid', 'Cápsula', 'S', 20.00),
('Analgésico', 'Paracetamol', 'Panadol', 'Jarabe', 'N', 6.50);

SELECT * FROM medicamentos;

/* presentacion ENUM('Tableta', 'Jarabe', 'Inyectable') NOT NULL, */