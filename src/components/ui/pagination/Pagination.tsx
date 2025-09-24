'use client';
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePaginationNumbers } from "@/utils";

interface Props {
    totalPages: number;
}


export default function Pagination({ totalPages }: Props) {
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const pageNumber = Number(searchParams.get('page')) ?? 1;

    const currentPage = (isNaN(pageNumber) || pageNumber < 1) ? 1 : pageNumber;

    const paginationNumbers = generatePaginationNumbers(currentPage, totalPages);

    if (!totalPages || totalPages < 1) return null;

    const createPageUrl = (page: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (page === "...") {
            return `${pathName}?${params.toString()}`;
        }
        if (+page <= 0) {
            return `${pathName}?`; //href '/' y lo que venga en el path
        }

        if (+page > totalPages) {
            return `${pathName}?${params.toString()}`;
        }

        params.set('page', page.toString());
        return `${pathName}?${params.toString()}`;

    }

    return (
        <div className="flex justify-center text-center my-10 mb-32 items-center">
            <nav aria-label="Page navigation example ">
                <ul className="flex list-style-none justify-center items-center">
                    <li className="page-item"><a
                        className={"page-link  relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            + clsx({ ' pointer-events-none opacity-50': currentPage === 1 })
                        }
                        href={createPageUrl(currentPage - 1)} aria-disabled="true"><IoChevronBackOutline /></a></li>

                    {paginationNumbers.map((num, index) => (
                        <li className="page-item" key={index}>
                            <Link
                                className={
                                    "page-link relative block py-1.5 px-3 border-0  outline-none transition-all duration-300 rounded text-gray-800   focus:shadow-none select-none"
                                    + clsx({ ' bg-blue-600 text-white shadow-md focus:shadow-md': num === currentPage },
                                        { ' hover:text-white hover:bg-blue-600': num !== currentPage },
                                        { ' pointer-events-none': num === '...' },
                                        { ' pointer-events-none': num === currentPage },
                                    )
                                }
                                href={`${pathName}/?page=${num}`}>{num}</Link>
                        </li>
                    ))}
                    <li className="page-item"><a
                        className={"page-link  relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            + clsx({ ' pointer-events-none opacity-50': currentPage === totalPages })
                        }
                        href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline /></a></li>


                </ul>
            </nav>
        </div>
    );
}
