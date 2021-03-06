import React, { Component } from 'react';

import EmailIcon from './EmailIcon';
import CompanyLogo from './CompanyLogo';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './../../../css/app.module.css';
import STATUS_COLORS from './../../../status_colors';

class InternshipCard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            applicationData: props.applicationData,
            raised: false
        }

        this.onMouseOver = this.onMouseOver.bind(this);
        this.onMouseout = this.onMouseOut.bind(this);
    }

    onMouseOver = () => this.setState({ raised: true });
    onMouseOut = () => this.setState({ raised: false });

    getImageSource(domain) {
        return '//logo.clearbit.com/' + domain
    }

    getStatusColor(status) {
        return {
            'color': STATUS_COLORS[status]
        }
    }

	render() {
        const {applicationData} = this.state
        if (applicationData.logo !== '' && applicationData.name !== undefined) {
            return (
                <Card 
                    raised={this.state.raised}
                    className={styles.applicationCard} 
                    onClick={() => this.props.selectCard(this.state.applicationData)}
                    onMouseOver={this.onMouseOver}
                    onMouseOut={this.onMouseOut}
                    >
                    <Grid container>
                        <Grid item className={styles.domainIcon}>
                            <CompanyLogo source={applicationData.logo}/>
                        </Grid>
                        <Grid item xs={12} sm className={styles.domainIcon}>
                            <CardContent className={styles.applicationContent}>
                                <Grid container>
                                    <Grid item>
                                        <Typography variant="h6">
                                            {applicationData.name}
                                        </Typography>  
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item>
                                        <Typography gutterBottom>
                                            Status: 
                                        </Typography>  
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom className={styles.status} style={this.getStatusColor(applicationData.recent_status)}>
                                            {applicationData.recent_status}
                                        </Typography>  
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Grid>
                        <EmailIcon emailCount={applicationData.emails.length}></EmailIcon>
                    </Grid>
                </Card>
		    );
        } else {
            return <React.Fragment></React.Fragment>
        }
	}
}

export default InternshipCard;
