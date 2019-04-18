import moment from 'moment';
import { addFocusStyle } from '../../utils/StyleUtils';
moment.locale('en');

describe('Time Function Utils Tests', () => {
  it('Add Focus Style', () => {
    let styleMock = { mock: true };
    let style = addFocusStyle(true, styleMock);
    expect(style.outline).toEqual('cornflowerblue');
    expect(style.outlineStyle).toEqual('auto');
  });

  it('No Focus Style', () => {
    let styleMock = { mock: true };
    let style = addFocusStyle(false, styleMock);
    expect(style.outlineStyle).toEqual('');
  });
});
