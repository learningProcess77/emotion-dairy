import { useState } from 'react'

const useModalState = () => {
  const [modalText, setModalText] = useState('')
  const [showModal, setShowModal] = useState(false)

  return { showModal, modalText, setShowModal, setModalText }
}

export default useModalState
