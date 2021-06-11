import React, { useState, useEffect } from 'react'
import Expense from '../components/Expense'
import ExpenseForm from './ExpenseForm'

const Trip = (props) =>{
    const [trip, setTrip] = useState({
        expenses: []
    })
    const [tripCost, setTripCost] = useState(0)
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
            const newExpenses = trip.expenses.map(e => e.id !=data.id ? e : data)
            setTrip({
                ...trip,
                expenses: newExpenses
            })
        })
    }

    const calculateCost = () =>{
        const findPrice = trip.expenses.map(exp => exp.price)
        const totalCost = findPrice.reduce((accumulator, currentValue) => accumulator+ currentValue)
        console.log(totalCost)
        setTripCost(totalCost)
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
            <br/>
            <br/>
            <hr/>
            <h3 id="net-value">Trip's Total Cost = ${tripCost}</h3>
            <button onClick={calculateCost}>Calculate Total Cost</button>
        </div>
    )
}

export default Trip
