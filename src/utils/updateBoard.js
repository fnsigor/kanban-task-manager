export const updateBoard = (updatedBoard, setSelectedBoardFunction) => {
    try {
       
        const JSONUpdatedBoard =  JSON.stringify(updatedBoard)

        setSelectedBoardFunction(updatedBoard)

        localStorage.setItem(updatedBoard.id, JSONUpdatedBoard)


    } catch (error) {
        console.log('erro ao atualizar quando kanban')
    }
}