import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import Contact from './Contact';

class About extends Component {

    componentWillMount(){
        this.props.fetchPosts();
    }

    render() {
        const postItems = this.props.posts.map(post => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
            </div>
        ))
        return (
            <div>
                <Contact/>
                <h1>Posts</h1>
                {postItems}
            </div>
        )
    }
}

// About.PropTypes = {
//     fetchPosts: PropTypes.func.isRequired, 
//     posts: PropTypes.array.isRequired
// }

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(About);