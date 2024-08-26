// import db from "./postgres"

// const createUserTable = async () => {

//     const queryText = `CREATE TABLE IF NOT EXISTS
//     users(
//         user_name VARCHAR(128) PRIMARY KEY NOT NULL UNIQUE,
//         password VARCHAR(128) NOT NULL,
//         email VARCHAR(128) UNIQUE NOT NULL,
//         verify_code INTEGER NOT NULL,
//         is_verified BOOLEAN DEFAULT FALSE,
//         verify_code_expires TIMESTAMP DEFAULT NOW() + INTERVAL '1 hour',
//         created_at TIMESTAMP DEFAULT NOW(),
//         updated_at TIMESTAMP DEFAULT NOW(),
//         is_accepting_messages BOOLEAN DEFAULT TRUE, 
//     )`;

//     const res = await db.query(queryText);
// }

// const createMessageTable = async () => {

//     const query = `CREATE TABLE IF NOT EXISTS
//         messages(
//             id SERIAL PRIMARY KEY,
//             content TEXT NOT NULL,
//             created_at TIMESTAMP DEFAULT NOW(),
//             receiver VARCHAR(128),
//             FOREIGN KEY (receiver) REFERENCES users(user_name) ON DELETE CASCADE
//         )
//     `
// }


// const createTables = async () => {
//     await createUserTable();
//     await createMessageTable();
// }

// export default createTables;