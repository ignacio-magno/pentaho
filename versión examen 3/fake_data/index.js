require("dotenv").config();
const { fakerES: faker } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

const DEFAULTS = {
	DB_HOST: "127.0.0.1",
	DB_PORT: 3306,
	DB_USER: "root",
	DB_PASSWORD: "Admin007",
	DB_NAME: "inacap_2",
	ITEM_COUNT: 120,
	SEED_TARGET: "ventas", // "inventario" | "ventas"
    FROM_DATE: "2023-01-01",
};

function parsePositiveInt(value, fallback) {
	const parsed = Number.parseInt(value, 10);
	if (!Number.isFinite(parsed) || parsed <= 0) {
		return fallback;
	}
	return parsed;
}

function getConfig() {
	return {
		host: process.env.DB_HOST || DEFAULTS.DB_HOST,
		port: parsePositiveInt(process.env.DB_PORT, DEFAULTS.DB_PORT),
		user: process.env.DB_USER || DEFAULTS.DB_USER,
		password: process.env.DB_PASSWORD ?? DEFAULTS.DB_PASSWORD,
		database: process.env.DB_NAME || DEFAULTS.DB_NAME,
		itemCount: parsePositiveInt(process.env.ITEM_COUNT, DEFAULTS.ITEM_COUNT),
		seedTarget: (process.env.SEED_TARGET || DEFAULTS.SEED_TARGET).toLowerCase(),
        fromDate: process.env.FROM_DATE || DEFAULTS.FROM_DATE,
	};
}

function createPool(config) {
	return mysql.createPool({
		host: config.host,
		port: config.port,
		user: config.user,
		password: config.password,
		database: config.database,
		waitForConnections: true,
		connectionLimit: 10,
	});
}

// ── Inventario ────────────────────────────────────────────────────────────────

function buildInventarioRows(itemCount, categories) {
	const rows = [];
	for (let i = 0; i < itemCount; i += 1) {
		rows.push([
			faker.commerce.productName().slice(0, 100),
			faker.helpers.arrayElement(categories),
			faker.number.int({ min: 0, max: 500 }),
			Number(faker.commerce.price({ min: 1000, max: 1500000, dec: 2 })),
		]);
	}
	return rows;
}

async function seedInventario(pool, config) {
	const [catRows] = await pool.query("SELECT nombre_categoria FROM inacap_2.categorias");
	if (catRows.length === 0) throw new Error("La tabla inacap_2.categorias está vacía.");
	const categories = catRows.map((r) => r.nombre_categoria);

	const rows = buildInventarioRows(config.itemCount, categories);
	const [result] = await pool.query(
		"INSERT INTO inacap_2.inventario (nombre, categoria, cantidad_disponible, precio_unitario) VALUES ?",
		[rows]
	);
	console.log(`Insertados ${result.affectedRows} registros en inacap_2.inventario.`);
}

// ── Ventas ────────────────────────────────────────────────────────────────────

function buildVentasRows(itemCount, productos) {
	const rows = [];
	for (let i = 0; i < itemCount; i += 1) {
		const producto = faker.helpers.arrayElement(productos);
		const cantidad = faker.number.int({ min: 1, max: 10 });
		const precioTotal = Number((cantidad * producto.precio_unitario).toFixed(2));
		const fecha = faker.date.between({ from: config.fromDate, to: new Date() });
		rows.push([
			producto.nombre,
			producto.categoria,
			cantidad,
			precioTotal,
			fecha,
		]);
	}
	return rows;
}

async function seedVentas(pool, config) {
	const [productos] = await pool.query(
		"SELECT nombre, categoria, precio_unitario FROM inacap_2.inventario"
	);
	if (productos.length === 0) throw new Error("La tabla inacap_2.inventario está vacía. Ejecuta seed inventario primero.");

	const rows = buildVentasRows(config.itemCount, productos);
	const [result] = await pool.query(
		"INSERT INTO inacap_2.ventas (nombre_producto, categoria, cantidad_vendida, precio_total_venta, fecha) VALUES ?",
		[rows]
	);
	console.log(`Insertados ${result.affectedRows} registros en inacap.ventas.`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
	const config = getConfig();
	const pool = createPool(config);

	console.log(`Modo: ${config.seedTarget} | Items: ${config.itemCount} | DB: ${config.host}:${config.port}/${config.database}`);

	try {
		if (config.seedTarget === "ventas") {
			await seedVentas(pool, config);
		} else {
			await seedInventario(pool, config);
		}
	} catch (error) {
		console.error("Error durante el seed:", error.message);
		process.exitCode = 1;
	} finally {
		await pool.end();
	}
}

main();