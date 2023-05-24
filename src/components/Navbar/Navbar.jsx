import React, {useRef} from 'react'
import style from './navbar.module.scss'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication } from '../../hooks/useAuthentication';
import AddBoard from '../../component popovers/AddBoard/AddBoard';

function Navbar({addBoardPopup}) {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={style.content}>

            <h1 className='board-title'>{user?.displayName ?? 'Kanban Task Manager'}</h1>

            <div>

                {!user && (
                    <>
                        <Link to='/login' className='bt-add-task purpleButton'>
                            Entrar
                        </Link>
                        <Link to='/cadastro' className='bt-add-task purpleButton'>
                            Cadastrar
                        </Link>
                    </>
                )}

                {user && (
                    <>
                        <button className='bt-add-task purpleButton'>
                            + Add New Task
                        </button>
                        <button className='bt-add-task purpleButton' onClick={logout}>
                            Sair
                        </button>
                    </>
                )}




            </div>


        </nav>
    )
}

export default Navbar