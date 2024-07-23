import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress } from '@fortawesome/free-solid-svg-icons';
import GaugeComponent from 'react-gauge-component';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [isHeight, setIsHeight] = useState(true);
  const [isWeight, setIsWeight] = useState(true);
  const [isAge, setIsAge] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [src, setSrc] = useState("");
  const [isImageVisible, setIsImageVisible] = useState(false);

  const validate = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (!!value.match(/^[0-9]*$/)) {
      if (name === 'height') {
        setIsHeight(true);
        setHeight(Number(value));
      } else if (name === 'weight') {
        setIsWeight(true);
        setWeight(Number(value));
      } else {
        setIsAge(true);
        setAge(Number(value));
      }
    } else {
      if (name === 'height') {
        setHeight(value);
        setIsHeight(false);
      } else if (name === 'weight') {
        setWeight(value);
        setIsWeight(false);
      } else {
        setAge(value);
        setIsAge(false);
      }
    }
  };

  const handleReset = () => {
    setHeight(0);
    setWeight(0);
    setAge(0);
    setBmi(0);
    setIsHeight(true);
    setIsWeight(true);
    setIsAge(true);
    setCategory("");
    setDescription("");
    setSrc("");
    setIsImageVisible(false);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (height === 0 || weight === 0 || age === 0) {
      alert('Please fill the form completely');
    } else {
      const calculatedBmi = (weight * 10000) / (height * height);
      setBmi(calculatedBmi.toFixed(2));

      setIsImageVisible(true);

      if (calculatedBmi <= 18.5) {
        setCategory('UNDER WEIGHT');
        setDescription('Eat more frequently and choose nutrient-rich foods.');
        setSrc('/public/3d-rendering-online-avatar-design.png');
      } else if (calculatedBmi > 18.5 && calculatedBmi < 24.9) {
        setCategory('HEALTHY WEIGHT');
        setDescription('Maintain Balanced Diet, consume nutritional foods.');
        setSrc('/public/healthy.png');
      } else if (calculatedBmi >= 25.0 && calculatedBmi < 39.9) {
        setCategory('OVER WEIGHT');
        setDescription('Aim to consume fewer calories than you burn,workout regularly ');
        setSrc('/public/over weight.png');
      } else {
        setCategory('OBESE ');
        setDescription('Follow a well-balanced, low-calorie diet,work with healthcare providers');
        setSrc('/public/obese.png');
      }
    }
  };

  return (
    <div id='bod'>
      <div className='container-fluid'>
        <div className="p-3 mb-5 shadow-lg mt-5 rounded-4 p-3 py-4" style={ {backgroundColor: '#e0d6ff', opacity: '0.95' }}>
          <h2 id='title' className='text-center mt-3 fw-bold'>BMI Calculator</h2>
          <div className='grid-container'>
            <div className='grid-item'>
              <div className='row'>
                <div id='item-1-2' className='col-12' style={{ maxWidth: '100%', height: 'auto' }}>
                  <div className='w-100'>
                    <GaugeComponent
                      className='w-100'
                      value={bmi}
                      type="radial"
                      labels={{
                        valueLabel: {
                          formatTextValue: (value) => `${bmi}`,
                        },
                        tickLabels: {
                          type: "inner",
                          ticks: [
                            { value: 20 },
                            { value: 40 },
                            { value: 60 },
                            { value: 80 },
                            { value: 100 }
                          ]
                        }
                      }}
                      arc={{
                        colorArray: ['#5BE12C', '#EA4228'],
                        subArcs: [{ limit: 10 }, { limit: 30 }, {}, {}, {}],
                        padding: 0.02,
                        width: 0.3
                      }}
                      pointer={{
                        elastic: true,
                        animationDelay: 0
                      }}
                    />
                  </div>
                  <div className='rounded-3 mt-3 text-light' style={{ backgroundColor: '#0028FF', height: '180px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2 id='bmi' className='text-center '>BMI: {bmi}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div id='item-3' className='grid-item'>
              <form onSubmit={handleCalculate}>
                <div className='d-flex justify-content-center'>
                  <button id='btn' type="button" className='form-control mx-2 mb-1 fs-5' style={{ backgroundColor: '#182cb4', color: 'white', borderBlockColor: 'white' }}><FontAwesomeIcon icon={faPerson} /> Male</button>
                  <button id='btn' type="button" className='form-control mx-2 mb-1 fs-5' style={{ backgroundColor: '#fb6f92', color: 'white' }}><FontAwesomeIcon icon={faPersonDress} /> Female</button>
                </div>
                <div className='d-block'>
                  <div>
                    <TextField id="outlined-basic" type="text" label="Enter Height in Cm" value={height || ""} variant="outlined" onChange={(e) => validate(e)} name='height' className='mt-4 w-100' />
                    {!isHeight && <p className='text-danger'>Invalid Input</p>}
                  </div>
                  <div>
                    <TextField id="outlined-basic" type="text" label="Enter Weight in Kg" value={weight || ""} variant="outlined" onChange={(e) => validate(e)} name='weight' className='mt-4 w-100' />
                    {!isWeight && <p className='text-danger'>Invalid Input</p>}
                  </div>
                  <div>
                    <TextField id="outlined-basic" type="text" value={age || ""} label="Enter Age" variant="outlined" onChange={(e) => validate(e)} name='age' className='mt-4 w-100' />
                    {!isAge && <p className='text-danger'>Invalid Input</p>}
                  </div>
                  <div className='ms-2 mt-4'>
                    <Button id='cal-btn' variant="contained" className='btn btn-primary' disabled={isHeight && isWeight && isAge ? false : true} type='submit'>Calculate</Button>
                    <Button id='reset-btn' variant="contained" className='btn btn-success ' onClick={handleReset} type='button'>Reset</Button>
                  </div>
                </div>
              </form>
            </div>
            <div id='item-4' className='grid-item' style={{width:'400px'}} >
              <div><h1 className='text-light text-center fw-bold'>Status</h1></div>
              <div className='w-100 text-center d-flex flex-column align-items-center'>
                <h4 className='fw-bold' style={{color:'#e0ee64'}} >{category}</h4>
                {isImageVisible && <img src={src} alt={category} style={{ maxWidth: '100%', height: '300px' }} />}
                <p className='text-white'>{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
