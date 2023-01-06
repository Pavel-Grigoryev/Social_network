import * as yup from "yup";


export const schema = yup.object().shape({
    email: yup.string().required('Required').email('Invalid email'),
    password: yup.string().required('Required').min(5, 'Too Short!'),
    newMessageBody: yup.string()
}).required();