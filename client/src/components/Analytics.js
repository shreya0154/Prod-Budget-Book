import React from 'react'
import { Progress } from 'antd';
const Analytics = ({allTransactions}) => {
    const categories = ['salary', 'project', 'pocket-money', 'food', 'movie', 'bills', 'flat-rent', 'medical', 
                        'education-fee', 'tax', 'clothes', 'accessories', 'stationery'];


    const totalTransactions = allTransactions.length
    let totalIncomeTransactions = 0, totalExpenseTransactions = 0, totalIncomePercent = 0, totalExpensePercent = 0;
    if(totalTransactions > 0){
        totalIncomeTransactions = allTransactions.filter(txn => txn.type === 'income');
        totalExpenseTransactions = allTransactions.filter(txn => txn.type === 'expense');
        totalIncomePercent = totalIncomeTransactions.length * 100.0 / totalTransactions
        totalExpensePercent = totalExpenseTransactions.length * 100.0 / totalTransactions
    }
    


    // accumulate
    const totalTurnOver = allTransactions.reduce(
        (acc, transaction)=> acc + transaction.amount, 0
    );

    const totalIncomeTurnOver = allTransactions.filter((txn)=>txn.type === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0
    ); 

    const totalExpenseTurnOver = allTransactions.filter((txn)=>txn.type === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0
    ); 

    let totalExpenseTurnOverPercent = 0;
    let totalIncomeTurnOverPercent = 0;
    if(totalTurnOver > 0){
        totalIncomeTurnOverPercent = totalIncomeTurnOver*100.0 / totalTurnOver;
        totalExpenseTurnOverPercent = totalExpenseTurnOver*100.0 / totalTurnOver;
    }
    

  return (
    <>
    
    <div className='flex-container'>
        <div className="row mt-3">
        <div className="col-md-6">
            <div className="card">
                <div className="card-header">
                    Total Transactions : {totalTransactions}
                </div>
                <div className="card-body">
                    <h5 className = "text-success">Income : {totalIncomeTransactions.length}</h5>
                    <h5 className = "text-danger">Expense : {totalExpenseTransactions.length}</h5>
                    <div className="circle-progress">
                        <Progress 
                        type="circle" 
                        strokeColor={'green'} 
                        className='mx-2'
                        // percent={totalIncomePercent} 
                        percent={totalIncomePercent.toFixed(0)}    // for round figure percent
                        />
                    
                        <Progress 
                        type="circle" 
                        strokeColor={'red'} 
                        className='mx-2'
                        percent={totalExpensePercent.toFixed(0)}
                        />
                    </div>
                </div>
            </div>
        </div>


        <div className="col-md-5">
            <div className="card">
                <div className="card-header">
                    Total TurnOver : {totalTurnOver}
                </div>
                <div className="card-body">
                    <h5 className = "text-success">Total Income TurnOver : {totalIncomeTurnOver}</h5>
                    <h5 className = "text-danger">Total Expense TurnOver : {totalExpenseTurnOver}</h5>
                    <div className="circle-progress">
                        <Progress 
                        type="circle" 
                        strokeColor={'green'} 
                        className='mx-2'
                        // percent={totalIncomePercent} 
                        percent={totalIncomeTurnOverPercent.toFixed(0)}    // for round figure percent
                        />
                    
                        <Progress 
                        type="circle" 
                        strokeColor={'red'} 
                        className='mx-2'
                        percent={totalExpenseTurnOverPercent.toFixed(0)}
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>



        <div className="row mt-5">
            <div className="col-md-6">
                <h4 className='categories-card-header'>Income Categories</h4>
                 {
                    categories.map((category)=>{
                        const amount = allTransactions.filter(
                            txn=>txn.type === 'income' && txn.category === category)
                            .reduce((acc, txn) => acc + txn.amount, 0
                        )
                        return (
                            amount>0 && 
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress 
                                    percent={(amount*100.0/totalIncomeTurnOver).toFixed(0)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="col-md-6">
                <h4 className='categories-card-header'>Expense Categories</h4>
                 {
                    categories.map((category)=>{
                        const amount = allTransactions.filter(
                            txn=>txn.type === 'expense' && txn.category === category)
                            .reduce((acc, txn) => acc + txn.amount, 0
                        )
                        return (
                            amount>0 && 
                            <div className="card">
                                <div className="card-body">
                                    <h5>{category}</h5>
                                    <Progress 
                                    percent={(amount*100.0/totalExpenseTurnOver).toFixed(0)}
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </div>
    </>

  )
}

export default Analytics