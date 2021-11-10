import { makeStyles } from "@material-ui/styles";
import AuthProvider from "./context/authContext/AuthProvider";
import CustomRouter from "./routes/CustomRouter";

const useStyles  =  makeStyles(theme => ({
  app : {
    height: '100vh',
    backgroundColor: theme.palette.background.default
  }
}))

export default function App() {

  const classes = useStyles()

  return (
        <div className={classes.app}>
          <AuthProvider>
              <CustomRouter />
          </AuthProvider>
        </div>
  );

  // firebase.auth().currentUser.getIdTokenResult()
  // .then((idTokenResult) => {
  //    // Confirm the user is an Admin.
  //    if (!!idTokenResult.claims.admin) {
  //      // Show admin UI.
  //      showAdminUI();
  //    } else {
  //      // Show regular user UI.
  //      showRegularUI();
  //    }
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
}