import { db } from "../firebase/database";
import { collection, query, orderBy, onSnapshot, where, doc, getDoc } from 'firebase/firestore'


export const getUserBoards = async (uid, setFunction ,action = 'all', boardid) => {


    switch (action) {

        case 'one':

            try {

                const docRef = doc(db, 'boards', boardid)

                const docSnap = await getDoc(docRef)

                const board = docSnap.data()

                setFunction(board)


            } catch (error) {
                console.log(error)
            }

            break;

        case 'all':

            const collectionRef = collection(db, 'boards');

            const q = query(
                collectionRef,
                where('userId', '==', uid),
                orderBy('createdAt', 'desc')
            );

            onSnapshot(q, (querySnapshot) => {

                const boards = querySnapshot.docs.map((doc) => (
                    { id: doc.id, ...doc.data() }
                ));

                setFunction(boards)
            });

            break;


        default:
            console.log('Ops, deu algo errado na sua pesquisa');
            break;

    }
};