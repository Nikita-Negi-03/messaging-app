import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import logo from "../assets/logo.svg"
class registerCopy extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        alert("form")
      };
      handleChange=(event) =>{
        
      };
    render() {
        return (
            <> 
            <FormContainer>
                <form>
                    <div className='brand'>
                        <img src={logo} alt="Logo" />
                        <h1>Connect</h1>
                    </div>
                    <input type="text" placeholder='Username' name="username" onChange={this.handleChange} />
                    <input type="email" placeholder='Email' name="email" onChange={this.handleChange} />
                    <input type="password" placeholder='Password' name="password" onChange={this.handleChange} />
                    <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={this.handleChange} />
                    <button type='submit' onClick={this.handleSubmit}>Create User</button>
                    <span>Already have an account? <Link to="/login">Login</Link></span>
                </form> 
            </FormContainer>
        </>
        );
    }
}

const FormContainer = styled.div`
    height: 100vh;
    width:100vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color: #131324;
    .brand{
        display:flex;
        justify-content:center;
        gap:1rem;
        align-items:center;
        img {
            height:5rem;
        }
        h1 {
            color:white;
            text-transform: uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        background-color:#00000076;
        gap:2rem;
        border-radius:2rem;
        padding:3rem 5rem;
        input {
            background-color:transparent;
            padding: 1rem;
            border: 0.1 rem solid #4e0eff;
            border-radius:0.4rem;
            color:white;
            width:100%;
            font-size:1 rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline:none;
            }
        }
        button {
            background-color: #997af0;
            color:white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size:1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
                background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color:#4e0eff;
                text-transfrom:none;
                font-weight:bold;
                text-decoration:none;
            }
        }
    }
`;


export default registerCopy;