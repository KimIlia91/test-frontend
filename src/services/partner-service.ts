'use server'

import { auth } from "@/auth"
import { createUserFavorite, deleteUserFavorite, fetchIsPartnersHasNextPage, fetchPartnersTable } from "@/data/repository"

export async function setIsFavorite(partnerId: string) {
    try {
        const session = await auth()
        const userId = session?.user?.id!
        await createUserFavorite(userId, partnerId)
        return {message: "Лайк добавлен"}
    } catch(error) {
        console.error('Failed to update favorite status:', error)
        return { error: "Error while fetching data" }
    }
}

export async function deleteIsFavorite(partnerId: string) {
    try {
        const session = await auth()
        const userId = session?.user?.id!
        await deleteUserFavorite(userId, partnerId)
        return {message: "Лайк удален"}
    } catch(error) {
        console.error('Failed to update favorite status:', error)
        return { error: "Error while fetching data" }
    }
}

export async function getPartnersTablePage(paramsCursor: string, userId?: string | null) {
    if (!userId) throw new Error("userId is required")

    const [partners, hasNextPartnersPage] = await Promise.all([
        fetchPartnersTable(paramsCursor, userId),
        fetchIsPartnersHasNextPage(paramsCursor)
    ])
    // console.log(partners)
    return { partners, hasNextPartnersPage }
}
