import React from 'react'
import Menu from '../menu'

const Base= ({
    title='My title',
    description= 'My description',
    className='bg-dark text-white p-4 text-center',
    children
})=>{
    return(
        <div className='bg-dark' >
           <Menu/>
           <div className='container-fluid   '>
                <div className=' jumbotron text-black text-center mt-0  '>
                    
                    <h2 className='display-5'>{title}</h2>
                    <p className='lead'>{description}</p>
                    
                </div>
            <div className={className} > {children}</div>
           </div>

           <footer className="footer bg-dark mt-5 py-3">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>If you got any questions, feel free to reach out!</h4>
                <button className="btn btn-warning btn-lg">Contact Us</button>
            </div>
            <div className="container">
                <span className="text-muted">
                An Amazing <span className="text-white">MERN</span> Bootcamp
                </span>
            </div>
            </footer>

        </div>
    )
}

export default Base;
