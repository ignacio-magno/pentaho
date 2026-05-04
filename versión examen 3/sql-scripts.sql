create table inacap_2.ventas
(
    id_venta           bigint unsigned auto_increment
        primary key,
    nombre_producto    varchar(100)   not null,
    categoria          varchar(50)    not null,
    cantidad_vendida   int unsigned   not null,
    precio_total_venta decimal(12, 2) not null,
    fecha              datetime       not null,
    constraint id_venta
        unique (id_venta)
);

CREATE TABLE inacap.inventario (
    codigoid              serial PRIMARY KEY,
    nombre                VARCHAR(100)   NOT NULL,
    categoria             VARCHAR(50)    NOT NULL,
    cantidad_disponible   INT UNSIGNED   NOT NULL,
    precio_unitario       DECIMAL(12, 2) NOT NULL
);



create table inacap_2.categorias (
    id_categoria serial primary key,
    nombre_categoria varchar(50) not null
)

INSERT INTO inacap_2.categorias (nombre_categoria) VALUES
                                                       ('Tecnologia'),
                                                       ('Hogar'),
                                                       ('Vestuario'),
                                                       ('Deportes'),
                                                       ('Belleza'),
                                                       ('Salud'),
                                                       ('Jugueteria'),
                                                       ('Libreria'),
                                                       ('Mascotas'),
                                                       ('Automotriz'),
                                                       ('Ferreteria'),
                                                       ('Jardineria'),
                                                       ('Electrohogar'),
                                                       ('Papeleria'),
                                                       ('Alimentos'),
                                                       ('Bebidas'),
                                                       ('Videojuegos'),
                                                       ('Accesorios'),
                                                       ('Oficina'),
                                                       ('Viajes');


create table inacap_2.dim_fecha
(
    id_fecha bigint unsigned auto_increment
        primary key,
    dia      int null,
    mes      int null,
    año      int null,
    constraint fecha_unica
        unique (dia, mes, año),
    constraint id_fecha
        unique (id_fecha)
);

create table inacap_2.dim_producto
(
    id_producto     varchar(50) not null
        primary key,
    nombre_producto varchar(50) null
);

create table inacap_2.fact_ventas
(
    `Venta/ID`              int         null,
    `Precio total de venta` bigint      null,
    monto_total             double      null,
    id_producto             varchar(50) null,
    id_fecha                bigint      null
);

