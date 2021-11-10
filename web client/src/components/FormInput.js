import { makeStyles, TextField } from "@material-ui/core";


const useFormInputStyles = makeStyles(theme => ({
    root : {
        margin: "auto",
        width : "60%",
        marginBottom : "32px",
        textAlign : 'center'
    },
}))

const FormInput = (props) => {
    const classes =  useFormInputStyles();
    
    return (
        <div className={classes.root} >
            <TextField fullWidth {...props} />
        </div>
    )
}

export default FormInput;