'use server'

import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from 'next/cache'
import { auth } from "@/auth";
import { DEFAULT_LIMIT } from "@/lib/constants";
import { Partner, PartnersTable, User, UserProfile } from "@/lib/definitions"

export async function getUserByEmail(email: string) {
    noStore()
    try {
      const user = await sql<User>`SELECT * FROM test_users WHERE email=${email}`
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
}

export async function addUser(name: string, email: string, hashPassword: string) {
    noStore()
    try {
        await sql`
            INSERT INTO test_users (name, email, password, image)
            VALUES (${name}, ${email}, ${hashPassword}, '/users/unknown-person.jpeg')
        `
    } catch(error) {
        console.error('Failed to create user:', error)
        throw new Error('Failed to create user.')
    }
}

export async function fetchPartnersTable(
    cursor: string,
    userId: string,
    limit: number = DEFAULT_LIMIT
) {
    noStore()
    try {
        const partners = await sql<PartnersTable>`
            SELECT
                p.id,
                p.name,
                p.image,
                p.email,
                p.phone,
                p.description,
                CASE WHEN uf.user_id IS NOT NULL THEN TRUE ELSE FALSE END AS is_favorite
            FROM partners p
            LEFT JOIN users_favorites uf ON p.id = uf.partner_id AND uf.user_id = ${userId}
            WHERE p.id > ${cursor}
            ORDER BY p.id
            LIMIT ${limit};
        `

        return partners.rows
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch partners table.')
    }
}

export async function fetchIsPartnersHasNextPage(
    cursor: string,
    limit: number = DEFAULT_LIMIT
) {
    noStore()
    try {
        const result = await sql`
            SELECT COUNT(*)
            FROM (
                SELECT 1
                FROM partners p
                WHERE p.id > ${cursor}
                ORDER BY p.id
                LIMIT ${limit + 1}
            ) AS subquery;
        `
        
        const rowCount = result.rows[0].count ?? 0
        return rowCount > limit
    } catch(error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch partners table.')
    }
}

export async function createUserFavorite(userId: string, partnerId: string) {
    noStore()
    try {
        await sql`
            INSERT INTO users_favorites (user_id, partner_id)
            VALUES (${userId}, ${partnerId})
        `
    } catch(error) {
        console.error('Database Error:', error)
        throw new Error('Failed to create user favorite.')
    }
}

export async function deleteUserFavorite(userId: string, partnerId: string) {
    noStore()
    try {
        await sql`
            DELETE FROM users_favorites 
            WHERE user_id=${userId} AND partner_id=${partnerId}
        `
    } catch(error) {
        console.error('Database Error:', error)
        throw new Error('Failed to delete user favorite.')
    }
}

export async function fetchPartnerById(id: string) {
    noStore()
    try {
        const partner = await sql<Partner>`
            SELECT 
                p.id,
                p.name,
                p.email,
                p.phone,
                p.image,
                p.description
            FROM partners p
            WHERE p.id = ${id}
        `

        return partner.rows[0]
    } catch(error) {
        console.error('Database Error:', error)
        return null
    }
}

export async function featchUserProfile() {
    noStore()
    try {
        const session = await auth()
        const userId = session?.user?.id!
        const user = await sql<UserProfile>`
            SELECT
                u.name,
                u.email,
                u.image
            FROM test_users u
            WHERE u.id = ${userId}
        `

        return user.rows[0]
    } catch(error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch user profile.')
    }
}