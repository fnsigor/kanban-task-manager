import React, { useEffect, useRef, useState } from 'react'
import style from './CurrentBoard.module.scss'
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Column from '../../components/Column/Column';
import { getUserBoards } from '../../utils/getBoard';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import useBoardContext from '../../hooks/useBoardContext';

function CurrentBoard() {

    const { user } = useAuthValue()

    const navigate = useNavigate()

    const { boardid } = useParams()

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const [columnName, setColumnName] = useState('');

    const btAddColumn = useRef()

    const { updateDocument, response } = useUpdateDocument("boards");

    const {selectedBoard, setSelectedBoard} = useBoardContext()


    useEffect(() => {
        if (!user) {
            setLoading(true)
        }

        getUserBoards(null, setSelectedBoard, 'one', boardid)

    }, [boardid, selectedBoard])


    const handleSubmit = (e) => {

        e.preventDefault();

        let newColumns = selectedBoard.columns



        newColumns.push({
            name: columnName,
            tasks: [],
            id: (Math.random() * (99 - 1) + 1) + 'column' + (Math.random() * (99 - 1) + 1)
        })

        const updatedBoard = {
            boardName: selectedBoard.boardName,
            boardId: selectedBoard.boardId,
            columns: newColumns,
            userId: selectedBoard.userId,
        }

        updateDocument(boardid, updatedBoard);

        setColumnName('')

        alert('coluna adicionada com sucesso')
    }









    return (
        <ul className={style.columnList}>

            {selectedBoard
                ? (
                    selectedBoard.columns.map((column, index) => (<Column name={column.name} tasks={column.tasks} key={column.id} columnId={column.id}/>))
                )
                : (<p>loading data</p>)
            }

            <li className={style.newColumnLi}>
                <form className={style.newColumnLi} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="+ Adicionar outra coluna"
                        className='task-title'
                        onFocus={() => btAddColumn.current.style.display = 'initial'}
                        onBlur={() => setTimeout(() => { btAddColumn.current.style.display = 'none' }, 100)}
                        onChange={(e) => setColumnName(e.target.value)}
                        value={columnName}
                    />
                    <button ref={btAddColumn} >Criar coluna</button>
                </form>
            </li>
        </ul>
    )
}

export default CurrentBoard