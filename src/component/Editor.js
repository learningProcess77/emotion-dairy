import {useCallback, useEffect, useState} from 'react'
import { getFormattedDate } from '../util'
import { useNavigate } from 'react-router-dom'
import { emotionList } from '../util'
import Button from '../component/Button'
import EmotionItem from '../component/EmotionItem'
import './Editor.css'
import Modal from "./Modal";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate()
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: ''
    })
    const [modal, setModal]  = useState(false)

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            })
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
            content: e.target.value
        })
    }
    const handleSubmit = () => {
        onSubmit(state)
    }
    const handleOnGoBack = () => {
        navigate(-1)
    }
    // const handleChangeEmotion = (emotionId) => {
    //     setState({
    //         ...state,
    //         emotionId,
    //     })
    // }
    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state) => ({
            ...state,
            emotionId,
        }))
    }, [])
    const onShowModal = () => {
        setModal(true)
    }
    const onHideModal = () => {
        setModal(false)
    }

    return (
        <div className='Editor'>
            {modal &&
                <Modal
                    text={'수정하시겠습니까?'}
                    onCancel={onHideModal}
                    onConfirm={handleSubmit}
                />
            }
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
                <Button text='취소하기' onClick={handleOnGoBack}/>
                <Button text='작성 완료' type='positive' onClick={onShowModal} />
            </div>
        </div>
    )
}

export default Editor