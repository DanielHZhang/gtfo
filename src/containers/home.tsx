import React, {Component} from 'react';
import {Layout, Spin, Card, Row, Carousel, Col, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {RootState} from '../reducers';
import {getHouses} from '../actions/get-houses';
import {HouseData} from '../reducers/data-types';
import {Status} from '../reducers/get-houses';
import ImageCarousel from '../components/image-carousel';

type StateProps = {
  data: HouseData[];
  status: Status;
};
type DispatchProps = {
  getHouses: typeof getHouses;
};
type Props = StateProps & DispatchProps;
type State = {};

class Home extends Component<Props, State> {
  public static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getHouses();
  }

  renderHouses = () => {
    return this.props.data.map((value, i) => {
      return (
        <Card key={i} bordered={false}>
          <Row gutter={16}>
            <Col span={12}>
              <ImageCarousel sources={value.images} />
            </Col>
            <Col span={12}>
              <Row style={{fontSize: '30px', fontWeight: 700}}>
                <a href={value.url}>{value.address}</a>
              </Row>
              <Row style={value.utilities ? {color: 'green'} : {color: 'red'}}>
                <span style={{fontSize: '24px', fontWeight: 700}}>${value.rent.value} - {value.bedrooms} bedrooms</span>
              </Row>
              <Row style={{fontSize: '20px', fontWeight: 700}}>
                <div>Location: {value.location}</div>
                <div>Distance: {value.distance}km</div>
              </Row>
              <Row>
                <div>Available: {value.available}</div>
                <div>Lease for: {value.lease.term} months</div>
              </Row>
              <Row style={{marginTop: '20px'}}>{value.description}</Row>
            </Col>
          </Row>
        </Card>
      );
    });
  }

  render() {
    if (this.props.status === 'requested' || this.props.status === 'idle') {
      return (
        <Spin size='large' />
      );
    }
    return (
      <Layout className='home'>
        {this.renderHouses()}
      </Layout>
    );
  }
}

function mapStateToProps({housing}: RootState): StateProps {
  return {
    data: housing.data,
    status: housing.status,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return bindActionCreators({getHouses}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
