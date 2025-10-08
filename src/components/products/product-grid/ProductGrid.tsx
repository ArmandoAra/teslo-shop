import type { Product, ImagesProps } from '@/interfaces';
import ProductGridItem from './ProductGridItem';

interface Props {
    products: (Product & { ProductImage: ImagesProps[] })[];
}

export default function ProductGrid({ products }: Props) {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
            {products.map((product) => (
                product.ProductImage.length > 0 && (
                    <ProductGridItem
                        key={product.slug}
                        product={product}
                    />
                )))}

        </div>
    );
}