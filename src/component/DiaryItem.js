import Button from './Button'
import './DiaryItem.css'
import {getEmotionImageById} from '../util'
import {useNavigate} from 'react-router-dom'
import React from 'react'


const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate()
    const goDetail = () => {
        navigate(`/diary/${id}`)
    }
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }
    return (
        <div className='DiaryItem'>
            <div
                className={`image_section image_section_${emotionId}`}
                onClick={goDetail}
            >
                <img alt={`emotion${emotionId}`} src={getEmotionImageById(emotionId)} />
            </div>
            <div className='info_section' onClick={goDetail}>
                <div className='date_wrapper'>
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                <div className='content_wrapper'>
                    {content.slice(0, 25)}
                </div>
            </div>
            <div className='button_section'>
                <Button onClick={goEdit} text='수정하기' />
            </div>
        </div>
    )
}

export default React.memo(DiaryItem)
// export default DiaryItem