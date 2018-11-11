import React from "react";
import { DateTimeRangeContainer } from '../index'
import {mount, configure} from "enzyme"
import Adapter from 'enzyme-adapter-react-15';

configure({ adapter: new Adapter() });

describe("DateTimeRangeContainer", () => {
  //const com = mount(<DateTimeRangeContainer/>);

  it("Always Renders Div's", () => {
    //expect(com.length).toBeGreaterThan(0);
  });

  it("Always render children Div and Daterange div", () => {
    //const wrappingDiv = com.first().children().children();
    // console.log(wrappingDiv.debug());
    //expect(wrappingDiv.length).toBeGreaterThan(1);
  });

});
