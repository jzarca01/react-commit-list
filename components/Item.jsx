import React, { Component } from 'react';
import moment from 'moment';
import AnimateHeight from 'react-animate-height';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class Item extends Component {

    state = { 
        height: '100',
        expanded: false 
    };

    toggle = () => {
        const { height, expanded } = this.state;

        this.setState({
            height: height === '100' ? '500' : '100',
            expanded: !expanded
        });

        this.props.masonry.initializeResizableChildren()
    };

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
                    <AnimateHeight
                        duration={ 500 }
                        height={ this.state.height }
                    >
                        <p>
                            {commit.message}
                        </p>
                    </AnimateHeight>
                </CardContent>
                <CardActions style={styles.actions} disableActionSpacing>
                    <IconButton aria-label="Show commit">
                        <a id={`${commit.url}_link`} href={commit.url}>
                            <LaunchIcon />
                        </a>
                    </IconButton>
                    <IconButton
                        onClick={this.toggle}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                        >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
        );
    }
}

const styles = {
    card: {
        width: 300,
        maxHeight: 700,
        paddingBottom: 20,
        flex: '1'
    },
    media: {
        height: 300,
        width:300
    },
    content: {
        height: 'auto',
        maxHeight: 1000,
        overflow: 'scroll',
        textOverflow: 'ellipsis'
    },
    actions: {
        display: 'flex'
    }
};