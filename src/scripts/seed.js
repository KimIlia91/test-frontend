const { db } = require('@vercel/postgres')
const {
    users,
    usersFavorites,
    partners,
} = require('../scripts/seed-data.js')

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createUsersTable = await client.sql`
            CREATE TABLE IF NOT EXISTS test_users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                image VARCHAR(255)
            );
        `

        console.log(`Created "users" table`)

        const insertedUsers = await Promise.all(
            users.map(async(user) => {
                return client.sql`
                    INSERT INTO test_users (id, name, email, password, image)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${user.password}, ${user.image})
                    ON CONFLICT (id) DO NOTHING;
                `
            })
        )

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createUsersTable,
            users: insertedUsers,
        };
    } catch(error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedPartners(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createPartnersTable = await client.sql`
            CREATE TABLE IF NOT EXISTS partners (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                description TEXT NOT NULL
            );
        `

        console.log(`Created "partners" table`)

        const insertedPartners = await Promise.all(
            partners.map(async(partner) => {
                return client.sql`
                    INSERT INTO partners (id, name, email, image, phone, description)
                    VALUES (${partner.id}, ${partner.name}, ${partner.email}, ${partner.image}, ${partner.phone}, ${partner.description})
                    ON CONFLICT (id) DO NOTHING;
                `
            })
        )

        console.log(`Seeded ${insertedPartners.length} partners`)

        return {
            createPartnersTable,
            partners: insertedPartners,
        }

    } catch(error) {
        console.error('Error seeding partners:', error);
        throw error;
    }
}

async function seedUsersFavorites(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        const createUsersFavoritesTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users_favorites (
                user_id UUID NOT NULL,
                partner_id UUID NOT NULL,
                PRIMARY KEY(user_id, partner_id)
            );
        `

        console.log(`Created "users_favorites" table`)

        const insertUsersFavorites = await Promise.all(
            usersFavorites.map(async(userFavorite) => {
                return client.sql`
                    INSERT INTO users_favorites (user_id, partner_id)
                    VALUES (${userFavorite.user_id}, ${userFavorite.partner_id})
                `
            })
        )

        console.log(`Seeded ${insertUsersFavorites.length} users favorites`)

        return {
            createUsersFavoritesTable,
            usersFavorites: insertUsersFavorites,
        }
    } catch(error) {
        console.error('Error seeding users favorites:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect()
  
    await seedUsers(client)
    await seedPartners(client)
    await seedUsersFavorites(client)
  
    await client.end()
}

main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    )
})