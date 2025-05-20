import React, {useState, useEffect} from 'react'
import { Form, Input , Modal, Select, Table, message, DatePicker} from 'antd'
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons'
import Layout from '../components/layouts/Layout'
import axios from 'axios';
import Spinner from '../components/Spinner'
import moment from 'moment'
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker

const  Homepage = () =>{
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransactions, setAllTransactions] = useState([])
    const [frequency, setFrequency] = useState('30')
    const [selectedDate, setSelectedDate] = useState([])
    const [type, setType] = useState('all')
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);

    // table data
    const columns = [
        {
            title:'Date',
            dataIndex:'date',
            render : (text)=><span>{moment(text).format('YYYY-MM-DD')}</span>,
        },
        {
            title:'Amount',
            dataIndex:'amount',
        },
        {
            title:'Type',
            dataIndex:'type',
        },
        {
            title:'Category',
            dataIndex:'category',
        },
        {
            title:'Reference',
            dataIndex:'reference',
        },
        {
            title:'Actions',
            render : (text, record) => (
                <div>
                    <EditOutlined onClick={()=>{
                        setEditable(record)
                        setShowModal(true)
                    }}/>
                    <DeleteOutlined className='mx-2' onClick={()=>{
                        handleDelete(record);
                    }}/>
                </div>
            )
        },
    ]

    
    const getAllTransactions=async()=>{
            try{
                const user = JSON.parse(localStorage.getItem('user'))
                setLoading(true);
                // const res = await axios.post('/transactions/get-transaction', {
                //     userid:user._id,
                //     frequency,
                //     selectedDate,
                //     type,
                // })

                const res = await axios.post(`${process.env.REACT_APP_API_URL}/transactions/get-transaction`, {
                    userid:user._id,
                    frequency,
                    selectedDate,
                    type,
                })
                setLoading(false);
                setAllTransactions(res.data)
                console.log("response data", res.data);
            }
            catch(err){
                console.log(err);
                message.error("Unknown error occurred, Try Again")
            }
        }

    

    useEffect(()=>{    
        getAllTransactions();
    },[frequency, selectedDate, type])



    const handleDelete=async(record)=>{
        try{
            setLoading(true);
            // await axios.post('/transactions/delete-transaction', {transactionId: record._id});
            await axios.post(`${process.env.REACT_APP_API_URL}/transactions/delete-transaction`, {transactionId: record._id});
            message.success("Transaction Deleted Successfully");
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            message.error("Unknown error occurred on Deletion, Please Try Again")
        }
    }


    // edit and add transaction handling
    const handleSubmit= async(values)=>{
        try{
            const user = JSON.parse(localStorage.getItem('user'))
            setLoading(true);
            if(editable){
                // await axios.post('/transactions/edit-transaction', {
                //     transactionId : editable._id,
                //     payload:{
                //         ...values,
                //     }
                // })


                await axios.post(`${process.env.REACT_APP_API_URL}/transactions/edit-transaction`, {
                    transactionId : editable._id,
                    payload:{
                        ...values,
                    }
                })
                setLoading(false);
                message.success('Transaction Edited Successfully');
            }
            else{
                // await axios.post('/transactions/add-transaction', {...values, userid: user._id})
                await axios.post(`${process.env.REACT_APP_API_URL}/transactions/add-transaction`, {...values, userid: user._id})
                setLoading(false);
                message.success("Transaction Added Successfully");
            }
            setShowModal(false);
            setEditable(null)
        }
        catch(err){
            setLoading(false);
            message.error("Unknown error occurred on adding, Please Try Again")
        }
        console.log(values);
    }

    


    

  return (
    <Layout>
        {loading && <Spinner/>}
        <div className='filters'>
            <div>
                <h6>Select Frequency</h6>
                <Select value={frequency} onChange ={(values)=>setFrequency(values)}>
                    <Select.Option value='7'>LAST 1 WEEK</Select.Option>
                    <Select.Option value='30'>LAST 1 MONTH</Select.Option>
                    <Select.Option value='365'>LAST 1 YEAR</Select.Option>
                    <Select.Option value="custom">Custom</Select.Option>
                </Select>
                {frequency === 'custom' && (
                <RangePicker 
                    value={selectedDate} 
                    onChange={(values)=>setSelectedDate(values)}
                />)}
            </div>
            <div>
                <h6>Select Type</h6>
                <Select value={type} onChange ={(values)=>setType(values)}>
                    <Select.Option value='all'>ALL</Select.Option>
                    <Select.Option value='income'>INCOME</Select.Option>
                    <Select.Option value='expense'>EXPENSE</Select.Option>
                </Select>
                {frequency === 'custom' && (
                <RangePicker 
                    value={selectedDate} 
                    onChange={(values)=>setSelectedDate(values)}
                />)}
            </div>

            <div className='switch-icon'>
                <UnorderedListOutlined 
                    className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} 
                    onClick={()=>setViewData('table')}
                />
                <AreaChartOutlined 
                    className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} 
                    onClick={()=>setViewData('analytics')}
                />
            </div>

            <div>
                <button className='btn btn-primary' 
                onClick={()=>setShowModal(true)}>
                    Add new
                </button>
            </div>
        </div>

        
        <div className='content'>
            {viewData === 'table' ?
                (<Table columns={columns} dataSource={allTransactions}/>) :
                <Analytics allTransactions = {allTransactions}/>
            }
        </div>
        
        
        <Modal title = {editable ? 'Edit Transaction' : 'Add Transaction'}
            open={showModal} 
            onCancel={()=>setShowModal(false)}
            footer={false}>


            <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
                <Form.Item label="Amount" name = "amount">
                <Input type="text"/>
                </Form.Item>
                <Form.Item label="Type" name="type" >
                    <Select>
                        <Select.Option value ="income">Income</Select.Option>
                        <Select.Option value ="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value ="salary">Salary</Select.Option>
                        <Select.Option value ="project">Project</Select.Option>
                        <Select.Option value ="pocket-money">Pocket-Money</Select.Option>
                        <Select.Option value ="food">Food</Select.Option>
                        <Select.Option value ="movie">Movie</Select.Option>
                        <Select.Option value ="bills">Bills</Select.Option>
                        <Select.Option value ="flat-rent">Flat-Rent</Select.Option>
                        <Select.Option value ="medical">Medical</Select.Option>
                        <Select.Option value ="education-fee">Education Fee</Select.Option>
                        <Select.Option value ="tax">TAX</Select.Option>
                        <Select.Option value ="clothes">Clothes</Select.Option>
                        <Select.Option value ="accessories">Accessories</Select.Option>
                        <Select.Option value ="stationery">Stationery</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Date" name="date">
                    <Input type='date'/>
                </Form.Item>
                <Form.Item label="Reference" name="reference">
                    <Input type='text'/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input type='text'/>
                </Form.Item>
                <div className='d-flex justify-content-end'>
                    <button type='submit' className='btn btn-primary' >
                        SAVE
                    </button>
                </div>
            </Form>
        </Modal>
    </Layout>
  )
}

export default Homepage