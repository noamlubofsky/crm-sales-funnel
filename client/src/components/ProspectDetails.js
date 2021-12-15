import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {useNavigate} from "react-router";
import EditProspectForm from "./EditProspectForm"


function ProspectDetails({companies, setAddingCompany}) {
    const [prospectDetails, setProspectDetails] = useState([]);
    const [company, setCompany] = useState([]);
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    let navigate = useNavigate();

    const id = useParams().id;

useEffect(() => {
    fetch(`http://localhost:3000/prospects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProspectDetails(data);
        setCompany(data.company.name)
      });
    }, [id]);

  return(
      <div>
          
          {!edit ?
         <Container>
            <h3>First Name: {prospectDetails.first_name}</h3>
            <h3>Last Name: {prospectDetails.last_name}</h3>
            <h3>Current Company: {company === null ? "None" : company}</h3>
            <h3>Stage: {prospectDetails.stage}</h3>
            <h3>Probability: {prospectDetails.probability}%</h3>
            <h5>Contact Info:</h5>
            <h4>Email: {prospectDetails.email === null ? "No Email Address on File" : prospectDetails.email}</h4>
            <h4>Phone: {prospectDetails.phone === null ? "No Phone Number on File" : prospectDetails.phone}</h4>
            <Button onClick={() => setEdit(!edit)}>{!edit ? 'Edit this Prospect' : 'Cancel'}</Button>
        </Container>
        :
        <div>
        <EditProspectForm prospect={prospectDetails} companies={companies} 
        setAddingCompany={setAddingCompany} edit={edit} setEdit={setEdit}/>
        
        </div>
          }
      </div>
  )
}

const Button = styled.button`

  margin-top: 1%;
  margin-left: 1%;
  width: 8vw;
  height: 6vh;
  /* line-height: 50px; */
  font-weight: bold;
  text-decoration: none;
  text-align: center;
  align-items: center;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
  /* border: 3px solid #2E6268; */
  transition: all .35s;
  justify-content: center;
  font-size: 1.5vh;
  
    &:hover {
      width: 10vw;
      border: 3px solid #7F7F7F;
      background: transparent;
      color: #7F7F7F;
      cursor: pointer;
    }
  `;

const Container = styled.div`
  margin-left: 30vw;
  margin-right: 30vw;
  margin-top: 10vh;
  margin-bottom: 20vh;
  max-height: 80vh;
  background-color: #FFFFFF;
  border-radius: 10px;
  overflow-y: auto;
  position: relative;
  align-items: center;
  text-align: center;
  box-shadow: 0px 0px 5px 0px #DBDBDB;
  &::-webkit-scrollbar {
      width: 10px;
  }
`;


export default ProspectDetails