/* ********************************************************* IMPORT ********************************************************* */
// react
import React, {Fragment, Component} from 'react';
// reactstrap
import {Table} from 'reactstrap';
// components
import LineChart from '../LineChart';
// services
import {deviceMoistureDataPost} from '../../services/productsApi';

/* ********************************************************* COMPONENT ********************************************************* */
class MonitorSoil extends Component {

    state = {
        data: [],
        deviceID: null
    };
    
    componentDidMount() {
        deviceMoistureDataPost(this.props.device.id).then(results => {
            const data = results.map(result => {return {value : Number(result.value), time: new Date(result.time)}});
            this.setState({data: data, deviceID: this.props.device.id});
        });
    };
    componentDidUpdate() {
        if(this.props.device.id !== this.state.deviceID) {
            deviceMoistureDataPost(this.props.device.id).then(results => {
                const data = results.map(result => {return {value : Number(result.value), time: new Date(result.time)}});
                this.setState({data: data, deviceID: this.props.device.id});
            });  
        };
    };

/* ********************************************************* RENDER ********************************************************* */
    render() {
        let chart = null;
        if (this.state.data.length) {
            chart = (
                <LineChart
                    data={this.state.data}
                    title={this.props.device.name}
                    color="rgb(0, 168, 230)"
                    min="10"
                    max="200"
                    chartData={this.props.chartData}
                />
            );
        };
        return (
            <Fragment>
                <h3 className="text-center">{this.props.hub.name}</h3>
                <Table borderless size="sm" className="mb-5">
                    <thead>
                        <tr>
                            <th className="align-bottom text-uppercase">{this.props.device.name}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{this.props.device.device_name}</th>
                            <td>
                                {this.props.device.connected
                                    ? this.props.data[0]
                                        ? this.props.data[0] + '%'
                                        : 'loading'
                                    : 'not connected'}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {chart}
            </Fragment>
        );
    };
};

/* ********************************************************* EXPORT ********************************************************* */
export default MonitorSoil;