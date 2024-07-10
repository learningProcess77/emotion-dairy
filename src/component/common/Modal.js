import Button from './Button'
import 'src/styles/Modal.css'

const Modal = ({ showModal, text, onConfirm, onCancel }) => {
  const onClickConfirm = () => {
    onConfirm()
  }
  const onClickCancel = () => {
    onCancel()
  }
  if (!showModal) {
    return <div></div>
  }
  return (
    <div className={'Modal'}>
      <div className={'modal_wrapper'}>
        <div className={'content_wrapper'}>
          <p>{text}</p>
        </div>
        <div className={'button_wrapper'}>
          <Button type={'negative'} text={'취소'} onClick={onClickCancel} />
          <Button type={'positive'} text={'확인'} onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  )
}

export default Modal
