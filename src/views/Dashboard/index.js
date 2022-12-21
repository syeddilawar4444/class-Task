import React, { useEffect, useState } from 'react'
import Company from "../../component/Company"
import { logout } from '../../config/firebase'
import { getAllCompany } from '../../config/firebase'

export default function Dashboard() {
  const [button,setButton] = useState(false)
  useEffect(()=>{
    getAllCompany()
  },[])
  return (


<>
    <div className='logout'>
      <button style={{backgroundColor: "red"}} className='logout' onClick={logout}>Logout</button>
    </div>
    <div>
      <h1>
      Welcome To Dashboard
      </h1>
      
      <button onClick={()=>setButton(true)}>Company</button>
      <br />
      <label>Are you finding/waiting for tokens?</label>
      <br />
      <button>Individual user</button>
    { button && <Company />}
    </div>
</>
  )

}
