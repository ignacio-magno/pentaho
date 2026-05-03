create table inacap.dim_fecha
(
    id_fecha bigint unsigned auto_increment
        primary key,
    dia      int      null,
    mes      int      null,
    año      int      null,
    fecha    datetime null,
    constraint id_fecha
        unique (id_fecha)
);


create table inacap.dim_producto
(
    id_producto     varchar(50) not null
        primary key,
    nombre_producto varchar(50) null
);

create table inacap.fact_ventas
(
    `Venta/ID`              varchar(7)  null,
    `Nombre (Producto)`     varchar(26) null,
    Categoría               varchar(10) null,
    `Cantidad vendida`      bigint      null,
    `Precio total de venta` bigint      null,
    fecha                   tinytext    null,
    `Código/ID`             varchar(8)  null,
    Nombre                  varchar(26) null,
    Categoría_1             varchar(10) null,
    `Cantidad disponible`   bigint      null,
    `Precio unitario`       bigint      null,
    monto_total             double      null,
    id_producto             varchar(50) null,
    nombre_producto         varchar(50) null,
    fecha_1                 varchar(24) null,
    dia                     int         null,
    mes                     int         null,
    año                     int         null,
    id_fecha                bigint      null
);

