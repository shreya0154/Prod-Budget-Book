import React, {useEffect, useState} from 'react'
import {Form, Input, message} from 'antd'
import { Link , useNavigate} from 'react-router-dom'
import Footer from '../components/layouts/Footer';
import Spinner from '../components/Spinner'
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate("/");
    }
  }, [navigate]);
  
  const submitHandler = async (values)=>{
    setLoading(true);
    if(handleValidation(values)){
      // const {email, password} = values;

      // call api 
      console.log("register validated")

      try{
          // const { data } = await axios.post('./auth/register', values);
          const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, values);
          
          console.log("response from server")
          setLoading(false);
          if(data.status === false){
              console.log("from false")
              // toast.error(data.message, toastOptions)
              message.error(data.message)
          }
          if(data.status === true){
              console.log("from true")
              message.success('Successfully registered')
              // localStorage.setItem("chat-app-user", JSON.stringify(data.user))
              navigate("/login")
          }
      }
      catch(err){
          setLoading(false);
          console.log(err);
          message.error('unknown error occurred, Please try again')
      }
    }
    console.log(values)
  }
  // const toastOptions  = {
  //     position: "top-right",
  //     autoClose: 4000,
  //     pauseOnHover : true,
  //     draggable: true,
  //     theme: "light"
  // }

  const handleValidation = (values)=>{
    const {password, confirmPassword, email, username} = values;
    
    if(username.length < 3){
      setLoading(false);
      message.error("username must be atleast 3 characters long.");
      console.log("false");
      return false;
    }
    else if(email === undefined){
      setLoading(false);
      message.error("email is required.");
      console.log("false");
      return false;
    }
    else if(password.length < 8){
      setLoading(false);
      message.error("password must be atleast 8 characters long.");
      console.log("false");
      return false;
    }
    else if(password !== confirmPassword){
      setLoading(false);
      message.error("password and confirm password must be same.")
      console.log("false");
      return false;
    } 
    
    console.log("true");

    return true;
  }

    // try{
    //   const { data } = await axios.post('/auth/register', values)
    //   if(data.status === false){

    //   }
    //   message.success('Registeration successfull')
    // }catch(err){
    //   message.error('in')
    // }
    

  return (
    <>
    <div className='register-page'>
      {loading && <Spinner/>}
      <div className="background-pic">
          {/* <img src=".../assets/background@MoneyManager.jpg" alt="picture" /> */}
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-6264415-5167525.png?f=webp" height="300" width="300" alt="picture"></img>
          <h2 className='WebsiteName mt-5 ms-5'>BUDGET-BOOK</h2>
        </div>
        
        <div className="form-register">
          <div className="registerHeader">
          <h1>Register</h1>
          </div>
          <Form layout="vertical" onFinish={submitHandler}>
          <Form.Item label="Username" name = "username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name = "email">
            <Input type='email'/>
          </Form.Item>
          <Form.Item label="Password" name = "password">
            <Input type='password'/>
          </Form.Item>
          <Form.Item label="Confirm Password" name = "confirmPassword">
            <Input type='password'/>
          </Form.Item>
          <button className='btn btn-primary'>Register</button>
          {/* <div className='d-flex justify-content-between'> */}
            <span> Already registered ? <Link to="/login">Login</Link></span>
          {/* </div> */}
        </Form>
        </div>
    </div>
    <Footer/>
    </>
  )
}
export default Register