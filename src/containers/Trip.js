import React, { useState, useEffect } from 'react'
import Expense from '../components/Expense'
import ExpenseForm from './ExpenseForm'

const Trip = (props) =>{
    const [trip, setTrip] = useState({
        expenses: []
    })

    const [expenseFormFlag, setExpenseFormFlag] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:9292/trips/${props.match.params.id}`)
        .then(r => r.json())
        .then(data => {
            setTrip(data)
        })
    }, [props.match.params.id])

    const toggleForm = () => {
        let newBoolean = !expenseFormFlag
        setExpenseFormFlag(newBoolean)
    }

    const addNewExpense = (expense) => {
        fetch(`http://localhost:9292/trips/${trip.id}/expenses`,{
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body:JSON.stringify(expense)
        })
        .then(resp => resp.json())
        .then(data =>{
            setTrip({
                ...trip,
                expenses: [...trip.expenses, data]
            })
        })
        toggleForm()
    }

    const expenses = trip.expenses.map(exp => <Expense key={exp.id} expense={exp}/>)

    return (
        <div>
            <br/>
            <h1>{trip.name}</h1>
            <br/>
            <h3>Expense:</h3>
            {expenses}
            {expenseFormFlag ? <ExpenseForm newExpense={addNewExpense} trip={trip}/> : <button onClick={toggleForm}>Add Expense</button>}
        </div>
    )
}

export default Trip
