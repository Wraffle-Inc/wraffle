import getRange from './getRange';

const classNames = {
  wrapper: 'ios-style-picker',
  optionList: 'ios-style-picker__option-list',
  optionItem: 'ios-style-picker__option-item',
  highlight: 'ios-style-picker__highlight',
  highlightList: 'ios-style-picker__highlight-list',
  highlightItem: 'ios-style-picker__highlight-item',
};

type IosStylePickerHtmlOptions = {
  container: HTMLElement;
  isInfinite: boolean;
  wheelCount: number;
  source: {text: string}[];
  itemAngle: number;
  itemHeight: number;
  radius: number;
};
class IosStylePickerHtml {
  private _container: HTMLElement;
  private _optionList: HTMLElement;
  private _optionItems: NodeListOf<HTMLElement>;
  private _highlightList: HTMLElement;

  private _source: {text: string}[];
  private _isInfinite: boolean;
  private wheelCount: number;
  private itemAngle: number;
  private itemHeight: number;
  private radius: number;

  constructor({
    container,
    source,
    isInfinite,
    wheelCount,
    itemAngle,
    itemHeight,
    radius,
  }: IosStylePickerHtmlOptions) {
    this._container = container;

    this._source = source;
    this._isInfinite = isInfinite;
    this.wheelCount = wheelCount;
    this.itemAngle = itemAngle;
    this.itemHeight = itemHeight;
    this.radius = radius;

    const optionListHtml = this._getOptionItems();

    const highListHtml = this._getHighlightItems();

    this._container.innerHTML = `
      <div class="${classNames.wrapper}">
        <ul
          class="${classNames.optionList}"
          style="transform: translate3d(0, 0, ${-this.radius}px) rotateX(0deg);"
        >
          ${optionListHtml}
        </ul>
        <div
          class="${classNames.highlight}"
          style="height: ${this.itemHeight}px; line-height: ${this.itemHeight}px;"
        >
          <ul class="${classNames.highlightList}">
            ${highListHtml}
          </ul>
        </div>
      </div>`;

    const optionList = this._container.querySelector<HTMLElement>(
      `.${classNames.optionList}`,
    );
    if (!optionList) {
      throw new Error('optionList does not exists');
    }
    this._optionList = optionList;

    const optionsItems = this._container.querySelectorAll<HTMLElement>(
      `.${classNames.optionItem}`,
    );
    if (!optionsItems) {
      throw new Error('optionList does not exists');
    }
    this._optionItems = optionsItems;

    const highlightList = this._container.querySelector<HTMLElement>(
      `.${classNames.highlightList}`,
    );
    if (!highlightList) {
      throw new Error(`highlightList does not exists.`);
    }
    if (isInfinite) {
      highlightList.style.top = `${-this.itemHeight}px`;
    }
    this._highlightList = highlightList;
  }

  _getOptionItems() {
    const optionIndices = this._isInfinite
      ? getRange(
          -this.wheelCount / 4,
          this._source.length + this.wheelCount / 4,
        )
      : getRange(0, this._source.length);

    const optionListItems = optionIndices.map(i => ({
      rotateX: -this.itemAngle * i,
      index: i,
      text: this._source[(i + this._source.length) % this._source.length].text,
    }));

    return optionListItems.reduce(
      (acc, item) =>
        `${acc}
        <li
          class="${classNames.optionItem}"
          style="
            top: ${this.itemHeight * -0.5}px;
            height: ${this.itemHeight}px;
            line-height: ${this.itemHeight}px;
            transform: rotateX(${item.rotateX}deg) translate3d(0, 0, ${this.radius}px);
          "
          data-index="${item.index}"
        >
          ${item.text}
        </li>`,
      '',
    );
  }

  _getHighlightItems() {
    const indices = this._isInfinite
      ? getRange(-1, this._source.length + 1)
      : getRange(0, this._source.length);

    const items = indices.map(i => ({
      text: this._source[(i + this._source.length) % this._source.length].text,
    }));

    return items.reduce(
      (acc, item) =>
        `${acc}
        <li
          class="${classNames.highlightItem}"
          style="height: ${this.itemHeight}px;"
        >
          ${item.text}
        </li>`,
      '',
    );
  }

  scroll(scrollCount: number) {
    const dz = -this.radius;
    const rotateX = this.itemAngle * scrollCount;
    this._optionList.style.transform = `translate3d(0, 0, ${dz}px) rotateX(${rotateX}deg)`;

    const dy = -scrollCount * this.itemHeight;
    this._highlightList.style.transform = `translate3d(0, ${dy}px, 0)`;

    [...this._optionItems].forEach(itemElem => {
      if (itemElem.dataset.index === undefined) {
        throw new Error('itemElem.dataset.index does not exists');
      }
      itemElem.style.visibility =
        Math.abs(+itemElem.dataset.index - scrollCount) > this.wheelCount / 4
          ? 'hidden'
          : 'visible';
    });
  }

  addEventListener(
    eventName: 'touchstart' | 'touchmove' | 'touchend',
    listener: (evt: TouchEvent) => any,
  ) {
    this._container.addEventListener(eventName, listener);
  }

  removeEventListener(
    eventName: 'touchstart' | 'touchmove' | 'touchend',
    listener: (evt: TouchEvent) => any,
  ) {
    this._container.removeEventListener(eventName, listener);
  }

  equalOrContains(target: EventTarget | null) {
    return (
      this._container?.contains(target as Node) || this._container === target
    );
  }

  clear() {
    this._container.innerHTML = '';
  }

  get container() {
    return this._container;
  }
}

export default IosStylePickerHtml;
