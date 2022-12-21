// import React, { useState } from 'react'
import React, { useEffect, useState } from "react";
import "./company.css";
import { AddCompany, getAllCompany } from "../../config/firebase";

export default function Company() {
  const [name, setName] = useState("");
  const [since, setSince] = useState("");
  const [timing, setTiming] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [address, setAddress] = useState("");
  function AddCompanyToFirebase() {

    //     console.log(name)
    // console.log(since)
    // console.log(timing)
    // console.log(address)
    if (name === "" || since === "" || timing === "" || address === "") {
      alert("Please Fill The Form");
    } else {
      AddCompany({ name, since, timing, address });
      setSince("");
      setTiming("");
      setAddress("");
      setName("");
      setShow(false)
    }
  }

  const fetch = async () => {
    const data = await getAllCompany();
    let temp = [...data];
    console.log("temp", temp);
    setData(temp);
    console.log("dd  ==", data);
  };
  useEffect(() => {
    fetch();
  }, []);

  const userName = function (e) {
    setName(e.target.value);
  };
  const sinceAdd = function (e) {
    setSince(e.target.value);
  };
  const timingAdd = function (e) {
    setTiming(e.target.value);
  };
  const addressAdd = function (e) {
    setAddress(e.target.value);
  };

  return (
    <>
      <div>
        <button onClick={()=>setShow(true)}>CREATE COMPANY +</button>
      </div>
      <div style={{display:"flex",justifyContent: 'center',alignItems: 'center'}}>
        <table>
          {
            data.length < 0 ? "":
            <tr>
            <th>Company Name</th>
            <th>Since</th>
            <th>Address</th>
          </tr>
          }
        
          
            {data.map((item)=>{
              return <>
               
              <tr >
              <td>{item.name}</td>
              <td>{item.since}</td>
              <td>{item.address}</td>
              </tr>
              </>
            })}            
         
        </table>
      </div>
      
{show && 
 <div>
 <div className="black">
   <label htmlFor=""> Name of company:</label>
   <input
     type="text"
     value={name}
     placeholder=" Name of company"
     onChange={userName}
   />
   <br />
   <label htmlFor=""> Since:</label>
   <input
     type="number"
     value={since}
     placeholder=" Enter Company Age"
     onChange={sinceAdd}
   />
   <br />
   <label htmlFor=""> Timings:</label>
   <input
     type="text"
     value={timing}
     placeholder="enter Timning"
     onChange={timingAdd}
   />
   <br />
   <label htmlFor=""> Address:</label>
   <input
     type="text"
     value={address}
     placeholder=" Enter Address"
     onChange={addressAdd}
   />
   <br />
   <br />
   <button onClick={AddCompanyToFirebase}>Add Company</button>
 </div>
</div>
}
     
    </>
  );
}
