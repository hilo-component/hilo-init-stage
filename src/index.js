import Stage from 'hilojs/view/Stage';
import Ticker from 'hilojs/util/Ticker';

export default class initStage {
  dpr = window.devicePixelRatio;

  constructor(props = {}) {
    this.width = (props.width || 375) * this.dpr;
    this.height = (props.height || 667) * this.dpr;
    this.renderType = props.renderType || 'canvas';
    this.initStage();
    this.onResizeWindowElement();
    window.addEventListener('resize', this.onResizeWindowElement);
  }

  initStage() {
    const canvas = document.createElement('canvas');
    const dom = document.getElementById('__react-content');
    dom.appendChild(canvas);
    this.stage = new Stage({
      renderType: this.renderType,
      canvas,
      width: this.width,
      height: this.height,
    });
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.style.width = `${this.width / this.dpr}px`;
    canvas.style.height = `${this.height / this.dpr}px`;
    this.ticker = new Ticker(30);
    this.ticker.addTick(this.stage);
    this.ticker.start();
  }

  onResizeWindowElement = () => {
    const names = ['body > h1', '#qrcode', 'body > .highlight', 'body > .header'];
    if (window.innerWidth < 768) {
      this.stageMobileShow(names, 'none');
    } else {
      this.stageMobileShow(names, '');
    }
  };

  stageMobileShow = (d, s) => {
    d.forEach((key) => {
      const dom = document.querySelector(key);
      if (!dom) {
        return;
      }
      dom.style.display = s;
    });
    const root = document.querySelector('body .example');
    const container = document.querySelector('.container');
    if (container) {
      if (s === 'none') {
        container.style.cssText = 'width: 100%; max-width: auto;';
        root.style.padding = '0';
        document.body.style.margin = '0';
      } else {
        container.style.cssText = '';
        root.style.padding = '';
        document.body.style.margin = '';
      }
    }
  }
}
