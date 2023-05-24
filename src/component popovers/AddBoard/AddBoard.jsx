import React, { forwardRef, useState } from 'react'
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';


const AddBoard = forwardRef((props, ref) => {


    const [formError, setFormError] = useState("");
    const [boardName, setBoardName] = useState('')
    const [columns, setColumns] = useState([
        {
            name: 'To do',
            tasks: [],
            id: 'todo1'
        },
        {
            name: 'Doing',
            tasks: [],
            id: 'doing2'
        },
        {
            name: 'Done',
            tasks: [],
            id: 'done3'
        },
    ])


    const { user } = useAuthValue();

    const { insertDocument, response } = useInsertDocument("boards");



    const handleSubmit = (e) => {
        e.preventDefault();

        setFormError("");



        if (boardName.trim() === '') { //verifica se tem nome do board
            setFormError('Preencha o nome do quadro')
        }


        //remove colunas sem nome
        columns.forEach(column => {
            if (column.name.trim() === '') {
                setFormError('Existem colunas sem nome')
            }
        })


        if (formError) return


        insertDocument({
            boardName,
            boardId:  Math.random() * (99 - 1) + 1 + Math.random() * (99 - 1) + 1,
            columns,
            userId: user.uid,
        });

        ref.current.classList.toggle('show')

        alert('Quadro criado com sucesso')
    };


    return (
        <div className="shadow" ref={ref} id=''>
            <div className='popupForm'>
                <h4>Create New Board</h4>
                <span className="closePopup" onClick={() => ref.current.classList.toggle('show')}>cancelar</span>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Board Name</label>
                        <input type="text" name="" id="" placeholder='board name'
                            onChange={(e) => setBoardName(e.target.value)}
                        />
                    </div>

                    <div className='boardColumns'>
                        {
                            columns.map((column, index) => (
                                <div key={column.name + index}>
                                    <input type="text" name="" id="" defaultValue={column.name} onChange={(e) => {
                                        let currentColumnState = columns
                                        currentColumnState[index].name = e.target.value
                                        setColumns(currentColumnState)
                                    }} />
                                    <span onClick={() => {
                                        const newColumns = columns.filter(currentColumn => currentColumn.id != column.id)
                                        setColumns(newColumns)
                                    }}>excluir</span>
                                </div>
                            ))
                        }
                    </div>

                    <button className="whiteButton" type='button' onClick={() => {
                        const newColumn = {
                            name: 'New Column',
                            tasks: [],
                            id: 'columnId' + columns.length + Math.random() * (99 - 1) + 1
                        }
                        setColumns([...columns, newColumn])
                    }} >
                        Add column
                    </button>

                    <button className="purpleButton">
                        Create new board
                    </button>

                </form>
            </div>
        </div>
    )
})

export default AddBoard