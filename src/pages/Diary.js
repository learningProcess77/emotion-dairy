import useDiary from '../hooks/useDiary'
import {useNavigate, useParams} from 'react-router-dom'
import Header from '../component/Header'
import Button from '../component/Button'
import Viewer from '../component/Viewer'
import {getFormattedDate} from '../util'

const Diary = () => {
    const { id } = useParams()
    const data = useDiary(id)
    const navigate = useNavigate()

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>
    }
    const { date, emotionId, content } = data
    const title = `${getFormattedDate(new Date(Number(date)))} 기록`

    const goBack = () => {
        navigate(-1)
    }
    const goEdit = () => {
        navigate(`/edit/${id}`)
    }

    return (
        <div>
            <Header
                title={title}
                leftChild={<Button text='< 뒤로 가기' onClick={goBack} />}
                rightChild={<Button text='수정하기' onClick={goEdit} />}
            />
            <Viewer
                content={content}
                emotionId={emotionId}
            />
        </div>
    )
}

export default Diary