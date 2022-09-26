import react, {useState} from "react";
import { Formik, Form, Field } from 'formik';
import { useForm } from 'react-hook-form';
import { Button, Toast } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../../assets/battelan.png"
import { addUser, getUser } from "../../app/features/user/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';

const Login = () => {
    const {handleSubmit, register, formState : {errors}} = useForm()
    const user = useSelector((state) => state.user)
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState();
    const dispatch = useDispatch()

    const handleNav = (props) => {
        if(props === "login"){
            setIsLogin(true);
        }else{
            setIsLogin(false);
        }
    }

    const handleTest = () => {
       console.log(user)
    };


    const authenticate = async (values) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ strategy:"local", email: values.email, password: values.password })
            };
            await fetch('http://localhost:3030/authentication', requestOptions)
                .then(response => response.json())
                .then(data => {
                    const payload = {
                        email:data.user.email,
                        token:data.accessToken
                    }
                    setUserData(payload)
                    dispatch(addUser(payload))
                });
    };

    const createUser = async (values) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: values.emailSign, password: values.passwordSign })
        };
        await fetch('http://localhost:3030/users', requestOptions)
            .then(response => response.json())
            .then(data => {
                setIsLogin(true)
            });       
    };

    return(
        <>  
            <img src={logo} className="logoLogin" alt='logo'></img>
            <div className="divMenu">
                <href className="menuLogin" onClick={() => handleNav('login')}>Connexion</href>
                <href className="menuLogin" onClick={() => handleNav('Inscription')}>Inscription</href>
            </div>
            {isLogin ?
                <div className="loginDiv">
                    <div className="loginText">Connexion</div>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                            errors.email = 'Required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                            errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            try{
                                authenticate(values)
                                toast.success("Connexion réussi")
                            }catch(error){
                                console.log(error)
                                toast.error("Une erreur est survenue")
                            }
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="formInput">
                                    <Field className="formField" type="email" placeholder="Email" name="email" />
                                    <Field className="formField" type="password" placeholder="Password" name="password" />
                                </div>
                                <div className="formInput">
                                    <Button  color="success" type="submit" >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <href onClick={handleTest}>Mot de passe oublié ?</href>
                </div>
            : 
                <div className="loginDiv">
                    <div className="loginText">Inscription</div>
                    <Formik
                        initialValues={{ emailSign: '', passwordSign: '', passwordConfSign: ''}}
                        validate={values => {
                             const errors = {};
                            if (!values.emailSign) {
                            errors.emailSign = 'Required';
                            } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailSign)
                            ) {
                            errors.emailSign = 'Invalid email address';
                            }
                            if(values.passwordSign != values.passwordConfSign){
                                errors.passwordSign = 'Invalid'
                            }

                            if(!values.passwordSign){
                                errors.passwordSign = 'Required'
                            }

                            if(!values.passwordConfSign){
                                errors.passwordConfSign = 'Required'
                            }
                            return errors;


                        }}

                        onSubmit={(values, { setSubmitting }) => {
                            try{
                                createUser(values)
                                toast.success("Inscription réussi")
                            }catch(error){
                                console.log(error)
                                toast.error("Une erreur est survenue")
                            }
                        }}
                        >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="formInput">
                                    <Field className="formField" type="email" placeholder="Email" name="emailSign" />
                                    <Field className="formField" type="password" placeholder="Password" name="passwordSign" />
                                    <Field className="formField" type="password" placeholder="Password confirmation" name="passwordConfSign" />
                                </div>
                                <div className="formInput">
                                    <Button  color="success" type="submit" >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    )
}

export default Login;