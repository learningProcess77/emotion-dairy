import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DiaryDispatchContext } from 'src/App'
import Header from 'src/component/common/Header'
import Button from 'src/component/common/Button'
import Editor from 'src/component/Editor'

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext)
  const navigate = useNavigate()
  const onSubmit = (data) => {
    const { date, content, emotionId } = data
    onCreate(date, content, emotionId)
    navigate('/', { replace: true })
  }
  const goBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <Header
        title={'새 일기 쓰기'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={goBack} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  )
}

export default New
