-- DROP DATABASE IF EXISTS hermes;
-- CREATE DATABASE hermes;

DROP TABLE IF EXISTS permissions CASCADE;
CREATE TABLE permissions(
    id_permission SERIAL NOT NULL,
    name VARCHAR(60) NOT NULL,
    state BOOLEAN NOT NULL,
    CONSTRAINT pk_idPermission PRIMARY KEY (id_permission),
    CONSTRAINT uc_namePermissions UNIQUE (name),
    CONSTRAINT chk_namePermissions CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$')
);
SELECT * FROM permissions;

DROP TABLE IF EXISTS privileges CASCADE;
CREATE TABLE privileges(
    id_privilege SERIAL NOT NULL,
    name VARCHAR(60) NOT NULL,
    id_permission INTEGER NOT NULL,

    CONSTRAINT pk_idPrivilege PRIMARY KEY (id_privilege),
    CONSTRAINT fk_idPermission FOREIGN KEY (id_permission) REFERENCES permissions(id_permission),
    CONSTRAINT uc_namePrivilege UNIQUE (name),
    CONSTRAINT chk_namePrivileges CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$')
);
SELECT * FROM privileges; 

  

DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles(
    idRole SERIAL NOT NULL,
    name VARCHAR(60) NOT NULL,
    state BOOLEAN NOT NULL,

  
    CONSTRAINT pk_idRole PRIMARY KEY (idRole),
    CONSTRAINT uc_nameRole UNIQUE (name),
    CONSTRAINT chk_nameRole CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$')
);
SELECT * FROM roles;

DROP TABLE IF EXISTS role_privilege CASCADE;
CREATE TABLE role_privileges(
    idRole_privilege SERIAL NOT NULL,
    idRole INTEGER NOT NULL,
    id_privilege INTEGER NOT NULL,
    
    CONSTRAINT pk_idRolePrivilege PRIMARY KEY (idRole_privilege),
    CONSTRAINT fk_idRole FOREIGN KEY (idRole) REFERENCES roles(idRole),
    CONSTRAINT fk_idPrivilege FOREIGN KEY (id_privilege) REFERENCES privileges(id_privilege)
);
SELECT * FROM role_privilege;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users( 
    idUser SERIAL NOT NULL,
    idRole INTEGER NOT NULL,
    documentType VARCHAR(5) NOT NULL,
    identification VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    state BOOLEAN,

    CONSTRAINT pk_idUser PRIMARY KEY (idUser),
    CONSTRAINT fk_idRoleUser FOREIGN KEY (idRole) REFERENCES roles(idRole),
    CONSTRAINT chk_documentTypeUser CHECK (documentType ~ '^(CC|CE|PA|SC|CD|TE|PEP|AS|DU|CCEX|CEEX|PAEX|SCEX|CDEX|TEX|RNEX|PEPEX|ASEX)$'),
    CONSTRAINT chk_identificationUser CHECK (identification ~ '^[a-z0-9]{6,}$'),
    CONSTRAINT chk_emailUser CHECK (email ~ '^[a-z0-9.!#$%&*+/=?^_`{|}~-]+@[a-z0-9-]+\.[a-z0-9.]{2,}$')

);
SELECT * FROM users;

DROP TABLE IF EXISTS category_services CASCADE;
CREATE TABLE category_services(
    id_categoryService SERIAL NOT NULL,
    name VARCHAR(60) NOT NULL,

    CONSTRAINT PK_categoryService PRIMARY KEY (id_categoryService),
    CONSTRAINT chk_nameCategoryServices CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT UC_nameCategoryService UNIQUE (name)
);
SELECT * FROM category_services;

