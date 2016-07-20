import MDLBaseComponent, {
  MDLBaseAdapter
} from 'mdl-base-component';
import MDLRadioMixin, {
  Identifier
} from './mixin';

export default class MDLRadio extends MDLBaseComponent {
  static attachTo(root) {
    return new MDLRadio(root);
  }

  constructor(root) {
    super(root);

    const nativeInput = root.getElementsByClassName(Identifier.NATIVE_INPUT)[0];
    const elements = {
      [Identifier.ROOT]: root,
      [Identifier.NATIVE_INPUT]: nativeInput
    };

    this.elements_ = elements;

    this.initMdlRadio_();
  }
}

MDLRadioMixin.call(MDLRadio.prototype, MDLBaseAdapter);
