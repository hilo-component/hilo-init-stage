import initStage from '../';

class Demo extends initStage {
  constructor(props) {
    super(props);
    this.init();
    this.stage.background = '#000';
  }

  init() {
    console.log(this);
  }
}

new Demo();
