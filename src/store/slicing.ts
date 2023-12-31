import { StoreProdProp } from './../../types';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface StateProp {
    prodData: StoreProdProp[],
    favData: StoreProdProp[],
    allProds: StoreProdProp[],
    userInfo: null,
    searchedKeyword: string

}

const initialState: StateProp = {
    prodData: [],
    favData: [],
    allProds: [],
    userInfo: null,
    searchedKeyword: ''
}


export const theSlice = createSlice({
    name: 'theSliceName',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProd = state.prodData.find((d: StoreProdProp) => { if (d.title === action.payload.title) return d })
            if (existingProd)
                existingProd.quantity += 1;
            else
                state.prodData.push(action.payload)
        },
        switchToUserCart: (state, action) => {
            const existingProd = state.prodData.find((d: StoreProdProp) => d.title === action.payload.title);

            if (existingProd) {
                // Assuming prodData is an array of products
                const updatedProdData = state.prodData.map((prod: StoreProdProp) =>
                    prod.title === action.payload.title ? { ...prod, userid: action.payload.userid } : prod
                );

                return {
                    ...state,
                    prodData: updatedProdData,
                };
            }

        },
        addToFavs: (state, action) => {
            const existingProd = state.favData.find((d: StoreProdProp) => { if (d.title === action.payload.title) return d })
            if (!existingProd)
                state.favData.push(action.payload)
        },
        remFromFavs: (state, action) => {
            const existingProd = state.favData.filter((d: StoreProdProp) => { if (d.title !== action.payload.title) return d })
            if (existingProd)
                state.favData = existingProd
        },
        incQuantity: (state, action) => {
            const existingProd = state.prodData.find((d: StoreProdProp) => { if (d.title === action.payload.title) return d })
            if (existingProd)
                existingProd.quantity += 1;
            // else
            //     state.prodData.push(action.payload)
        },
        decQuantity: (state, action) => {
            const existingProd = state.prodData.find((d: StoreProdProp) => { if (d.title === action.payload.title) return d })
            if (existingProd && existingProd.quantity > 1) {
                existingProd.quantity -= 1
            }
        },
        remFromCart: (state, action) => {
            // console.log(action.payload.title,state.prodData);
            const filteredProdData = state.prodData.filter((d: StoreProdProp) => { if (d.title !== action.payload.title) return d })
            state.prodData = filteredProdData;
        },
        resetCart: (state) => {
            state.prodData = []
        },
        addUser: (state, action) => {
            state.userInfo = action.payload
        },
        removeUser: (state) => {
            state.userInfo = null;
        },
        setAllProds: (state, action) => {
            state.allProds = action.payload
        },
        setKeywordsForSearching: (state, action) => {
            // console.log(action.payload);
            state.searchedKeyword = action.payload
        }
    }
})

export const { addToCart } = theSlice.actions
export const { addToFavs } = theSlice.actions
export const { remFromFavs } = theSlice.actions
export const { incQuantity } = theSlice.actions
export const { decQuantity } = theSlice.actions
export const { remFromCart } = theSlice.actions
export const { resetCart } = theSlice.actions
export const { addUser } = theSlice.actions
export const { removeUser } = theSlice.actions
export const { setAllProds } = theSlice.actions
export const { setKeywordsForSearching } = theSlice.actions
export const { switchToUserCart } = theSlice.actions

export default theSlice.reducer;