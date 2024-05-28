import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Collapse, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

import { setProcessingForm } from '../../actions/appActions';
import { addProductToList, getLists } from '../../actions/listsActions';
import { postProduct, setProduct } from '../../actions/productsActions';
import { selectSelectedList } from '../../selectors/lists';

import './addproduct.css';

const mapDispatchToProps = (dispatch) => {
    return {
        setProcessingForm: (form, value) => dispatch(setProcessingForm(form, value)),
        addProduct: (slug) => dispatch(postProduct(slug)),
        setProduct: (slug, productData) => dispatch(setProduct(slug, productData)),
        addProductToList: (slug, list) => dispatch(addProductToList(slug, list)),
        getLists: () => dispatch(getLists()),
    }
}

const mapStateToProps = (state) => {
    const isProcessing = (state.app.processing && state.app.processing.addingProduct) || false;
    const listId = selectSelectedList(state);

    return {
        isProcessing,
        listId,
    };
};

class AddProduct extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            showAddProduct: JSON.parse(localStorage.getItem('addproduct_state')) || false,
            products: [],
        }
    }

    onShowClick(e) {
        e.preventDefault();
        e.stopPropagation();
        localStorage.setItem('addproduct_state', !this.state.showAddProduct);
        this.setState({
            showAddProduct: !this.state.showAddProduct,
        })
    }

    onAddProductTemplate() {
        this.setState(prevState => ({
            products: [...prevState.products, { name: '', url: '' }]
        }));
    }

    onUpdateProductName(index, e) {
        const newProducts = this.state.products.slice();
        newProducts[index].name = e.target.value;
        this.setState({ products: newProducts });
    }

    onUpdateProductUrl(index, e) {
        const newProducts = this.state.products.slice();
        newProducts[index].url = e.target.value;
        this.setState({ products: newProducts });
    }

    async onSave() {
        const { addProduct, setProduct, addProductToList, getLists, listId, setProcessingForm } = this.props;

        setProcessingForm('addingProduct', true);

        try {
            for (const product of this.state.products) {
                let productData = await addProduct(product.url);
                await addProductToList(product.url, listId);
                setProduct(product.url, productData);
            }
            await getLists();

            window.gtag('event', 'add_product', {'method': 'form'});
            setProcessingForm('addingProduct', false);
            this.setState({
                products: [],
            });
        } catch (error) {
            console.error("Failed to add product:", error);
            setProcessingForm('addingProduct', false);
        }
    }

    render() {
        const { isProcessing } = this.props;

        return (
            <Row className="addproduct">
                <Col md={12} className="addproduct__trigger-container">
                    <a
                        className="addproduct__trigger"
                        href="#addproduct"
                        onClick={this.onShowClick.bind(this)}
                        aria-controls="addproduct-collapse"
                        aria-expanded={this.state.showAddProduct}>
                        {this.state.showAddProduct ? <FaMinusCircle /> : <FaPlusCircle />}
                        <span>Add product</span>
                    </a>
                </Col>
                <Col md={12}>
                    <Collapse in={this.state.showAddProduct}>
                        <div id="addproduct-collapse">
                            <Button onClick={this.onAddProductTemplate.bind(this)} variant="outline-secondary">
                                Add Product
                            </Button>
                            {this.state.products.map((product, index) => (
                                <InputGroup className="mt-3" key={index}>
                                    <FormControl
                                        onChange={this.onUpdateProductName.bind(this, index)}
                                        value={product.name}
                                        placeholder="Product name"
                                    />
                                    <FormControl
                                        onChange={this.onUpdateProductUrl.bind(this, index)}
                                        value={product.url}
                                        placeholder="Product URL"
                                    />
                                </InputGroup>
                            ))}
                            <Button
                                onClick={this.onSave.bind(this)}
                                variant="outline-secondary"
                                disabled={isProcessing}
                                className="mt-3">
                                {isProcessing && <Spinner animation="grow" size="sm" variant="warning" />}
                                Save Products
                            </Button>
                        </div>
                    </Collapse>
                </Col>
            </Row>
        );
    }

    constructAddLink() {
        let href = window.location.href;
        let link = href + (href.substring(href.length - 1) === '/' ? '' : '/') + 'add?product=';
        // eslint-disable-next-line no-script-url
        return `javascript:(function(){if(window.location.href.indexOf("unrealsales.io")!==-1)return;var f="${link}";location.href=f;})()`
    }
}

export default AddProduct = connect(mapStateToProps, mapDispatchToProps)(AddProduct);
