import React from 'react';
import {loginAuthUser} from "../../redux/auth-reducer";
import {Login} from "./Login";
import {connect} from "react-redux";


const mapStateToProps = () => {

};

export const LoginContainer = connect(mapStateToProps, {loginAuthUser})(Login);
