import React, { Component } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';

export default class CommitComponent extends Component {

    shouldComponentUpdate() {
        return true
    }

    render() {
        const { author, commit } = this.props.commit
        return (
        <div className="App">
            <Card style={styles.card}>
                <CardHeader
                    title={`New commit by ${author.login !== null ?author.login : 'anonymous committer'}`}
                    subheader={`on ${moment(commit.date).format('MMMM Do YYYY, h:mm:ss a')}`}
                />
                <a id={`${author.profile_url}_link`} href={author.profile_url}>
                    <CardMedia
                        style={styles.media}
                        image={author.image !== null ? author.image : 'http://via.placeholder.com/300x300'}
                        title={`Profile picture of ${author.login}`}
                    />
                </a>
                <CardContent>
                    <p>
                    {commit.message}
                    </p>
                </CardContent>
                <CardActions style={styles.actions} disableActionSpacing>
                    <IconButton aria-label="Show commit">
                        <a id={`${commit.url}_link`} href={commit.url}>
                            <LaunchIcon />
                        </a>
                    </IconButton>
                </CardActions>
            </Card>
        </div>
        );
    }
}

const styles = {
    card: {
        maxWidth: 400,
        paddingBottom: 20,
        flex: '1'
    },
    media: {
        height: 300,
        width:300,
    },
    actions: {
        display: 'flex',
    },
};
