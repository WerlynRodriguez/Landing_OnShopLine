const url = 'https://dummyjson.com/';
const branches = Object.freeze({
    Product: 'products',
    Products : 'products',
    Category : 'category',
    Categories : `categories`,
    Search : 'search',
});

/** Endpoints for Products */
export const prdctsEndpoints = Object.freeze({
    get : {
        /** Get all products
         */
        all : () => `${branches.Products}/`,
        
        /** Get all products by Category
         * @param {string} category - Category to get products  
         */
        byCategory : (
            category,
        ) => `${branches.Products}/${branches.Category}/${category}/`,
    }
});

/** Extra string for Fetch data from API limiting the results
 * @param {number} limit - Limit of products to get
 * @param {number} offset - Offset of products to get 
 */
export const limitResults = (
    limit = 10,
    offset = 0
) => `limit=${limit}&offset=${offset}`;

/** Extra string for Fetch data with searching parameters
 * @param {string} search - Search string to search products
 */
export const search = (
    search = ''
) => `${branches.Search}?q=${search}`;

/** Select specific parameters from an object (SQL SELECT)
 * @param {string[]} params - Parameters to select
 * @returns {string} - String with the parameters to select
 */
export const selectParams = (
    params = []
) => `select=${params.join(',')}`;

/** Basic fetch function
 * @param {string} path - Path to fetch
 * @param {AbortSignal} signal - AbortSignal to abort fetch request
 * @returns {Promise} - Promise with the response 
 */
export async function fetchBasic (path, signal = null) {
    try {
        const response = await fetch(url + path, { signal });
        return await response.json();
    } catch (error) {
        if (error.name === "AbortError") 
            console.log("Fetch aborted");
        else {
            alert("An error has ocurred" + error);
            console.error(error);
        }
    }
}