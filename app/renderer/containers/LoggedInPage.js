import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {bindActionCreators} from 'redux';
import LoggedIn from '../components/LoggedIn';
import userActions from '../actions/user';
import syncActions from '../actions/sync';

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    const user = bindActionCreators(userActions, dispatch);
    const sync = bindActionCreators(syncActions, dispatch);

    return {
        onLogout: (data) => {
            user.logout(data);
            dispatch(push('/'));
        },
        onSync: (data) => {
            sync.sync(data);
            dispatch(push('/loggedin'));
        },
        onClear: (data) => {
            sync.remove(data);
            dispatch(push('/loggedin'));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedIn);
