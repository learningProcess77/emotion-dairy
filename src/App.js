import { Routes, Route } from 'react-router-dom'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import useModal from 'src/hooks/useModal'
import useModalState from 'src/hooks/useModalState'
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

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item,
      )
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.targetId))
    case 'INIT':
      return action.data
  }
  return state
}

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const { showModal, modalText, setShowModal, setModalText } = useModalState()
  const { setConfirmAction, onConfirmModal, onHideModal } =
    useModal(setShowModal)
  const [data, dispatch] = useReducer(reducer, [])

  const idRef = useRef(0)
  useEffect(() => {
    dispatch({
      type: 'INIT',
      data: mockData,
    })
    setIsDataLoaded(true)
  }, [])

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    })
    idRef.current += 1
  }
  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    })
  }
  const onDelete = (targetId) => {
    dispatch({
      type: 'DELETE',
      targetId,
    })
  }

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

const mockData = [
  {
    id: 'mock1',
    date: new Date().getTime(),
    content: 'mock1',
    emotionId: 1,
  },
  {
    id: 'mock2',
    date: new Date().getTime(),
    content: 'mock2',
    emotionId: 2,
  },
  {
    id: 'mock3',
    date: new Date().getTime(),
    content: 'mock3',
    emotionId: 3,
  },
  {
    id: 'mock4',
    date: new Date().getTime(),
    content: 'mock4',
    emotionId: 4,
  },
  {
    id: 'mock5',
    date: new Date().getTime(),
    content: 'mock5',
    emotionId: 5,
  },
]

export default App
