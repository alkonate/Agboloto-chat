import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import useAuthState from '../context/authContext/useAuthState';
import { guardPipeline } from '../helpers/utils';
import Loading from '../components/Loader';
import routes from './routes';


const Page = ({layout : Layout, component : Component, guards, redirect, ...props}) => {
    const auth = useAuthState();
    const { initialFirebaseprocessing } = auth;

    if(initialFirebaseprocessing) return <Loading type="Rings" color="#00BFFF" height={80} width={80} />

    const shouldRender = guardPipeline(guards,auth)
    console.log('should render : ',shouldRender)
    return (
        shouldRender ?
            <Layout>
                <Component {...props} />          
            </Layout>  
        : <Redirect to={redirect} />
    )
}

Page.propTypes = {
    layout : PropTypes.func.isRequired,
    component : PropTypes.func,
    guards : PropTypes.array,
    redirect : PropTypes.string.isRequired,
}

Page.defaultProps = {
    redirect : '/'
}


const CustomRouter = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                {
                    routes.map(
                        ({path , component, layout, guards,redirect,...props},index) => 
                            <Route key={index} path={path} render={(routeProps) => 
                                    <Page {...routeProps}{...props} layout={layout} redirect={redirect} guards={guards} component={component} />} />
                        )
                }
            </Switch>
        </BrowserRouter>
    )
}

export default CustomRouter