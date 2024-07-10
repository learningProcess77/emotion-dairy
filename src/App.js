import { Routes, Route } from 'react-router-dom'
import React, { useState } from 'react'
import useModal from 'src/hooks/useModal'
import useModalState from 'src/hooks/useModalState'
import useDiaryLogic from 'src/useDiaryLogic'
import Home from 'src/pages/Home'
import New from 'src/pages/New'
import Diary from 'src/pages/Diary'
import Edit from 'src/pages/Edit'
import Modal from 'src/component/common/Modal'
import 'src/styles/App.css'

export const DiaryStateContext = React.createContext()
export const DiaryDispatchContext = React.createContext()
export const ModalDispatchContext = React.createContext()
export const ModalStateContext = React.createContext()

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const { showModal, modalText, setShowModal, setModalText } = useModalState()
  const { setConfirmAction, onConfirmModal, onHideModal } = useModal(setShowModal)
  const { data, onCreate, onUpdate, onDelete } = useDiaryLogic(setIsDataLoaded)

  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다</div>
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
        <ModalStateContext.Provider
          value={{
            setModalText,
            setShowModal,
          }}
        >
          <ModalDispatchContext.Provider
            value={{
              onHideModal,
              setConfirmAction,
            }}
          >
            <div className='App'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/new' element={<New />} />
                <Route path='/diary/:id' element={<Diary />} />
                <Route path='/edit/:id' element={<Edit />} />
              </Routes>
              <Modal
                showModal={showModal}
                text={modalText}
                onCancel={onHideModal}
                onConfirm={onConfirmModal}
              />
            </div>
          </ModalDispatchContext.Provider>
        </ModalStateContext.Provider>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
