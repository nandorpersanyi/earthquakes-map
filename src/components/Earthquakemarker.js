import React from 'react';
import '../styles//Earthquakemarker.css';

class Earthquakemarker extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            showDesc: { display: 'none' },
            plotColor: 'rgba(255,0,0,',
            //hoverSize: 1
        }
    }

    showDetails = () => {
        this.setState({
            showDesc: { display: 'block' },
            plotColor: 'rgba(1,196,1,',
            //hoverSize: 1.2
        });
    }

    hideDetails = () => {
        this.setState({
            showDesc: { display: 'none' },
            plotColor: 'rgba(255,0,0,',
            //hoverSize: 1
        });
    }

    render() {
        const { mag, title, tsunami, status, place } = this.props.properties;
        const quakeRatio = mag * 10;
        const earthquakeMarkerStyle = {
            width: quakeRatio + 'px',
            height: quakeRatio + 'px',
            marginTop: '-' + ((quakeRatio) / 2) + 'px',
            marginLeft: '-' + ((quakeRatio) / 2) + 'px',
            backgroundColor: this.state.plotColor + (mag * 0.115) + ')'
        };

        return (
            <div className="earthquakemarker-component">
                <div className="earthquake-description" style={this.state.showDesc}>
                    <span><strong>Title: </strong>{title}</span>
                    <span><strong>Place: </strong>{place}</span>
                    <span><strong>Tsunami: </strong>{tsunami}</span>
                    <span><strong>Magnitude: </strong>{mag}</span>
                    <span><strong>Status: </strong>{status}</span>
                </div>
                <div onClick={this.props.zoomIn} onMouseOver={this.showDetails} onMouseOut={this.hideDetails} className="earthquake-marker-round" style={earthquakeMarkerStyle}></div>
            </div>

        );
    }
}

export default Earthquakemarker;
