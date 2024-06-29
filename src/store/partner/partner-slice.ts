import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getCurrentCursor } from "@/lib/utils"
import { PartnersTable } from "@/lib/definitions"
import { fetchPartnersTable } from "./partner-thunk"
import { DEFAULT_CURSOR, ERROR_MESSAGE } from "@/lib/constants"

type PartnerState = {
    data: PartnersTable[]
    loading: boolean
    error: string | null
    hasNextPage: boolean
    cursor: string
}

const initialState: PartnerState = {
    data: [],
    loading: true,
    error: null,
    hasNextPage: false,
    cursor: DEFAULT_CURSOR
}

type PartnersTableAction = {
    partners: PartnersTable[]
    hasNextPage: boolean
}

const partnersTableSlice = createSlice({
    name: 'partnersTable',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                loading: action.payload
            }
        },
        setPartnersTable: (state, action: PayloadAction<PartnersTableAction>) => {
            const newPartners = action.payload.partners.filter(newPartner => (
                !state.data.some(existingPartner => existingPartner.id === newPartner.id)
            ))
            
            state.loading = false
            state.data = [...state.data, ...newPartners]
            state.hasNextPage = action.payload.hasNextPage
            state.cursor = getCurrentCursor(action.payload.partners)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPartnersTable.pending, (state) =>{
                state.error = null
                state.loading = true
            })
            .addCase(fetchPartnersTable.fulfilled, (state, action) => {
                const newPartners = action.payload.partners.filter(newPartner => (
                    !state.data.some(existingPartner => existingPartner.id === newPartner.id)
                ))

                state.loading = false
                state.data = [...state.data, ...newPartners]
                state.hasNextPage = action.payload.hasNextPage
                state.cursor = getCurrentCursor(action.payload.partners)
            })
            .addCase(fetchPartnersTable.rejected, (state, action) =>{
                state.loading = false
                state.error = action.error.message || ERROR_MESSAGE
            })
    }
})

export const { setIsLoading, setPartnersTable } = partnersTableSlice.actions

export default partnersTableSlice.reducer