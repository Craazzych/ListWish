import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import Header from '../../components/Header/header';

import './terms.css';

class Terms extends React.PureComponent {
    render() {
        return (
            <Container  className="terms-page">
                <Header/>
                <Row>
                    <Col>
                        <h1>Terms and Conditions ("Terms")</h1>


                        <p>Last updated: May 26, 2024</p>

                        <h2>1. Introduction</h2>
                        <p>Welcome to My Favourite WishList. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.</p>
                        <h2>2. Use of the Website</h2>
                        <p> You must be at least 18 years old to use our website.
                            You agree to use the website for lawful purposes only.
                            You must not use the website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</p>
                        <h2>3. User Accounts</h2>
                        <p>You may be required to create an account to access certain features of the website.
You are responsible for maintaining the confidentiality of your account information and password.
You agree to accept responsibility for all activities that occur under your account.</p>
                        <h2>4. Intellectual Property</h2>
                        <p>All content on the website, including text, graphics, logos, and images, is the property of My Favourite WishList or its content suppliers.
You may not reproduce, distribute, or create derivative works from the content without express written permission from us.</p>
                        <h2>5. Limitation of Liability</h2>
                        <p>The website is provided on an "as is" and "as available" basis.
We do not warrant that the website will be uninterrupted, error-free, or free from viruses or other harmful components.
We will not be liable for any damages of any kind arising from the use of the website.</p>
                        <h2>6. Changes to Terms and Conditions</h2>
                        <p>We reserve the right to modify these Terms and Conditions at any time.
Your continued use of the website after any changes indicates your acceptance of the new Terms and Conditions.</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Terms = connect(null, null)(Terms);
