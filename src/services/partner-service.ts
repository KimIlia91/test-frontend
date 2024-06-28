'use server'

import { auth } from "@/auth"
import { createUserFavorite, deleteUserFavorite, fetchPartnersPerPage } from "@/data/repository"

export async function isLastPartners(offset: number) : Promise<boolean> {
    const count = await fetchPartnersPerPage(offset)
    return count > 8
}

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
