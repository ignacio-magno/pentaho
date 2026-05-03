require("dotenv").config();
const { fakerES: faker  } = require("@faker-js/faker");
const mysql = require("mysql2/promise");

const DEFAULTS = {
	DB_HOST: "127.0.0.1",
	DB_PORT: 3306,
	DB_USER: "root",
	DB_PASSWORD: "Admin007",
	DB_NAME: "inacap_2",
	ITEM_COUNT: 120,
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
	};
}

function buildFakeRows(itemCount, categories) {
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

async function seedInventario() {
	const config = getConfig();
	const pool = mysql.createPool({
		host: config.host,
		port: config.port,
		user: config.user,
		password: config.password,
		database: config.database,
		waitForConnections: true,
		connectionLimit: 10,
	});

	try {
		const [catRows] = await pool.query("SELECT nombre_categoria FROM inacap_2.categorias");
		if (catRows.length === 0) throw new Error("La tabla inacap_2.categorias está vacía.");
		const categories = catRows.map((r) => r.nombre_categoria);

		const rows = buildFakeRows(config.itemCount, categories);
		const insertSql = `
			INSERT INTO inacap_2.inventario
			(nombre, categoria, cantidad_disponible, precio_unitario)
			VALUES ?;
		`;

		const [result] = await pool.query(insertSql, [rows]);
		console.log(`Insertados ${result.affectedRows} registros en inacap_2.inventario.`);
		console.log(`Config usada: host=${config.host}, puerto=${config.port}, db=${config.database}, items=${config.itemCount}`);
	} catch (error) {
		console.error("Error al poblar la tabla inacap_2.inventario:", error.message);
		process.exitCode = 1;
	} finally {
		await pool.end();
	}
}

seedInventario();