import React,{Component} from 'react';
//import {Link} from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net';


export class Tbl extends Component{

    constructor(props){
        super(props);


    }


    componentDidMount(){
        //console.log(this.el)
        this.$el = $(this.el);
        this.$el.DataTable({
            data: this.props.data,
            columns:[
                {title:"Name"},
                {title:"Email"}
            ]
        });

    }

    componentWillUnmount(){
        this.$el.DataTable.destroy(true);
    }

    //https://codepen.io/hartzis/pen/VvNGZP
    //https://github.com/erikras/redux-form/issues/1143




    render(){

        return(
            <div>
                <table width="100%" className="display" ref={el=>this.el=el}></table>
            </div>
        );
    }
}

