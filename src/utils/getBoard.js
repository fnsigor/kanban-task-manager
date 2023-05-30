export const getUserBoards = async (setFunction, action = 'all', boardid) => {


    switch (action) {

        case 'one':

            try {

                const storageJSON = localStorage.getItem(boardid)

                const JSObjectBoard = JSON.parse(storageJSON)

                setFunction(JSObjectBoard)

            } catch (error) {
                console.log(error)
            }

            break;

        case 'all':


            const allStorageBoards = Object.keys(localStorage).map(boardid => {
                const boardJSON = localStorage.getItem(boardid)
                return JSON.parse(boardJSON)
            })


            setFunction(allStorageBoards)


            break;


        default:
            console.log('Ops, deu algo errado na sua pesquisa');
            break;

    }
};