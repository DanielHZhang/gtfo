
import React, {Component} from 'react';

type Props = {};
type State = {};

class Home extends Component<Props, State> {
  public static defaultProps = {};

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>Component</div>
    );
  }
}

export default Home;
