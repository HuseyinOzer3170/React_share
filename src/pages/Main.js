import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Container, capitalize  } from "@material-ui/core";
import axios from 'axios';
import MediaCard from "../components/MediaCard";
import Grid from '@material-ui/core/Grid';


const styles = makeStyles((theme) => ({
    wrappper: {
      marginTop: "10rem",
      height: "calc(100vh - 19.0625rem)",
      textAlign: "center"
    },
    avatar: {
      margin: "1rem auto",
      backgroundColor: theme.palette.secondary.main
    }
  }));


function Main() {
    const [userList, setUserList] = useState();
    const mainStyled = styles();
    const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;

    const fetchData = async () => {
      const response = await axios.get( `${REACT_APP_API_BASE_URL}/user` , { 
      headers: {
         "app-id":  REACT_APP_API_TOKEN,
         },
  
    });
    setUserList(response?.data?.data);
  };
    
    useEffect(() => {
      fetchData();
      
    }, []);
      
    return  <Container className={mainStyled.wrappper} > 
            <Grid container spacing={3}>


           

            {userList?.map((user) => {
              return (
                <Grid item sm={4} xs={6} key={user?.id}>
                  <MediaCard 
                    id={user.id}
                    userImage={user?.picture}
                    userName={`${capitalize(user?.title)} ${user?.firstName} ${user?.lastName}`}
                    userEmail={user?.email}
                  />
                  
                </Grid>
              );

            })}  
             </Grid>  
            </Container>
            
}

export default Main;