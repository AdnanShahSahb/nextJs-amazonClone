export interface ProdProp {
    category: string,
    description: string,
    id: number,
    image: string,
    price: number,
    rating: object,
    title: string
}

export interface StoreProdProp {
    id: number,
    title: string,
    quantity: number
    category: string,
    description: string,
    image: string,
    price: number,
    rating: object,
}

export interface StateProps {
    prodData: [],
    favData: [],
    userInfo: null | string,
    theSliceName: any
}