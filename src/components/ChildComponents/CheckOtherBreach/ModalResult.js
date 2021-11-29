import React from 'react'
import { Modal, Backdrop, Box, Typography ,makeStyles} from "@material-ui/core";
import Footer from '../TileBodyComponent/DetailBreachEmail/Footer'
import Body from '../TileBodyComponent/DetailBreachEmail/Body'

const styles = makeStyles({
    textStyle :{
        color:'gray',
        fontWeight:'500',
        letterSpacing:'1px',
        marginBottom: '5px',
        fontSize:'20px'
    }
})


const ModalResult = (props) => {

        const classes = styles()

        const modalStyle = {
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "1000px",
            height: "600px",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            p: 1,
            paddingTop: "0px",
            boxSizing: "content-box",
            WebkitFilter: "drop-shadow(2px 2px 5px  rgb(120 196 217))",
            borderRadius: "1%",
            outline:'none',
        
          };
    
       
      return (
        <Modal
          open={props.isOpen}
          onClose={props.handleToggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop = { true}
          BackdropComponent={Backdrop}
          BackdropProps={
           
            {
              timeout:500,
             
            }
          }
        >
            <Box sx={modalStyle}>
               {/*  <Header data={props.data}/>
                 />
                 */}
                 <Box sx={{display:'flex' , p:3}}>
                     <Typography className={classes.textStyle}>{props.email}</Typography>
                 </Box>
                 <Body data={props.data}/>
                <Footer close={props.handleToggle}/>
            </Box>
        </Modal>
      );
    
    
    
   
    
}

export default ModalResult
