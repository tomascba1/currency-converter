import React, { useEffect, useState } from 'react';
import './ConversorApp.css'

const ConversorApp = () => {
    
    const [symbol, setSymbol] = useState([])
    const [currency1, setCurrency1] = useState("USD")
    const [currency2, setCurrency2] = useState("EUR")
    const [amount, setAmount] = useState(0)
    const [result, setResult] = useState(0)

    useEffect(()=>{
        const host = 'api.frankfurter.app';
        fetch(`https://${host}/currencies`)
        .then(resp => resp.json())
        .then((data) => {
        setSymbol(Object.keys(data));
  });
    },[])

    useEffect(()=>{
        setAmount("")
        setResult("")
    },[currency1, currency2])


    function handleConvert(){
        if(currency1 !== currency2 && amount !== (null || 0)){
            const host = 'api.frankfurter.app';
            fetch(`https://${host}/latest?amount=${amount}&from=${currency1}&to=${currency2}`)
            .then(resp => resp.json())
            .then((data) => {
                setResult(data.rates[currency2])
            });
        }
        console.log(result);
    }

    function handleInvert(){
        const actualCurrecy1 = currency1
        const actualCurrecy2 = currency2
        setCurrency1(actualCurrecy2)
        setCurrency2(actualCurrecy1)
    }

    return(
        <div className='ConversorContainer'>
            <div><h2>Currency Converter</h2></div>
            <div className='CurrencyInput'>
            <select className='form-select' id="currency1" value={currency1} onChange={(e) => setCurrency1(e.target.value)}>
            {symbol.map((item) => (<option key={item}>{item}</option>))}
            </select>
            <select className='form-select' id="currency2" value={currency2} onChange={(e) => setCurrency2(e.target.value)}>
            {symbol.map((item) => (<option key={item}>{item}</option>))}
            </select>
            </div>
            <div className='resultContainer'>
            <div className="input-group">
  <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)}/>
  <span className="input-group-text">{currency2 + " " + result } </span>
</div>
            </div>
            <div>
            <button className='btn btn-primary mb-2 mx-2' onClick={handleConvert}>Convert</button>
            <button className='btn btn-primary mb-2 mx-2' onClick={handleInvert}><i className="bi bi-arrow-repeat"></i></button>
            </div>
        </div>
    )
}

export { ConversorApp }