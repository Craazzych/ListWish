import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';


import Header from '../../components/Header/header';
import Grid from '../../components/Grid/grid';
import AddProduct from '../../components/AddProduct/addproduct';


import './tracker.css';

const mapStateToProps = (state) => {
    const userToken = state.app.userToken;

    return {
        userToken,
    };
};

class Tracker extends React.PureComponent {
    componentDidMount() {
        const { userToken } = this.props;

        if (!userToken) {
            window.gtag('event', 'tracker', {'type': 'loggedout'});
            window.tracker.appHistory.push('/tracker/login/');
        }
    }
    render() {
        const { userToken } = this.props;
        if (!userToken) {
            return null;
        }
        return (
            <Container  className="list-page">
                <Header/>
                <AddProduct/>
                <Grid/>
            </Container>
        )
    }
}

export default Tracker = connect(mapStateToProps, null)(Tracker);
