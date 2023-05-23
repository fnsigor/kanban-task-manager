import React from 'react'
import style from './navbar.module.scss'
import { Link } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext';
import { useAuthentication } from '../../hooks/useAuthentication';

function Navbar() {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();


    return (
        <nav className={style.content}>

            <h1 className='board-title'>board name</h1>

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