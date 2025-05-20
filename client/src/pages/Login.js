import React, {useState, useEffect} from 'react'
import { Form, Input , message} from 'antd'
import styled from "styled-components"
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios';
import Spinner from '../components/Spinner'
import Footer from '../components/layouts/Footer';
const Login = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user')){
          navigate("/");
        }
      }, [navigate]);
      
    const submitHandler = async (values)=>{
        console.log("login submitted")
        setLoading(true);
        if(handleValidation(values)){
            // const {email, password} = values;

            // call api 
            console.log("validated")

            try{
                const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values);
                console.log("response from server")
                setLoading(false);
                if(data.status === false){
                    console.log("from false")
                    // toast.error(data.message, toastOptions)
                    message.error(data.message)
                }
                if(data.status === true){
                    console.log("from true")
                    message.success('Successfully logged in')
                    localStorage.setItem("user", JSON.stringify(data.user))
                    navigate("/")
                }
            }
            catch(err){
                setLoading(false);
                console.log(err);
                message.error('unknown error occurred, Please try again')
            }
        }
    }
    // const toastOptions  = {
    //     position: "top-right",
    //     autoClose: 4000,
    //     pauseOnHover : true,
    //     draggable: true,
    //     theme: "light"
    // }

    const handleValidation = (values)=>{
        const {password,email} = values;
        if(password === undefined || email === undefined){
            setLoading(false);
            message.error("Email and password are required.");
            console.log("false");
            return false;
        }
       
        console.log("true");

        return true;
    }


    
    return (
        <Container>
        <div className='login-page'>
        {loading && <Spinner/>}
        <div className="background-pic">
          {/* <img src=".../assets/background@MoneyManager.jpg" alt="picture" /> */}
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/expense-management-6264415-5167525.png?f=webp" height="300" width="300" alt="picture"></img>
          <h2 className='WebsiteName mt-5 ms-5'>BUDGET-BOOK</h2>
        </div>

        <div className="form-login">
              <div className='loginHeader'>
              <h1>Login</h1>
              </div>
              {/* <Form.Item label="Username" name = "username">
                <Input />
              </Form.Item> */}
              <Form layout="vertical" onFinish={submitHandler}>
              <div className="items">
              <Form.Item label="Email" name = "email">
                <Input type='email'/>
              </Form.Item>
              <Form.Item label="Password" name = "password">
                <Input type='password'/>
              </Form.Item>
              </div>
              <button className='btn btn-primary'>Login</button>
              {/* <div className='d-flex justify-content-between'> */}
                <span> Don't Have an Account ? <Link to="/register">Register</Link></span>
              {/* </div> */}
            </Form>
            </div>
        </div>
        <Footer/>
        </Container>
  )
}


const Container = styled.div`
.login-page{

// background-color: 
}
`;

export default Login


