// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedProductsWithImages } from '@/actions';
import { PageTitle } from '@/components';
import ProductImage from '@/components/product/product-image/ProductImge';
import Pagination from '@/components/ui/pagination/Pagination';
import { currencyFormatter } from '@/utils';
import clsx from 'clsx';

import Link from 'next/link';


interface Props {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function ManageProductsPage({ searchParams }: Props) {

    const params = await searchParams
    const page = params.page ? parseInt(params.page) : 1;

    const { products, totalPages } = await getPaginatedProductsWithImages({ page });



    return (
        <div className="w-full p-4 mb-20">
            <PageTitle title="Products Management" />

            {/* Link para nuevo producto */}
            <div className="my-10">
                <Link href="/admin/product/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    New Product
                </Link>
            </div>

            <div className="flex items-center mb-10 w-full justify-center">
                <table className="">
                    <thead className=" bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Image
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Title
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Gender
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Inventory
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Sizes
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products?.map(product => (
                                <tr key={product.id} className={
                                    clsx(
                                        (product.inStock === 0 || product.ProductImage.length === 0)
                                            ? 'bg-red-200 hover:bg-red-300'
                                            : " bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                    )
                                }>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/product/${product.slug}`} className="hover:underline">
                                            <ProductImage
                                                src={product.ProductImage[0]?.url}
                                                alt={product.title}
                                                width={80}
                                                height={80}
                                                className="rounded-md w-20 h-20 object-cover"
                                            />
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        {currencyFormatter(product.price)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.gender.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        {product.inStock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                        {product.sizes.join(', ')}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
            <Pagination totalPages={totalPages} />
        </div>
    );
}