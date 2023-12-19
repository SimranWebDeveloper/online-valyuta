// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [ipts,setIpts]=useState({
    amount:'100',
    fromAmont:'EUR',
    toAmont:'USD'
  })
  const[money,setMoney]=useState()
  const[loading,setLoading]=useState(false)

  useEffect(()=>{
    async function  convertFunc() {
      setLoading(true)
      const res=await fetch(`https://api.frankfurter.app/latest?amount=${ipts.amount}&from=${ipts.fromAmont}&to=${ipts.toAmont}`)
      const data=await res.json()

      setMoney((data.rates[ipts.toAmont]).toFixed(2))
      setLoading(false)

    }
    if (ipts.fromAmont===ipts.toAmont) return setMoney(ipts.amount)
    convertFunc()
    
  },[ipts])
  
  



  const handleChange = (e) => {
    const val=e.target.value
    setIpts({
      ...ipts,[e.target.name]:val
    })



  }

  


  return (
    <div >
      <input type="number"  onChange={handleChange} name="amount"  value={ipts.amount}/>
      <select disabled={loading}  onChange={handleChange} name="fromAmont" defaultValue={ipts.fromAmont} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select  disabled={loading} onChange={handleChange} name="toAmont" defaultValue={ipts.toAmont} >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p style={{fontSize:'20px',fontWeight:'bold',color:'red'}}>
        OUTPUT:   
        {/* <span>  {(db?.rates?.[`${ipts.toAmont}`])?.toFixed(2)} </span> */}
        <span>  {loading? 'loading...': money} </span>
        <span> {ipts.toAmont}</span>

        </p>
    </div>
  );
}
