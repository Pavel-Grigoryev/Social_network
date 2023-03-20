import * as yup from "yup";


export const schema = yup.object().shape({
    email: yup.string().required('Required').email('Invalid email'),
    password: yup.string().required('Required').min(5, 'Too Short!'),
    newMessageBody: yup.string()
}).required();

export const schemaProfile = yup.object().shape({
    aboutMe: yup.string().required('Required'),
    lookingForAJobDescription: yup.string().required('Required'),
}).required();

export const schemaMessage = yup.object().shape({
    newMessageBody: yup.string().required('Required')
}).required();