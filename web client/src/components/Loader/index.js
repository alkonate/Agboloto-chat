import { makeStyles } from "@material-ui/styles";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const useStyles = makeStyles(theme => ({
    center : {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    
    }
}))

const Loading = (props) => {

    const classes = useStyles()

    return(
        <div className={classes.center}>
            <Loader {...props} />
        </div>
    )
}

export default Loading;