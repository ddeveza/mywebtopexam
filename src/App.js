import Papa, { parse } from "papaparse";
import { useEffect, useState } from "react";
import axios from "axios";
import Tile from './components/Tile'
import Optional from './components/Optional'
import {Button ,Container, Grid} from '@material-ui/core'
import logo from './logo/PNG-Blue.png';




function App() {
  const [parseData, setParseData] = useState([]);
  const [countBreach,setCountBreach]=useState(0);
  const [toggleTile,setToggleTile] = useState(false);
  const [optional, setOptional] = useState(false); 
  const [emailBreach , setEmailBreach] = useState([]);
  

  const csvData = (e) => {
    const file = e.target.files[0];

    Papa.parse(file, {
      header: false,
      dynamicTyping: true,
      complete: function (results) {
         setParseData([...results.data]);
      }
    });
  };

  useEffect(async ()=>{
    
    let apiKey = { "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45" }; //api key
    
    //loop each dataif has 
    await parseData.map(async (data) => {
         
          let url = `/api/v3/breachedaccount/${data["0"]}?truncateResponse=false`;
          //console.log(`${url}`);
          await axios.get(url, { headers: apiKey  })
                     .then(async res=>{
                      console.log(url);
                      console.log(res);
                       const inputEmail = { email : data};
                       const newRes = {...res.data,...inputEmail}
                       
                       await setCountBreach(oldCount => oldCount+1); //set count w/ positive output
                       await setEmailBreach(oldArray => [...oldArray,newRes]);
                       
                     })
                     .catch()
                     
                     
          
    });

    
   
  },[parseData])

  const clickMe = () =>{
    setToggleTile(false);
    setOptional(true);
  }
 
  return (
    
    <Container>
      <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <img className="webTop" src={logo} alt="Logo" />
          </Grid>
          <Grid item xs={4}  container direction="column" alignItems="flex-end" >
            <Button variant="contained" component="label" >
                <span>Scan</span>
                <input type="file" onChange={csvData} onClick={()=>setToggleTile(true)} hidden/>
            </Button>
          </Grid>
          <Grid item xs={12}>
            {toggleTile && <Tile count={countBreach} clickMe={clickMe}/>}
            {optional&& <Optional emailBreach={emailBreach}/>}
            
          </Grid>
      </Grid>
      
     
    </Container>
     
     
  
  );
}

export default App;
