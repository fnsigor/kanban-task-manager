import React from 'react'
import style from './newColumn.module.scss'



function AddNewColumn() {


    return (
        <div className={`shadow `+style.content} id="AddNewColumn" ref={addNewColumn}>
            <form className="content">
                <div>
                    <label htmlFor="columnName">Create New Column at -board</label>
                    <input type="text" placeholder='Column name' id="columnName" name='columnName'/>
                </div>
                <div>
                    <label htmlFor="color">Column color</label>
                    <input type="color" id="color" name="color" />
                </div>
                <button className="btn">Create column</button>
                <button className="btn"onClick={hideContent('addNewColumn')}>Cancel</button>
            </form>
        </div>
    )
}

export default AddNewColumn