




export const generatePaginationNumbers = (currentPage: number, totalPages: number): (number | string)[] => {

    // Si el numero total de paginas es 7 o menos 
    //Vamos a mostrar todas las paginas sin puntos suspensivos

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    //Si la pagina actual esta entre las tres primeras paginas
    //Mostramoslas primeras 3, puntos suspensivos y las ultimas 2
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    //Si la pagina actual esta entre las tres ultimas paginas
    //Mostramos las dos primeras, puntos suspensivos y las ultimas 3
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    //Si la pagina actual esta en el medio
    //Mostramos las dos primeras, puntos suspensivos, la pagina actual, puntos suspensivos y las dos ultimas
    return [1, 2, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1, totalPages];
};
