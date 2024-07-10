import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import useDiary from 'src/hooks/useDiary'
import {
  DiaryDispatchContext,
  ModalDispatchContext,
  ModalStateContext,
} from 'src/App'
import Header from 'src/component/common/Header'
import Button from 'src/component/common/Button'
import Editor from 'src/component/Editor'

const Edit = () => {
  const { id } = useParams()
  const data = useDiary(id)
  const navigate = useNavigate()
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext)
  const { setConfirmAction } = useContext(ModalDispatchContext)
  const { setModalText, setShowModal } = useContext(ModalStateContext)

  const onSubmit = (data) => {
    const { date, content, emotionId } = data
    onUpdate(id, date, content, emotionId)
    navigate('/', { replace: true })
  }
  const onClickDelete = () => {
    setShowModal(true)
    setModalText('일기를 정말로 삭제할까요? 다시 복구되지 않아요!')
    setConfirmAction(() => handleDelete)
  }
  const handleDelete = () => {
    onDelete(id)
    navigate('/', { replace: true })
  }
  const goBack = () => {
    navigate(-1)
  }

  if (!data) {
    return <div>일기를 불러오고 있습니다...</div>
  }
  return (
    <div>
      <Header
        title={'일기 수정하기'}
        leftChild={<Button text={'< 뒤로 가기'} onClick={goBack} />}
        rightChild={
          <Button type={'negative'} text={'삭제하기'} onClick={onClickDelete} />
        }
      />
      <Editor initData={data} onSubmit={onSubmit} />
    </div>
  )
}

export default Edit
