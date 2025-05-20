import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({children }) =>{
  return (
    <>
    <Header/>
    {/* <div className='content-footer'> */}
    <div className='content'>{children}</div>
    <Footer/>
    {/* </div> */}
    </>
  )
}

export default Layout