import React from 'react'
import Base from '../core/Base'

const ManageCategories= ()=>{
    return(
        <Base title='Manage Categories Here' description='Admin can manage Product categories here' className='container category-block p-4'>
        <div className='row rounded '>
        <div className='col-md-8 offset-md-2'>
        <h3 className='text-center'> Assignment</h3>
        </div>
        </div>
        </Base>
    )
}

export default ManageCategories