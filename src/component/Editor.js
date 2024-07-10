import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalDispatchContext, ModalStateContext } from 'src/App'
import Button from 'src/component/common/Button'
import EmotionItem from 'src//component/EmotionItem'
import { getFormattedDate, emotionList } from 'src/utils/util'
import 'src/styles/Editor.css'

const Editor = ({ initData, onSubmit }) => {
  const modalDispatchContext = useContext(ModalDispatchContext)
  const modalStateContext = useContext(ModalStateContext)
  const navigate = useNavigate()
  const { setConfirmAction } = modalDispatchContext
  const { setModalText, setShowModal } = modalStateContext
  const [state, setState] = useState({
    date: getFormattedDate(new Date()),
    emotionId: 3,
    content: '',
  })

  useEffect(() => {
    if (initData) {
      setState({
        ...initData,
        date: getFormattedDate(new Date(parseInt(initData.date))),
      })
      setModalText('수정하시겠습니까?')
    } else {
      setModalText('저장하시겠습니까?')
    }
  }, [initData])
  const handleChangeDate = (e) => {
    setState({
      ...state,
      date: e.target.value,
    })
  }
  const handleChangeContent = (e) => {
    setState({
      ...state,
      content: e.target.value,
    })
  }
  const handleSubmit = () => {
    onSubmit(state)
  }
  const handleOnGoBack = () => {
    navigate(-1)
  }
  const handleChangeEmotion = useCallback((emotionId) => {
    setState((state) => ({
      ...state,
      emotionId,
    }))
  }, [])
  const onClickSubmit = () => {
    setShowModal(true)
    setConfirmAction(() => handleSubmit)
  }

  return (
    <div className='Editor'>
      <div className='editor_section'>
        <h4>오늘의 날짜</h4>
        <div className='input_wrapper'>
          <input type='date' value={state.date} onChange={handleChangeDate} />
        </div>
      </div>
      <div className='editor_section'>
        <h4>오늘의 감정</h4>
        <div className='input_wrapper emotion_list_wrapper'>
          {emotionList.map((item) => (
            <EmotionItem
              key={item.id}
              {...item}
              onClick={handleChangeEmotion}
              isSelected={state.emotionId === item.id}
            />
          ))}
        </div>
      </div>
      <div className='editor_section'>
        <h4>오늘의 일기</h4>
        <div className='input_wrapper'>
          <textarea
            placeholder='오늘은 어땠나요?'
            value={state.content}
            onChange={handleChangeContent}
          />
        </div>
      </div>
      <div className='bottom_section'>
        <Button text='취소하기' onClick={handleOnGoBack} />
        <Button text='작성 완료' type='positive' onClick={onClickSubmit} />
      </div>
    </div>
  )
}

export default Editor
