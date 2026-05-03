CREATE TABLE inacap.ventas (
    id_venta              serial PRIMARY KEY,
    nombre_producto       VARCHAR(100)   NOT NULL,
    categoria             VARCHAR(50)    NOT NULL,
    cantidad_vendida      INT UNSIGNED   NOT NULL,
    precio_total_venta    DECIMAL(12, 2) NOT NULL,
    fecha                 DATETIME       NOT NULL
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