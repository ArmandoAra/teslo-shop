export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //TODO: type: ValidType;
    gender: Category;
}

export interface ICartProduct {
    id: string; // product id
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size;
    image: string;
}

export type Category = 'men' | 'women' | 'kid' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidType = 'shirts' | 'pants' | 'hoodies' | 'hats';