import React, { forwardRef } from 'react'

const AddColumn = forwardRef((props,ref) => {

    return (
        <div className={`shadow `} id="AddNewColumn" ref={ref}>
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
                <button className="btn">Cancel</button>
            </form>
        </div>
    )
})

export default AddColumn