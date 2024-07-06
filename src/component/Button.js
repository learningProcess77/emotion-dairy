import './Button.css'

const Button = ({ text, type, onClick }) => {
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default'
    return (
        <button
            className={`Button Button_${btnType}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

//  Support for defaultProps will be removed from function components in a future major release.
//  Use JavaScript default parameters instead.
Button.defaultProps = {
    type: 'default',
}

export default Button