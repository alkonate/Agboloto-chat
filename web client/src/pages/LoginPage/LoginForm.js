import {auth} from '../../services/firebase'
import {signInWithEmailAndPassword} from 'firebase/auth'
import { Button, CircularProgress } from "@material-ui/core";
import { useCallback } from "react";
import FormInput from "../../components/FormInput";
import { Formik, Form } from 'formik';
import { getError } from '../../helpers/utils';
import { useHistory } from 'react-router';

const LoginForm = () => { 
    
    const history = useHistory()

    const validate = useCallback(
        (values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email vide.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Adresse email invalide.';
            }if (!values.password) {
               errors.password = 'Mot de passe vide.';
             }
            else if(!values.password || values.password.length < 6 ){
               errors.password = 'Mot de passe invalide.'
            }
            return errors;
          },
        [],
    )

    const submitHandler = useCallback(
        async (values, {setSubmitting,setErrors}) => {
           try {
             await signInWithEmailAndPassword(auth,values.email,values.password)
             history.replace('/dashboard')
           } catch (error) {
               if(error && error.code === "auth/user-not-found"){
                    setErrors({
                        email : "invalid",
                        password : "invalid",
                    })
                }else {
                    alert ("Opps!!! impossible de se connecter...Veuillez réessayer slvp.");
                }
                getError(error)
                setSubmitting(false) 
           }
          },
        [history],
    )



    return (
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={validate}
       onSubmit={submitHandler}
     >
       {({ values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,}) => (
         <Form>
           <FormInput required label="Email" error={errors && errors.email && errors.email.length > 0}  placeholder="Entrer votre email" name="email" value={values.email} onChange={handleChange} />
           <FormInput type="password" required label="Mot de passe" error={errors && errors.password && errors.password.length > 0} placeholder="Entrer votre mot de passe" name="password" value={values.password} onChange={handleChange}  />
           <Button disabled={isSubmitting}  variant="contained" color="secondary" onClick={handleSubmit} >
                Connexion
                {
                isSubmitting &&
                <CircularProgress
                    size={24}
                    color="secondary" 
                />
                }
            </Button>          
         </Form>
       )}
     </Formik>
        
    )
}

export default LoginForm;