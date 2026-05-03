CREATE TABLE inacap.ventas (
    id_venta              serial PRIMARY KEY,
    nombre_producto       VARCHAR(100)   NOT NULL,
    categoria             VARCHAR(50)    NOT NULL,
    cantidad_vendida      INT UNSIGNED   NOT NULL,
    precio_total_venta    DECIMAL(12, 2) NOT NULL,
    fecha                 DATETIME       NOT NULL
);
