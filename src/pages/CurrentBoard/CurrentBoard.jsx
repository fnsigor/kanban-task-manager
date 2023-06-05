import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import Column from '../../components/Column/Column';
import { getUserBoards } from '../../utils/getBoard';
import useBoardContext from '../../hooks/useBoardContext';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { CreateColumnInput } from '../../components/CreateColumnInput/CreateColumnInput';

function CurrentBoard() {

    const { boardid } = useParams()
    
    const { selectedBoard, setSelectedBoard } = useBoardContext()
    
    useEffect(() => {
        getUserBoards(setSelectedBoard, 'one', boardid)
    }, [boardid])


    useEffect(() => {
        const handleBeforeUnload = (event) => {

            localStorage.setItem(selectedBoard.id, JSON.stringify(selectedBoard))
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    });


    function handleOnDragEnd(result) {

        if (!result.destination) return;


        if (result.type === 'listContent') {
            const selectedItem = selectedBoard.columns.find(column => column.id === result.source.droppableId).tasks[result.source.index]

            const updatedColumns = selectedBoard.columns.map(column => {
                if (column.id === result.source.droppableId) {
                    column.tasks.splice(result.source.index, 1)
                }

                return column
            })

            updatedColumns.map(column => {
                if (column.id === result.destination.droppableId) {
                    column.tasks.splice(result.destination.index, 0, selectedItem)
                }

                return column
            })

            const updatedBoard = {
                boardName: selectedBoard.boardName,
                id: selectedBoard.id,
                columns: updatedColumns
            }


        } else {
            const updatedColumns = selectedBoard.columns
            const [reorderedItem] = selectedBoard.columns.splice(result.source.index, 1);
            updatedColumns.splice(result.destination.index, 0, reorderedItem);

            const updatedBoard = {
                boardName: selectedBoard.boardName,
                id: selectedBoard.id,
                columns: updatedColumns
            }

        }

    }


    const DropzoneDroppable = ({ children, ...props }) => {
        const [enabled, setEnabled] = useState(false);
        useEffect(() => {
            const animation = requestAnimationFrame(() => setEnabled(true));
            return () => {
                cancelAnimationFrame(animation);
                setEnabled(false);
            };
        }, []);
        if (!enabled) {
            return null;
        }
        return <Droppable {...props}>{children}</Droppable>;
    };



    return (
        <DragDropContext onDragEnd={handleOnDragEnd} >

            <DropzoneDroppable droppableId={'listDropzoneDroppable'} type='list' direction="horizontal" >
                {(provided) => (
                    <ul  {...provided.droppableProps} ref={provided.innerRef} id='currentBoard'>

                        {selectedBoard && selectedBoard.columns.map((column, index) => (
                            <Column
                                name={column.name}
                                columnindex={index}
                                tasks={column.tasks}
                                key={column.id}
                                columnId={column.id}
                            />
                        ))}

                        {provided.placeholder}

                        <CreateColumnInput />

                    </ul>
                )}
            </DropzoneDroppable>

        </DragDropContext>
    )
}

export default CurrentBoard