DROP TABLE IF EXISTS services CASCADE;
CREATE TABLE services(
    id_service SERIAL NOT NULL,
    id_categoryService INTEGER NOT NULL,
    name VARCHAR(60) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    status BOOLEAN NOT NULL,
    
    CONSTRAINT PK_Service PRIMARY KEY (id_service),
    CONSTRAINT UC_nameService UNIQUE (name),
    CONSTRAINT FK_categoryService FOREIGN KEY (id_categoryService) REFERENCES category_services(id_categoryService),
    CONSTRAINT chk_nameServices CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_priceService CHECK (CAST(price AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$')
);
SELECT * FROM services;

DROP TABLE IF EXISTS packages CASCADE;
CREATE TABLE  packages (
    id_package SERIAL NOT NULL,
    name  VARCHAR (60),
    destination VARCHAR (60),
    price DECIMAL (15,2),
    status  BOOLEAN,
    
    CONSTRAINT pk_packages PRIMARY KEY (id_package),
    CONSTRAINT chk_namePackage  CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_destinationPackage  CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_pricePackage CHECK  (CAST(price AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$')
);
SELECT * FROM packages;

DROP TABLE IF EXISTS programation_packages CASCADE;
CREATE TABLE  programation_packages (
    id_programation  SERIAL NOT NULL,
    date_start DATE NOT NULL,
    date_end  DATE NOT NULL,
    date_execution  DATE NOT NULL,
    date_ending DATE NOT NULL,

    CONSTRAINT pk_idProgramation PRIMARY KEY (id_programation),
    CONSTRAINT chk_dateStart CHECK (date_start >= current_date),
    CONSTRAINT chk_dateEnd CHECK (date_end >= current_date + interval '7 days'),
    CONSTRAINT chk_dateExecution CHECK (date_execution >= date_end + interval '5 days'),
    CONSTRAINT chk_dateEnding CHECK (date_ending >= date_execution)

);
SELECT * FROM programation_packages; 

DROP TABLE IF EXISTS detail_programming_packages CASCADE;
CREATE TABLE detail_programming_packages (
    idDetailProgrammingPackage SERIAL NOT NULL,
    id_package  INTEGER NOT NULL,
    id_programation  INTEGER NOT NULL,
    price_package  DECIMAL (15,2),
    status  BOOLEAN,

    CONSTRAINT pk_detailProgrammingPackages PRIMARY KEY (idDetailProgrammingPackage),
    CONSTRAINT fk_packages FOREIGN KEY (id_package) REFERENCES packages(id_package),
    CONSTRAINT fk_programation_packages FOREIGN KEY (id_programation) REFERENCES programation_packages(id_programation),
    CONSTRAINT chk_pricePackage CHECK (CAST(price_package AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$')
);
SELECT * FROM detail_programming_packages;

DROP TABLE IF EXISTS detail_package_service CASCADE;
CREATE TABLE detail_package_service(
    id_detail_package_service SERIAL NOT NULL,
    id_package INTEGER NOT NULL,
    id_service INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(15,2),

    CONSTRAINT pk_idDetailPackageService PRIMARY KEY (id_detail_package_service),
    CONSTRAINT fk_idPackage FOREIGN KEY (id_package) REFERENCES packages(id_package),
    CONSTRAINT fk_idService FOREIGN KEY (id_service) REFERENCES services(id_service),
    CONSTRAINT chk_quantityDetailPackageService CHECK (CAST(quantity AS TEXT) ~ '^[0-9]{2,}$'),
    CONSTRAINT chk_priceDetailPackageService CHECK (CAST(price AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$')
);
SELECT * FROM detail_package_service;

DROP TABLE  IF EXISTS  detail_programming_packages_service CASCADE;
CREATE  TABLE  detail_programming_packages_service (
    idDetailProgrammingPackage_service SERIAL NOT NULL,
    idDetailProgrammingPackage INTEGER NOT NULL,
    id_detail_package_service INTEGER NOT NULL,
    quantity  INTEGER NOT NULL,
    price_service DECIMAL (15,2),
    
    CONSTRAINT  pk_idDetailProgrammingPackage_service  PRIMARY KEY (idDetailProgrammingPackage_service),
    CONSTRAINT  fk_idDetailProgrammingPackage FOREIGN KEY (idDetailProgrammingPackage) REFERENCES  detail_programming_packages(idDetailProgrammingPackage),
    CONSTRAINT fk_id_detail_package_service FOREIGN KEY (id_detail_package_service) REFERENCES detail_package_service(id_detail_package_service),
    CONSTRAINT chk_quantityPackageService CHECK (CAST(quantity AS TEXT) ~ '^[0-9]{2,}$'),
    CONSTRAINT chk_pricePackageService CHECK (CAST(price_service AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$')
);
SELECT * FROM detail_programming_packages_service;

DROP TABLE IF EXISTS customers CASCADE;
CREATE TABLE customers(
    idCustomer SERIAL NOT NULL,
    idUser INTEGER NOT NULL,
    name VARCHAR(60) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(40) NOT NULL,
    country INTEGER NOT NULL,
    departament INTEGER NOT NULL,
    municipality INTEGER NOT NULL,
    sex CHAR NOT NULL,
    bloodType VARCHAR(3) NOT NULL,
    eps VARCHAR(60) NOT NULL,
    state BOOLEAN NOT NULL,
    
    CONSTRAINT pk_idCustomer PRIMARY KEY (idCustomer),
    CONSTRAINT fk_idUser FOREIGN KEY (idUser) REFERENCES users(idUser),
    CONSTRAINT chk_nameCustomer CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_lastNameCustomer CHECK (lastName ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_phoneCustomer CHECK (phone ~ '^\+?[0-9]{1,3}[0-9]{7,}$'),
    CONSTRAINT chk_departamentCustomer CHECK (CAST(departament AS TEXT) ~ '^[0-9]$'),
    CONSTRAINT chk_municipalityCustomer CHECK (CAST(municipality AS TEXT) ~ '^[0-9]$'),
    CONSTRAINT chk_countryCustomer CHECK (CAST(country AS TEXT) ~ '^[0-9]$'),
    CONSTRAINT chk_sexCustomer CHECK (sex ~ '^(H|M)$'),
    CONSTRAINT chk_bloodTypeCustomer CHECK (bloodType ~ '^(A|B|AB|O)+[+|-]$'),
    CONSTRAINT chk_epsCustomer CHECK (eps ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
);
SELECT * FROM customers;

DROP TABLE IF EXISTS reservations CASCADE;
CREATE TABLE reservations(
    idReservation SERIAL NOT NULL,
    idDetailProgrammingPackage INTEGER NOT NULL,
    idCustomer INTEGER NOT NULL,
    dateReservation DATE DEFAULT CURRENT_DATE,
    priceReservation DECIMAL(15,2) NOT NULL,
    numberCompanions INTEGER NOT NULL,
    travelCustomer BOOLEAN NOT NULL,
    status CHAR NOT NULL,
    
    CONSTRAINT pk_idReservation PRIMARY KEY (idReservation),
    CONSTRAINT fk_idDetailProgrammingPackage FOREIGN KEY (idDetailProgrammingPackage) REFERENCES detail_programming_packages(idDetailProgrammingPackage),
    CONSTRAINT fk_idCustomer FOREIGN KEY (idCustomer) REFERENCES customers(idCustomer),
    CONSTRAINT chk_priceReservation CHECK (CAST(priceReservation AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$'),
	--ESTADO DE RESERVA: Pendiente(no pago), Confirmada(pago 50%), Pagada(pago completo), Modificada, Cancelada(retiro cliente), Anulada (dates), En curso y Finalizada
    CONSTRAINT chk_statusReservation CHECK (status ~ '^(N|C|P|M|R|A|E|F)$')
);
SELECT * FROM reservations;

  

DROP TABLE IF EXISTS reserve_companions CASCADE;
CREATE TABLE reserve_companions(
    idReserveCompanion SERIAL NOT NULL,
    idReservation SERIAL NOT NULL,
    documentType VARCHAR(5) NOT NULL,
    identification VARCHAR(60) NOT NULL,
    name VARCHAR(60),
    lastName VARCHAR(50),
    phone VARCHAR(15),
    sex CHAR,
    bloodType VARCHAR(3),
    eps VARCHAR(60),
    
    CONSTRAINT pk_idReserveCompanion PRIMARY KEY (idReserveCompanion),
    CONSTRAINT fk_idReservation FOREIGN KEY (idReservation) REFERENCES reservations(idReservation),
    CONSTRAINT chk_documentTypeCompanion CHECK (documentType ~ '^(CC|CE|PA|SC|CD|TE|PEP|AS|DU|CCEX|CEEX|PAEX|SCEX|CDEX|TEX|RNEX|PEPEX|ASEX)$'),
    CONSTRAINT chk_identificationCompanion CHECK (identification ~ '^[a-z0-9]{6,}$'),
    CONSTRAINT chk_nameCompanion CHECK (name ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_lastNameCompanion CHECK (lastName ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
    CONSTRAINT chk_phoneCompanion CHECK (phone ~ '^\+?[0-9]{1,3}[0-9]{7,}$'),
    CONSTRAINT chk_sexCompanion CHECK (sex ~ '^[hm]$'),
    CONSTRAINT chk_bloodTypeCompanion CHECK (bloodType ~ '^(A|B|AB|O)+[+|-]$'),
    CONSTRAINT chk_epsCompanion CHECK (eps ~ '^[A-Z][a-zñ]{3,}[^\d\W_]*$'),
);
SELECT * FROM reserve_companions;

DROP TABLE IF EXISTS pay CASCADE;
CREATE TABLE pays ( 
    idPay SERIAL NOT NULL,
    idReservation INTEGER NOT NULL,
    date_pay DATE DEFAULT CURRENT_DATE,
    price DECIMAL(15,2) NOT NULL,
    voucher VARCHAR(255) NOT NULL,
    status CHAR NOT NULL,

    CONSTRAINT pk_pay PRIMARY KEY (idPay), 
    CONSTRAINT fk_reservation FOREIGN KEY (idReservation) REFERENCES reservations(idReservation), 
    CONSTRAINT chk_pricePay CHECK (CAST(price AS TEXT) ~ '^[1-9][0-9]*(\.[0-9]{1,2})?$'),
	-- ESTADOS DE PAGO: REVISAR, PAGO, NO PAGO, ANULADO
	CONSTRAINT chk_statusReservation CHECK (status ~ '^(R|P|N|A|)$')
);
SELECT * FROM pays;

-- DICTIONARY OF DATA
SELECT
    t1.TABLE_NAME AS tabla_nombre,
    t1.COLUMN_NAME AS columna_nombre,
    t1.COLUMN_DEFAULT AS columna_defecto,
    t1.IS_NULLABLE AS columna_nulo,
    t1.DATA_TYPE AS columna_tipo_dato,
    COALESCE(t1.NUMERIC_PRECISION,
    t1.CHARACTER_MAXIMUM_LENGTH) AS columna_longitud,
    PG_CATALOG.COL_DESCRIPTION(t2.OID,
    t1.DTD_IDENTIFIER::int) AS columna_descripcion,
    t1.DOMAIN_NAME AS columna_dominio
FROM 
    INFORMATION_SCHEMA.COLUMNS t1
    INNER JOIN PG_CLASS t2 ON (t2.RELNAME = t1.TABLE_NAME)
WHERE 
    t1.TABLE_SCHEMA = 'public'
ORDER BY
    t1.TABLE_NAME;