import Button from './Button'
import './Modal.css'

const Modal = ({ text, onConfirm, onCancel }) => {
    const onConfirmClick = () => {
        onConfirm()
    }
    const onCancelClick = () => {
        onCancel()
    }
    return (
        <div className={'Modal'}>
            <div className={'modal_wrapper'}>
                <div className={'content_wrapper'}>
                    <p>{text}</p>
                </div>
                <div className={'button_wrapper'}>
                    <Button type={'negative'} text={'취소'} onClick={onCancelClick} />
                    <Button type={'positive'} text={'확인'} onClick={onConfirmClick} />
                </div>
            </div>
        </div>
    )
}

export default Modal
