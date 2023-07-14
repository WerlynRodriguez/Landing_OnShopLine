import { useEffect, useRef, useState } from "react"

import "./Landing.css"
import "../items/list.css"

import { 
    fetchBasic,
    prdctsEndpoints,
    limitResults,
    selectParams,
} from "../Api"

import DialogSearchBar from "../components/SearchBarDC"
import ItemProductList from "../items/ItemList"
import { useLoaderData } from "react-router-dom"
import ButtonIcon from "../components/ButtonIcon"
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import 'react-lazy-load-image-component/src/effects/opacity.css';

/** Loader of the Landing Page
 * @returns {Promise<{Fetch1: Array}>} - Data of the Landing Page 
 */
export async function Loader () {

    const Fetch1 = await fetchBasic(
        prdctsEndpoints.get.byCategory('smartphones') + 
        '?' + limitResults(4) +
        '&' + selectParams(['title', 'thumbnail']),
    )
    const Fetch2 = await fetchBasic(
        prdctsEndpoints.get.byCategory('skincare') +
        '?' + limitResults(4) +
        '&' + selectParams(['title', 'thumbnail']),
    )
    const Fetch3 = await fetchBasic(
        prdctsEndpoints.get.byCategory('laptops') +
        '?' + limitResults(4) +
        '&' + selectParams(['title', 'thumbnail']),
    )

    return {
        Fetch1 : Fetch1?.products || [],
        Fetch2 : Fetch2?.products || [],
        Fetch3 : Fetch3?.products || [],
    }
}

/** Render the Landing Page 
 * @returns {JSX.Element} Landing Page 
 */
export function Landing(props) {
    /** @type {{Fetch1: Array, Fetch2: Array, Fetch3: Array}} */
    let dataLoader = useLoaderData()

    const [listCat1, setListCat1] = useState(dataLoader.Fetch1)
    const [listCat2, setListCat2] = useState(dataLoader.Fetch2)
    const [listCat3, setListCat3] = useState(dataLoader.Fetch3)

    return (
    <>
    <main>

        <section id="banner">
            <h1> Did you know? </h1>
            <p>
                The best place to buy <br/>your favorite products
            </p>
        </section>

        <header>
            <h1> OnShopLine </h1>
            <DialogSearchBar id="btnSearchBar"/>
            <ButtonIcon id="btnCart" icon="shopping-bag" title="Cart"/>
            <ButtonIcon id="btnUser" icon="user" title="Profile"/>
        </header>

        <section id="cat-smartphone" className="list wrap">
            <h2> Smartphones </h2>
            <ul>
                { listCat1.map( ({title, thumbnail}, index) => (
                    <ItemProductList
                        key={index}
                        className="item"
                        title={title}
                        thumbnail={thumbnail}
                    />
                ))}
            </ul>
        </section>

        <picture className="banner-spot">
            <img src="https://picsum.photos/1000/300" alt="Banner spot"/>
        </picture>

        <section id="cat-skincare" className="list wrap">
            <h2> Skincare </h2>
            <ul>
                { listCat2.map( ({title, thumbnail}, index) => (
                    <ItemProductList
                        key={index}
                        className="item"
                        title={title}
                        thumbnail={thumbnail}
                        aspect="small"
                    />

                ))}
            </ul>
        </section>

        <picture className="banner-spot">
            <img src="https://picsum.photos/1000/300" alt="Banner spot"/>
        </picture>

        <section id="cat-laptops" className="list wrap">
            <h2> Laptops </h2>
            <ul>
                { listCat3.map( ({title, thumbnail}, index) => (
                    <ItemProductList
                        key={index}
                        className="item"
                        title={title}
                        thumbnail={thumbnail}
                    />
                ))}
            </ul>
        </section>
        
    </main>
    <footer>
        <p>© All rights reserved <br/>
        Created by: <a href="https://github.com/WerlynRodriguez">WerlynDev</a> with ❤️</p>
    </footer>

    </>
    )
}