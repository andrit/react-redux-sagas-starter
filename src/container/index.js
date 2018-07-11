import { connect } from 'react-redux'
import App from '../components/App'
import { fetchStarWarsRequest, /*fetchStarWarsPlanetsRequest,*/ queueChannelRequests,/*confirmFetchRequest*/ } from '../actions'

const mapStateToProps = ({starWars}) => ({starWars})

const bindActionsToDispatch = dispatch => (
    {
        fetchStarWarsRequest: () => dispatch(fetchStarWarsRequest()), 
        //fetchStarWarsPlanetsRequest: () => dispatch(fetchStarWarsPlanetsRequest()), 
        queueChannelRequests: () => dispatch(queueChannelRequests()), 
        //used in actions index-notes.js
       // confirmFetchRequest: () => dispatch(confirmFetchRequest()) 
    }
)

const AppContainer = connect(mapStateToProps, bindActionsToDispatch)(App)

export default AppContainer;
