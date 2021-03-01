import React, {Component} from 'react';
import {connect} from 'react-redux';
import Product from "../../components/Product/Product";

import {brandFilter} from "../../pipes/brandFilter";
import {orderByFilter} from "../../pipes/orderByFilter";

import LayoutMode from "../../components/LayoutMode/LayoutMode";
import {paginationPipe} from "../../pipes/paginationFilter";
import Pagination from "../../components/Pagination/Pagination";
import { API } from 'aws-amplify';
import { recommendFilter } from '../../pipes/recommend';

class RelatedProductList extends Component {

    state = {
        colValue : 'col-lg-3',
        perPage: 4,
        currentPage: 1,
        pagesToShow: 3,
        gridValue: 4,
        relatedProductArr: []
    };


    async componentDidMount() {
        const myInit = {
            "queryStringParameters" : {
              "productId": this.props.products.pid
            }
          };
        const data = await API.get('personalize','/recommend', myInit);
        this.setState({ relatedProductArr: data});

        const filterByRecoArr = recommendFilter(this.props.products, data)
        //console.log(filterByRecoArr);
    }

    render() {

        return (
            <div className="col-lg-9">
                <div><h3>All related products...</h3></div>
                <div className="row">
                    {paginationPipe(this.props.products, this.state).map(product =>{
                        let classes = `${this.state.colValue} col-md-6 mb-4`;
                        console.log(product);
                        return (<div className={classes}>
                            <Product key={product.id} product={product} />
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const brands = state.brandFilter;
    const orderBy = state.orderBy;
    // const reco = this.state.productArr;
    
    
    // const filterByRecoArr = recommendFilter(state.shop.products, reco);

    // console.log(reco);

    const filterByBrandArr = brandFilter(state.shop.products, brands);
    const filterByOrderArr = orderByFilter(filterByBrandArr, orderBy);


    return {products: filterByOrderArr }
};

export default connect(mapStateToProps, null)(RelatedProductList);
