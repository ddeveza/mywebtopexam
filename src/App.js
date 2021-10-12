import Papa, { parse } from "papaparse";
import { useEffect, useState } from "react";
import axios from "axios";
import Tile from './components/Tile'
import {Button ,Container, Grid} from '@material-ui/core'
import logo from './logo/PNG-Blue.png';




function App() {
  const [parseData, setParseData] = useState([]);
  const [countBreach,setCountBreach]=useState(0);
  const [toggleTile,setToggleTile] = useState(false);
  let count = 0 ;

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

  useEffect(()=>{
    
    let apiKey = { "hibp-api-key": "bfed6a051ef3436aa3f16e546d7faa45" }; //api key
    
    //loop each dataif has 
     parseData.map(async (data) => {

          let url = `/api/v3/breachedaccount/${data["0"]}?truncateResponse=false`;

          await axios.get(url, { headers: apiKey  })
                     .then(async res=>{
                       count = await count + 1;
                       await setCountBreach(count); //set count w/ positive output
                     })
                     .catch(err=>console.log(err));
                     
    
    });

    
   
  },[parseData])
 
  return (
    
    <Container>
      <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <img src={logo} alt="Logo" width="200" height="100"/>
          </Grid>
          <Grid item xs={4}  container direction="column" alignItems="flex-end" >
            <Button variant="contained" component="label" >
                <span>Scan</span>
                <input type="file" onChange={csvData} onClick={()=>setToggleTile(true)} hidden/>
            </Button>
          </Grid>
          <Grid item xs={12}>
            {toggleTile && <Tile count={countBreach}/>}
          </Grid>
      </Grid>
      
     
    </Container>
     
     
  
  );
}

export default App;
