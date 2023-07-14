import React from "react"
import "./style.css"

const textPropStyles = Object.freeze({
    width: "auto",
    borderRadius: "1.5rem",
})

/** React button with icon
 * @type {React.FC<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>}
 * @param {string} props.icon - Icon of the button
 * @param {string} props.text - Text of the button
 **/
const ButtonIcon = (props) => {
    return (
        <button
            type="button"
            {...props}
            className={`btn-icn ${props.className || ""}`}
            style={{
                ...props.text && textPropStyles,
                ...props.style,
            }}
        >
            <i className={`fi fi-br-${props.icon}`}></i>
            {props.text && 
                <span style={{
                    marginLeft: "0.5rem",
                }}> 
                    {props.text} 
                </span>
            }

        </button>
    )
}

export default ButtonIcon