import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import logo from "./../../assets/logo.png";
import LoginForm from './LoginForm';





const UseLoginPageStyle = makeStyles(theme => ({
    root : {
        textAlign : 'center',
    },
    logo : {
        marginTop : "16px"
    },
    loginFormContainer : {
      margin  : 'auto',
      background: "#ffff",
      borderRadius : '12px',
      paddingTop : "32px",
      paddingBottom : "32px",
      marginTop : "64px",
      boxShadow : theme.shadows[3],
      [theme.breakpoints.down('sm')] : {
        width  : "90%",
      },
      [theme.breakpoints.up('sm')] : {
        width  : "80%",
      },
      [theme.breakpoints.up('md')] : {
        width  : "50%",
      }
    },
    loginFormTitle : {
        marginBottom: "16px",
        textTransform : "uppercase",   
    }
}))

const LoginPage = (props) => {
    const classes = UseLoginPageStyle()

    return (
        <div className={classes.root}>
            <div className={classes.logoContainer}>
                <a href="/"><img alt="logo" src={logo} className={classes.logo} /></a>
            </div>
            <div className={classes.loginFormContainer}>
                <Typography variant="h6" component="div" className={classes.loginFormTitle}>Connexion</Typography>
                <LoginForm />
            </div>
        </div>
    )

} 


export default LoginPage;