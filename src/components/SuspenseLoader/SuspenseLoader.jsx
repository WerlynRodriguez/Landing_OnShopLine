import "./SuspenseLoader.css"
/** The Loader component displays a loading animation while the data is being fetched 
 * @param {React.HtmlHTMLAttributes<HTMLDivElement>} props - Props of the component
 */
export default function SuspenseLoader(props) {
    return (
        <div id="suspense-loader" {...props}>
            <h1> On </h1>
            <h1> Shop </h1>
            <h1> Line </h1>
        </div>
    )

}