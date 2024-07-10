import { useState } from 'react'

const useModal = (setShowModal) => {
  const [confirmActon, setConfirmAction] = useState(() => {})

  const onHideModal = () => {
    setShowModal(false)
  }
  const onConfirmModal = () => {
    confirmActon()
    onHideModal()
  }

  return { setConfirmAction, onConfirmModal, onHideModal }
}

export default useModal
