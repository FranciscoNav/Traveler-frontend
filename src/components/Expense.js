import React, {useState} from 'react'
import ExpenseEditForm from '../containers/ExpenseEditForm'

const Expense = (props) => {
    const [expenseEditFormFlag, setExpenseEditFormFlag] = useState(false)

    const toggleExpForm = () => {
        let newBoolean = !expenseEditFormFlag
        setExpenseEditFormFlag(newBoolean)
    }

    const handleClick = () => { 
        props.deleteTheExp(props.expense.id)
    }

    return (
        <div className="card">
            <h3>{props.expense.name}: ${props.expense.price}</h3>
            {expenseEditFormFlag ? <ExpenseEditForm expense={props.expense} editTheExp={props.editTheExp} toggleExpForm={toggleExpForm}/> : <button onClick={toggleExpForm}>Edit Expense</button>}
            <button onClick={handleClick} className="delete">Delete</button> 
        </div>
    )
}

export default Expense