import React, { useEffect, useState } from "react";
import { fetchData } from "../helper/FetchData";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CircularProgress  } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { formatDateFunc } from "../helper/FormatDate"




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


 function UserDetail() {
    const { id }= useParams();
    const mainStyled = styles();
    console.log(id)


    const [userDetail, setUserDetail] = useState();
    useEffect(() => {
        fetchData(`/user/${id}`)
        .then((res) => setUserDetail(res))
        .catch()
        .finally();
   
    }, [id]);
        
    
    return (
      <Container className={mainStyled.wrappper}> 
            {!userDetail ? (
        <CircularProgress />
      ) : (
        <React.Fragment>
          <img src={userDetail?.picture} alt="user" />
          <Typography variant="h4">{userDetail?.firstName}</Typography>
          <Typography variant="h4">{userDetail?.lastName}</Typography>
          {userDetail?.registerDate && (
            <Typography variant="h4">{formatDateFunc(userDetail)}</Typography>
          )}
          <Typography variant="h4">{userDetail?.phone}</Typography>
        </React.Fragment>
      )}     
        </Container>
                      
                
    );
                
  }
               

export default UserDetail;