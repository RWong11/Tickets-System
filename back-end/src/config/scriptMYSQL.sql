DROP DATABASE IF EXISTS Solicitudes;
CREATE DATABASE Solicitudes;
USE Solicitudes;

/*
	- El eliminar lo manejamos con el atributo Baja ya que no se puede eliminar alguna persona o categoria ya relacionada a algun ticket,
    ademas de que por buenas practicas nunca se deben de eliminar tuplas.
    - Los catalogos Cat_PrioridadesTicket y Cat_EstatusTicket son estaticos y ya tienen valores, estos catalogos no se manipulan dentro del sistema para el usuario,
    pero si nos sirven en la base de datos para relacionar a cual es su valor y para una mejor comprension en la vista de tickets Vi_Tickets
*/

CREATE TABLE Cat_PrioridadesTicket (
	ID TINYINT NOT NULL,
    Descripcion VARCHAR(16) NOT NULL,
    CONSTRAINT PK_Cat_PrioridadesTicket PRIMARY KEY (ID)
);
INSERT INTO `Cat_PrioridadesTicket` VALUES (1, 'Baja'), (2, 'Media'), (3, 'Alta');

CREATE TABLE Cat_EstatusTicket (
	ID CHAR(3) NOT NULL,
    Descripcion VARCHAR(24) NOT NULL,
    CONSTRAINT PK_Cat_EstatusTicket PRIMARY KEY (ID)
);
INSERT INTO `Cat_EstatusTicket` VALUES ('ABT', 'Abierto'), ('ESP', 'En espera'), ('FIN', 'Finalizado');

CREATE TABLE Cat_CategoriasTicket (
	ID SMALLINT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Baja BIT NOT NULL DEFAULT 0,
    CONSTRAINT PK_Cat_CategoriasTicket PRIMARY KEY (ID)
);

CREATE TABLE Personal (
	ID INT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Apellidos VARCHAR(80) NOT NULL,
    Telefono CHAR(10) NULL,
    Direccion VARCHAR(150) NULL,
    Baja BIT NOT NULL DEFAULT 0,
    CONSTRAINT PK_Personal PRIMARY KEY (ID)
);

CREATE TABLE Tickets (
	ID INT AUTO_INCREMENT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Descripcion VARCHAR(100) NULL,
    Prioridad TINYINT NOT NULL,
    Personal INT NOT NULL,
    Categoria SMALLINT NOT NULL,
    Estatus CHAR(3) NOT NULL,
    Baja BIT NOT NULL DEFAULT 0,
    CONSTRAINT PK_Tickets PRIMARY KEY (ID),
    CONSTRAINT FK_ProridadTicket FOREIGN KEY (Prioridad) REFERENCES Cat_PrioridadesTicket (ID),
    CONSTRAINT FK_PersonalTicket FOREIGN KEY (Personal) REFERENCES Personal (ID),
    CONSTRAINT FK_CategoriaTicket FOREIGN KEY (Categoria) REFERENCES Cat_CategoriasTicket (ID),
    CONSTRAINT FK_EstatusTicket FOREIGN KEY (Estatus) REFERENCES Cat_EstatusTicket (ID)
);

CREATE VIEW Vi_Tickets
AS
	SELECT T.ID as IDTicket, T.Nombre, T.Descripcion, T.ID as IDPrioridad, T.Descripcion as Prioridad,
			PE.ID as IDPersonal, PE.Nombre as NombrePersonal, PE.Apellidos as ApellidosPersonal, PE.Telefono as TelefonoPersonal, PE.Direccion as DireccionPersonal,
            CT.ID as IDCategoria, CT.Nombre as Categoria, 
            ET.ID as IDEstatus, ET.Descripcion as Estatus,
            T.Baja as TicketBaja
    FROM Tickets T
    INNER JOIN Cat_PrioridadesTicket PT ON (T.Prioridad = PT.ID)
    INNER JOIN Personal PE ON (T.Personal = PE.ID)
    INNER JOIN Cat_CategoriasTicket CT ON (T.Categoria = CT.ID)
    INNER JOIN Cat_EstatusTicket ET ON (T.Estatus = ET.ID);