import Button from './Button'
import DiaryItem from './DiaryItem'
import './DiaryList.css'
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const DiaryList = ({ data }) => {
    const [sortType, setSortType] = useState('latest')
    const [sortedData, setSortedData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const compare = (a,b) => {
            if (sortType === 'latest') {
                return Number(b.date) - Number(a.date)
            } else {
                return Number(a.date) - Number(b.date)
            }
        }
        const copyList = JSON.parse(JSON.stringify(data))
        copyList.sort(compare)
        setSortedData(copyList)
    }, [data, sortType])

    const onChangeSort = (e) => {
        setSortType(e.target.value)
    }
    const onClickNew = () => {
        navigate('/new')
    }

    return (
        <div className='DiaryList'>
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <select value={sortType} onChange={onChangeSort}>
                        {sortOptionList.map((item, idx) => (
                            <option key={idx} value={item.value}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='right_col'>
                    <Button
                        type='positive'
                        text='새 일기 쓰기'
                        onClick={onClickNew}
                    />
                </div>
            </div>
            <div className='list_wrapper'>
                {sortedData.map((item) => (
                    <DiaryItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

const sortOptionList = [
    {
        value: 'latest',
        name: '최신순'
    },
    {
        value: 'oldest',
        name: '오래된 순'
    }
]

export default DiaryList