import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {toggl} from '../helpers/timeTrackings';
import moment from 'moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {Toaster} from 'react-hot-toast';
import SettingsIcon from '@material-ui/icons/Settings';
import SyncIcon from '@material-ui/icons/Sync';
import ClearIcon from '@material-ui/icons/Clear';

export default class LoggedIn extends Component {
    static propTypes = {
        onSync: PropTypes.func.isRequired,
        onLogout: PropTypes.func.isRequired,
        onClear: PropTypes.func.isRequired,
    };

    state = {
        from: moment(),
        to: moment().add(2, 'days'),
    };

    handleSync = () => {
        this.props.onSync({
            from: this.state.from,
            to: this.state.to,

            username: this.props.user.username,

            url: this.props.user.url,
            token: this.props.user.token,

            time_tracking: this.props.user.time_tracking,

            toggl_api_key: this.props.user.toggl_api_key,
            toggl_tags: this.props.user.toggl_tags,

            clockify_api_key: this.props.user.clockify_api_key,
            clockify_url: this.props.user.clockify_url,
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleDateChange = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleLogout = () => {
        this.props.onLogout({
            loggedIn: false,
            username: '',
            url: '',
            token: '',

            from: moment(),
            to: moment().add(2, 'days'),

            time_tracking: toggl,

            toggl_api_key: '',
            toggl_tags: 'redmine,',

            clockify_api_key: '',
            clockify_url: '',
        });
    };

    handleClear = () => {
        this.props.onClear({});
    };

    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div style={{padding: 16, margin: 'auto', maxWidth: 600}}>
                    <Typography
                        variant="h2"
                        component="h2"
                        align="center"
                    >
                        Sync {this.props.user.time_tracking} to Redmine
                    </Typography>

                    <Paper style={{padding: 16}}>
                        <Grid container alignItems="flex-start" spacing={2}>
                            <Grid item xs={6}>
                                <KeyboardDatePicker
                                    autoOk={true}
                                    disableFuture={true}
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="From"
                                    format="yyyy-MM-DD"
                                    name="from"
                                    value={this.state.from}
                                    onChange={(date) => this.handleDateChange("from", date)}
                                    InputAdornmentProps={{position: "start"}}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <KeyboardDatePicker
                                    autoOk={true}
                                    disablePast={true}
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="To"
                                    format="yyyy-MM-DD"
                                    name="to"
                                    value={this.state.to}
                                    onChange={(date) => this.handleDateChange("to", date)}
                                    InputAdornmentProps={{position: "start"}}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={this.handleSync}
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                    startIcon={<SyncIcon/>}
                                >
                                    Sync
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={this.handleClear}
                                    variant="outlined"
                                    color="secondary"
                                    size={"small"}
                                    startIcon={<ClearIcon/>}
                                >
                                    Clear synced entries DB
                                </Button>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={this.handleLogout}
                                    variant="outlined"
                                    color="secondary"
                                    size={"small"}
                                    startIcon={<SettingsIcon/>}
                                >
                                    Reconfigure
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
                <Toaster/>
            </MuiPickersUtilsProvider>
        );
    }
}
