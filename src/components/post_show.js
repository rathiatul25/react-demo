import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PostShow, deletePost} from '../actions/index';
import {Link} from 'react-router-dom';

class FetchPost extends Component {

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.PostShow(id);
    }

    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {user} = this.props;
        //console.log(this.props);
        if(!user){
            return <div>Loading post</div>
        }
        return (
            <div>
                <Link to="/">List</Link>

                <table border={1} width="100%">
                    <tbody>
                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        <td><button onClick={this.onDeleteClick.bind(this)}>Delete</button></td>
                    </tr>
                    </tbody>
                </table>


            </div>
        );
    }
}

/*function mapStateToProps(state, ownProps) {
    //console.log(state.posts);
    return {post:state.posts[ownProps.match.params.id]};
}*/
function mapStateToProps({users}, ownProps) {
    //console.log(users);
    //console.log(posts[ownProps.match.params.id]);
    return {user:users.user_detail};
    //return {post:posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {PostShow, deletePost})(FetchPost);
/*function mapDispatchToProps(dispatch) {
    return bindActionCreators({PostShow: PostShow}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(FetchPost);
*/
