
import React, {Component} from 'react';
import {Button, Icon, Row} from 'antd';

type Props = {
  sources: string[];
};
type State = {
  current: number;
};

class ImageCarousel extends Component<Props, State> {
  public static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  onNextClick = () => this.state.current < this.props.sources.length - 1 && this.setState((prevState) => ({current: prevState.current + 1}));

  onPrevClick = () => this.state.current > 0 && this.setState((prevState) => ({current: prevState.current - 1}));

  renderIndicator = () => {
    return this.props.sources.map((v, i) => {
      if (i === this.state.current) {
        return <Icon type='minus-circle' theme='filled' />
      }
      return <Icon type='minus-circle' />;
    })
  }

  render() {
    return (
      <div>
        <div className='carousel-wrapper'>
          <img className='image' src={this.props.sources[this.state.current]} />
          <Button className='next-btn' onClick={this.onNextClick}>
            <Icon type='caret-right' />
          </Button>
          <Button className='prev-btn' onClick={this.onPrevClick}>
            <Icon type='caret-left' />
          </Button>

        </div>
        <Row type='flex' justify='center' className='indicator-area'>
          {this.renderIndicator()}
        </Row>
      </div>
    );
  }
}

export default ImageCarousel;
