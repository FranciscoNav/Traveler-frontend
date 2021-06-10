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

    const deleteExpense = (id) =>{
        fetch(`http://localhost:9292/trips/${trip.id}/expenses/${id}`,{
          method: "DELETE",
          headers:{
            "Content-Type": "application/json"
          },
        })
        .then(() => {
            const newExpenses = trip.expenses.filter(e => e.id !=id)
            setTrip({
                ...trip,
                expenses: newExpenses
            }) 
        })
    }

    const editExpense = (expense) =>{
        fetch(`http://localhost:9292/trips/${trip.id}/expenses/${expense.id}`,{
          method: "PATCH",
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
    }

    const calculateCost = () =>{

    }

    const expenses = trip.expenses.map(exp => <Expense key={exp.id} expense={exp} editTheExp={editExpense} deleteTheExp={deleteExpense}/>)

    return (
        <div>
            <br/>
            <h1>{trip.name}</h1>
            <h3>Below Are All Your Trips Expense:</h3>
            <br/>
            {expenses}
            <br/>
            {expenseFormFlag ? <ExpenseForm newExpense={addNewExpense} trip={trip}/> : <button onClick={toggleForm} className="submit">Add Expense</button>}
            <hr/>
            <p id="net-value">Trips Total Cost = $______</p>
        </div>
    )
}

export default Trip
