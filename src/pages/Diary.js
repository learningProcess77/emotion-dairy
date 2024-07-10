import { useNavigate, useParams } from 'react-router-dom'
import useDiary from 'src/hooks/useDiary'
import Header from 'src/component/common/Header'
import Button from 'src/component/common/Button'
import Viewer from 'src/component/Viewer'
import { getFormattedDate } from 'src/utils/util'

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
      <Viewer content={content} emotionId={emotionId} />
    </div>
  )
}

export default Diary
