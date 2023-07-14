import React, { useState, useEffect } from 'react';

/** Styles of the input */
const inputStyles = {
    width: '100%',
    height: '3rem',
    boxSizing: 'border-box',

    borderRadius: '25px',
    padding: '0.9rem',
    fontSize: '1rem',
    outline: 'none',
    
    border: '0',
    backgroundColor: 'var(--clr-bg-t)',
    color: 'var(--clr-fnt-s)',
}

/** Debounce Input
 * @param {{onChange: Function, value: string, delay: number, callBack: Function, inputRef: React.RefObject, props: React.HtmlHTMLAttributes<HTMLInputElement>}} props - Props of the component
 * @returns {JSX.Element} - Debounce Input.
 */
export function InputDebounce({ 
    onChange, 
    value, 
    delay = 1200, 
    callBack = () => { console.log('NoCallback') },
    inputRef = null,
    ...props
}) {
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setTimer(setTimeout(() => {
            callBack(value);
        }, delay));

        return () => clearTimeout(timer);
    }, [value]);

    const handleChange = (event) => onChange(event);

    return (
        <input
            value={value} 
            onChange={handleChange}
            ref={inputRef}
            {...props}
            style={{
                ...inputStyles,
                ...props.style
            }} 
        />
    )   
}
