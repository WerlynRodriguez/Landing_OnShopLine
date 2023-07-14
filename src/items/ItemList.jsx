// interface ItemProductListProps {
//     title: string;
//     thumbnail: string;
//     price: number;
//     discount: number;
//     orientation: "vertical" | "horizontal";
//     aspect: "square" | "landscape" | "portrait";
// }

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/opacity.css'
import "./item-list.css"

const aspectProps = Object.freeze({
    "large"     :   "4/3",
    "small"     :   "3/4",
    "landscape" :   "16/9",
    "portrait"  :   "9/16",
    "square"    :   "1/1"
})

const orientationProps = Object.freeze({
    "vertical"  :   "column",
    "horizontal":   "row"
})

/** An item of the product list
 * @param {{title: string, thumbnail: string, price: number, discount: number, orientation: "vertical" | "horizontal", aspect: "large" | "small" | "landscape" | "portrait" | "square"}} props - Props of the component
 */
export default function ItemProductList ({
    title = null,
    thumbnail = "",
    price = null,
    discount = null,
    prDiscount = null,
    rating = null,
    orientation = "vertical",
    aspect = "large",
    ...props
}) {
    return (
        <li 
            {...props}
            className={`itm-lst ${props.className || ""} ${orientation} ${aspect}`}
            style={{
                aspectRatio: aspectProps[aspect],
                flexDirection: orientationProps[orientation],
                ...props.style
            }}
        >
            <LazyLoadImage
                wrapperClassName='itm-lst-img'
                src={thumbnail}
                alt={title}
                effect="opacity"
            />

             <div className="itm-lst-info">
                <p> {title} </p>
                <p> <strong> {price && `$${price}`} </strong> </p>
                <p> {discount && `-${discount}%`} </p>
                <p> <del> {prDiscount && `$${(price + (price * discount / 100)).toFixed(2)}`} </del> </p>
                <p> {rating && `⭐ ${rating}`} </p>
            </div>
            
        </li>
    )
}