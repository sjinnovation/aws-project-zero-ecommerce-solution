export const recommendFilter = (arr, productIds) => {
    // if(!brand) return arr;

    let filteredArray = arr.filter(function(product) {
        return productIds.indexOf(product.id) > -1;
    });
    return filteredArray;
    // return;
};