import React, { useEffect, useRef, useState } from "react"
import { 
    fetchBasic,
    prdctsEndpoints,
    limitResults,
    selectParams,
    search
 } from "../../Api"
import { InputDebounce } from "../InputDebounce"
import ButtonIcon from "../ButtonIcon"
import "./style.css"

/** Item of the Search Bar
 * @param {{id: string, title: string, thumbnail: string, discountPercentage: number, price: number, tabIndex: number}} props - Props of the component
 */
const ItemSearch = ({title, thumbnail, discountPercentage, price, tabIndex}) => (
    <li tabIndex={tabIndex}>
        <img 
        src={thumbnail} 
        alt={title}/>
        <p className="title"> {title} </p>
        <p> 
            <strong>${price}</strong> |
            -{discountPercentage}% |
            <del>${(price + (price * discountPercentage / 100)).toFixed(2)} </del>
        </p>
    </li>
)

/** Button when is presse show a Dialog with Search Bar with Dynamic Container
 * @param {{id: string}} props - Props of the component
 */
export default function DialogSearchBar({id}) {
    const [txtSearch, setTxtSearch] = useState('')
    const [searchedProducts, setSearchedProducts] = useState([])

    const inputRef = useRef(null)
    const dialogRef = useRef(null)

    /** State of the input, when the user is typing, or waiting for at least 3 characters */
    const [isTyping, setIsTyping] = useState(true)
    /** State of the input, when the user is waiting for the results, and not typing */
    const [isLoading, setIsLoading] = useState(false)

    const controller = new AbortController()

    /** On click outside of the dialog, close the dialog */
    useEffect(() => {
        const handleOutsideClick = (event) => {
            console.log(event.target)
            if (event.target === dialogRef.current) {
                dialogRef.current.close()
            }
        }
        dialogRef.current.addEventListener('click', handleOutsideClick)

        return () => { dialogRef.current.removeEventListener('click', handleOutsideClick) }
    }, [])

    /** Handle the change of the input
     * @param {Event} event - Event of the input 
     */
    const onChange = (event) => {
        if (controller) controller.abort()

        setIsTyping(true)
        setIsLoading(false)

        setTxtSearch(event.target.value)
    }

    /** Callback function of the InputDebounce
     * @param {string} value - Value of the input 
     */
    const callback = (value) => {
        if (value.length < 3) return

        setIsTyping(false)
        setIsLoading(true)

        fetchBasic(
            prdctsEndpoints.get.all() +
            search(value) +
            '&' + limitResults(4) +
            '&' + selectParams(['title', 'thumbnail', 'discountPercentage', 'price']),
            controller.signal
        ).then( (data) => {
            setIsLoading(false)
            setSearchedProducts(data?.products || [])
        })
    }

    const handleSearch = () => { dialogRef.current.showModal() }

    return (
    <React.Fragment>
        <ButtonIcon 
            id={id}
            icon="search" 
            onClick={handleSearch} 
            title="Search" 
        />

        <dialog ref={dialogRef} id="searchDialog">
            <div className="sbdc-container">
            {   isTyping ? (
                <i className="fi fi-br-pencil"> </i>

            ) : isLoading ? (
                <i className="fi fi-br-spinner"> </i>

            ) : searchedProducts.length === 0 ? (
                <>
                    <h3> No Suggestions for "{txtSearch}" </h3>
                    <i className="fi fi-br-wind"> </i>
                </>
            ) : (
                <>
                    <h3> Suggestions </h3>
                    <ul>
                        {searchedProducts.map((product, index) => (
                            <ItemSearch key={product.id} tabIndex={index} {...product} />
                        ))}
                    </ul>
                </>
            )}
            </div>

            <ButtonIcon icon="arrow-left" title="Back" onClick={() => dialogRef.current.close()}/>
            <InputDebounce
                type="search"
                placeholder="Search OnShopLine"
                value={txtSearch}
                onChange={onChange}
                callBack={callback}
                inputRef={inputRef}
                maxLength={50}
                autoFocus={true}
            />
            <ButtonIcon icon="search" title="Search"/>
        </dialog>
    </React.Fragment>)
}