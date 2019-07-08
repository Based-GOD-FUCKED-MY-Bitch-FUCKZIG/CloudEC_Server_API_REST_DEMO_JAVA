/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import { Icon } from 'antd';
import styled from 'styled-components';

const SLIDER_HEIGHT = 38;
const HEADER_HEIGHT = 28;
const self = value => value;

export const px = (propName, fn = self) => ({ [propName]: propValue }) => {
    if (typeof propValue === 'number' || /^[0-9]$/.test(propValue)) {
      return `${fn(propValue)}px`;
    }
  
    return fn(propValue);
};

export const RelativeBox = styled.div`
  position: relative;
`;

export const Header = styled.div`
  height: ${HEADER_HEIGHT}px;
  line-height: 28px;
  background-color: #fafafa;
  color: #0d94ff;
  padding: 0 10px 0 10px;
  font-size: 12px;
`;
export const Wrapper = styled.div`
  position: relative;
  width: ${px('width')};
  height: ${px('imgHeight', height => height + SLIDER_HEIGHT + HEADER_HEIGHT)};
  margin: 0 auto;
`;
export const RefreshText = styled.span`
  cursor: pointer;
`;
export const SliderContainer = styled.div`
  position: relative;
  text-align: center;
  width: ${px('width')};
  height: ${SLIDER_HEIGHT}px;
  line-height: 38px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
  top: -6px;
`;

export const Slider = styled.div`
  position: absolute;
  top: 0px;
  left: ${props => props.left};
  width: 40px;
  height: 36px;
  background: #FFF;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: background 0.2s linear;
  &:hover {
    background: #1991fa;
  }
`;

export const SliderMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 36px;
  width: 300px;
`;

export const SliderIcon = styled(Icon).attrs({
  type: 'double-right'
})``;

export const RefreshIcon = styled(Icon).attrs({
  type: 'redo'
})`
  cursor: pointer;
  margin-right: 5px;
`;

export const CloseIcon = styled(Icon).attrs({
  type: 'close'
})`
  &&& {
    line-height: 28px;
  }
  color: #999;
  cursor: pointer;
  float: right;
`;
export const CorrectIcon = styled(Icon).attrs({
  type: 'check-circle'
})`
  font-size: 15px;
  color: #6ece7e;
  margin-right: 4px;
`;

export const ErrorIcon = styled(Icon).attrs({
  type: 'close-circle'
})`
  margin-right: 4px;
  font-size: 15px;
  color: #f34b4b;
`;

