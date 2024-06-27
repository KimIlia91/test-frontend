'use server'

import { sql } from "@vercel/postgres"
import { Partner, PartnersTable, User, UserProfile } from "@/lib/definitions"
import { auth } from "@/auth";


export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM test_users WHERE email=${email}`
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error)
      throw new Error('Failed to fetch user.')
    }
}

export async function addUser(name: string, email: string, hashPassword: string) {
    try {
        await sql`
            INSERT INTO test_users (name, email, password)
            VALUES (${name}, ${email}, ${hashPassword})
        `
    } catch(error) {
        console.error('Failed to create user:', error)
        throw new Error('Failed to create user.')
    }
}

export async function fetchPartnersTable(offset: number) {
    try {
        const session = await auth()
        const userId = session?.user?.id!
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
            ORDER BY p.name
            OFFSET ${offset}
            LIMIT 8;
        `
        
        return partners.rows
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch partners table.')
    }
    
}

export async function fetchPartnersPerPage(offset: number) {
    try {
        const count = await sql`
            SELECT COUNT(*)
            FROM(
                SELECT
                    p.id,
                    p.name
                FROM partners p
                LEFT JOIN users_favorites uf ON p.id = uf.partner_id
                ORDER BY p.name
                OFFSET ${offset}
                LIMIT 9
            ) as subquery
        `
        
        return Number(count.rows[0].count)
    } catch(error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch partners table.')
    }
}

export async function createUserFavorite(userId: string, partnerId: string) {
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
    try {
        console.log(id)
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