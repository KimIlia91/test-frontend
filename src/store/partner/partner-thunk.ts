import { createAsyncThunk } from "@reduxjs/toolkit"
import { getPartnersTablePage } from "@/services/partner-service"

export const fetchPartnersTable = createAsyncThunk(
    'partnersTable/fetchPartnersTable',
    async (cursor: string, thunkAPI) => {
        const response = await getPartnersTablePage(cursor);
        return {
            partners: response.partners,
            hasNextPage: response.hasNextPartnersPage,
        }
    }
)
