"use client";

import { Size } from "@/generated/prisma";
import { ImagesProps } from "@/interfaces"
import { Category, Product } from "@/interfaces";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { createOrUpdateProduct, deleteProductImage } from "@/actions";
import ProductImage from "@/components/product/product-image/ProductImge";
import { useRouter } from "next/navigation";

interface Props {
    product: Partial<Product> & { ProductImage?: ImagesProps[] };
    categories: { id: string; name: string }[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
    title: string;
    slug: string;
    description: string;
    price: number;
    tags?: string; //Camisa, ropa, hombre Se va  a insertar en la base de datos como un set
    gender: string;
    category: Category;
    categoryId: string;
    inStock: number;
    sizes: Size[];

    images?: FileList;

}


export const ProductForm = ({ product, categories }: Props) => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { isValid },
        getValues,
        setValue,
        watch
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product?.sizes || []
        }
    });

    const onSizeChange = (size: Size) => {
        const currentSizes = new Set(getValues("sizes"));
        if (currentSizes.has(size)) {
            currentSizes.delete(size);
        } else {
            currentSizes.add(size);
        }

        watch('sizes');
        setValue("sizes", Array.from(currentSizes));
    }

    const handleSubmitForm = async (data: FormInputs) => {
        const formData = new FormData(); //Este formData es proprio de JS
        const { images, ...productToSave } = data; //Hacemos esto para no tener que refactorizar todo el código

        // Otra forma de hacerlo
        if (product.id) {
            formData.append('id', product.id);
        }
        formData.append('title', productToSave.title);
        formData.append('slug', productToSave.slug);
        formData.append('description', productToSave.description);
        formData.append('price', productToSave.price.toString());//Esto va a dar problemas porque el prisma espera un number
        formData.append('inStock', productToSave.inStock.toString());
        formData.append('sizes', productToSave.sizes.toString());
        formData.append('tags', productToSave.tags || '');
        formData.append('categoryId', productToSave.categoryId);
        formData.append('gender', productToSave.gender);

        if (images) {
            Array.from(images).forEach(image => {
                formData.append('images', image);
            });
        }

        const { ok, product: updatedProduct } = await createOrUpdateProduct(formData);

        if (!ok) return alert('Error al crear/actualizar el producto')

        router.replace(`/admin/product/${updatedProduct?.slug}`)


        //TODO: images
    }

    return (
        <form
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
            onSubmit={handleSubmit(handleSubmitForm)}
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Título</span>
                    <input
                        title="title"
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("title", { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input
                        title="slug"
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("slug", { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Descripción</span>
                    <textarea
                        title="description"
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("description", { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input
                        title="price"
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("price", { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input
                        title="tags"
                        type="text"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("tags", { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select
                        title="gender"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("gender", { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Category</span>
                    <select
                        title="category"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("categoryId", { required: true })}
                    >
                        <option value="">[Seleccione]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>
                {!isValid && <p className="mb-2 text-red-500">* Please fill all required fields</p>}
                {isValid &&
                    <button type="submit" className="btn-primary w-full">
                        Guardar
                    </button>}
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Inventory</span>
                    <input
                        title="inventory"
                        type="number"
                        className="p-2 border rounded-md bg-gray-200"
                        {...register("inStock", { required: true, min: 0 })}
                    />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Tallas</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                //  <--- si está seleccionado
                                <div
                                    key={size}
                                    className={
                                        clsx("flex bg-blue-500 cursor-pointer text-white items-center justify-center w-10 h-10 mr-2 border rounded-md", {
                                            'bg-blue-500 text-white': getValues("sizes").includes(size as Size),
                                            'bg-gray-200': !getValues("sizes").includes(size as Size),
                                        }
                                        )}
                                    onClick={() => {
                                        onSizeChange(size as Size);
                                    }}
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Fotos</span>
                        <input
                            type="file"
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                            placeholder="Seleccione varias imágenes"
                            {...register("images")}
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 justify-items-center">
                        {
                            product?.ProductImage?.map((img) => (
                                <div key={img.id} className="h-28 w-28 rounded-lg border bg-gray-200">
                                    <ProductImage
                                        src={img.url}
                                        alt={product.title || ''}
                                        className="h-full w-full object-cover rounded-t-lg"
                                        width={112}
                                        height={112}
                                    />
                                    <button
                                        type="button"
                                        className="text-black hover:text-red-400 hover:bg-black bg-red-400 w-full text-center rounded-b-lg p-2 "
                                        onClick={() =>
                                            //Usamos el id para borrar de la DB y la url para borrar del servidor
                                            deleteProductImage(img.id, img.url).then(({ ok, message }) => {
                                                if (ok) {
                                                    router.refresh();
                                                } else {
                                                    alert(message);
                                                }
                                            })}>
                                        <p className="">Remove </p>

                                    </button>
                                </div>
                            ))
                        }
                    </div>


                </div>
            </div>
        </form>
    );
};