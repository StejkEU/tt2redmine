import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {clockify, other, toggl} from '../helpers/timeTrackings';
import SaveIcon from '@material-ui/icons/Save';

export default class Login extends Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
    };

    state = {
        username: '',
        url: '',
        token: '',
        time_tracking: toggl,
        toggl_api_key: '',
        toggl_tags: 'redmine,',
        clockify_type: 'cloud',
        clockify_api_key: '',
        clockify_url: 'https://api.clockify.me',
    };

    handleLogin = () => {
        this.props.onLogin({
            username: this.state.username,
            url: this.state.url,
            token: this.state.token,
            time_tracking: this.state.time_tracking,
            toggl_api_key: this.state.toggl_api_key,
            toggl_tags: this.state.toggl_tags,
            clockify_type: this.state.clockify_type,
            clockify_api_key: this.state.clockify_api_key,
            clockify_url: this.state.clockify_url,
            loggedIn: true,
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    timeTrackingComponents = () => {
        switch (this.state.time_tracking) {
            case clockify:
                return (
                    <Fragment>
                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                required
                                aria-label="Clockify type"
                                name="time_tracking"
                                value={this.state.clockify_type}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value={"cloud"} control={<Radio/>} label="Cloud"/>
                                <FormControlLabel value={"self-hosted"} control={<Radio/>} label="Self-hosted"/>
                            </RadioGroup>
                        </Grid>

                        {this.state.clockify_type === "cloud" ? null : (
                            <Grid item xs={12}>
                                <TextField
                                    variant={"outlined"}
                                    fullWidth
                                    required
                                    type="url"
                                    id="standard-basic"
                                    label="Clockify URL"
                                    name="clockify_url"
                                    onChange={this.handleChange}
                                    value={this.state.clockify_url}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                fullWidth
                                required
                                id="standard-basic"
                                label="Clockify API Key"
                                name="clockify_api_key"
                                onChange={this.handleChange}
                                value={this.state.clockify_api_key}
                            />
                        </Grid>
                    </Fragment>
                );
            case toggl:
                return (
                    <Fragment>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                fullWidth
                                required
                                id="standard-basic"
                                label="Toggl API Key"
                                name="toggl_api_key"
                                onChange={this.handleChange}
                                value={this.state.toggl_api_key}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                fullWidth
                                required
                                id="standard-basic"
                                label="Toggl Tags (Separated by commas)"
                                name="toggl_tags"
                                onChange={this.handleChange}
                                value={this.state.toggl_tags}
                            />
                        </Grid>
                    </Fragment>
                );
            default:
                return (
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                        >
                            Not yet supported. Please report your time-tracking to developer at&nbsp;
                            <a href={"mailto:jakub@jakub-stejskal.cz"}>jakub@jakub-stejskal.cz</a>
                        </Typography>
                    </Grid>
                );
        }
    }

    render() {
        return (
            <div style={{padding: 16, margin: 'auto', maxWidth: 600}}>
                <Typography
                    variant="h2"
                    component="h2"
                    align="center"
                >
                    Setup TT2Redmine
                </Typography>

                <Paper style={{padding: 16}}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                                component="h3"
                                align="center"
                            >
                                Redmine
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                fullWidth
                                required
                                type="url"
                                id="standard-basic"
                                label="Redmine URL"
                                name="url"
                                placeholder="https://subdomain.domain.com"
                                onChange={this.handleChange}
                                value={this.state.url}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant={"outlined"}
                                fullWidth
                                required
                                id="standard-basic"
                                label="Redmine Token"
                                name="token"
                                onChange={this.handleChange}
                                value={this.state.token}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider/>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography
                                variant="h3"
                                component="h3"
                                align="center"
                            >
                                Time-tracking software
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <RadioGroup
                                row
                                required
                                aria-label="time tracking software"
                                name="time_tracking"
                                value={this.state.time_tracking}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel value={toggl} control={<Radio/>} label="Toggl"/>
                                {/*<FormControlLabel value={clockify} control={<Radio/>} label="Clockify"/>*/}
                                <FormControlLabel value={other} control={<Radio/>} label="Other"/>
                            </RadioGroup>
                        </Grid>

                        {this.timeTrackingComponents()}

                        <Grid item xs={12}>
                            {this.state.time_tracking === other ? null : (
                                <Button
                                    fullWidth
                                    onClick={this.handleLogin}
                                    variant="contained"
                                    color="primary"
                                    size={"large"}
                                    startIcon={<SaveIcon/>}
                                >
                                    Setup
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}
