import React from 'react'
import { Input, Button, message,Form } from 'antd'
import styled from 'styled-components';
import 'antd/dist/antd.css'
const FormWrapper = styled(Form)`
.ant-form-item {
  margin-bottom: 16px;
  font-size: 13px;
}

.ant-form-item-label {
  text-align: left;
  line-height: 32px;
}

& .ant-form-item-control-wrapper > .ant-form-item-control {
  line-height: 32px;
}
`;
const ResultText = styled.a`
&&& {
  color: #000000;
  font-size: 13px;
}
`;
const DoubleOperateWrapper = styled.span`
position: absolute;
right: -300px;
top: 0;
`;
const InfoItem = styled(Form.Item).attrs({
    colon: false,
    labelCol: { span: 3 },
    wrapperCol: {
      span: 3
    }
  })`
    .ant-form-item-children {
      position: static;
    }
    .ant-form-item-label {
      height: 32px;
      label {
        font-size: 13px;
        color: #999999;
      }
    }
  `;
let unixTimeValue;
let TimeValue;

class DateFormat extends React.Component{
    constructor(){
        super();
        this.state=({
            timeShow:"",
            timeUnix:""
        })
    }

    unixConversion =() =>{
        //console.log("unixTimeValue:",unixTimeValue);
        if(unixTimeValue === undefined || unixTimeValue ==="")
        {
           message.info("请输入Unix时间戳！");
           return;
        }
        if(!new RegExp(/^\d*\s*$/).test(unixTimeValue))
        {
           message.info("请输入正确Unix时间戳格式！");
           return;
        }

        var timeTemp = new Date(parseInt(unixTimeValue));
      
        var timeShow = timeTemp.toLocaleDateString()+" "+timeTemp.toTimeString().substr(0, 8);
       
        //console.log("显示时间：",timestamp);
        this.setState({
            timeShow,
        })   
    }
    TimeConversionUnix =() =>{
        //console.log("TimeValue:",TimeValue);
        
        if(TimeValue === undefined)
        {
           message.info("请输入北京时间！");
           return;
        }

        if(!new RegExp(/^[1-9]\d{3}(\/|-)(0?[1-9]|1[0-2])(\/|-)(0?[1-9]|[1-2]\d|3[0-1])\s+(0?\d|1\d|2[0-3]):(0?\d|[0-5]\d):(0?\d|[0-5]\d)$/).test(TimeValue))
        {
           message.info("请输入正确时间格式，实例：2019-06-27 08:00:00或者2019/06/27 08:00:00");
           return;
        }

        var timeUnix = Date.parse(TimeValue);
        
        //console.log("显示Unix时间：",timeUnix);
        this.setState({
            timeUnix: timeUnix+"毫秒",
        })   
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{height:'auto'}}>
            <FormWrapper  style={{ marginTop: '20px', marginLeft: '20px' }} autoComplete="off">
              <InfoItem label={"当前Unix时间戳"}>
                 <ResultText>{new Date().getTime()} 毫秒</ResultText>
              </InfoItem>
              <InfoItem label={"Unix时间戳"}>
                {getFieldDecorator('unixTime', {
                     rules: [{ pattern:/^\d*\s*$/ ,message:"Unix时间戳格式不对"}]
                 })(<Input addonAfter={"毫秒"}/>)}
                 <DoubleOperateWrapper>
                     <Button type="primary" size='small' onClick={this.unixConversion} >转换成北京时间</Button>
                     <ResultText style={{ marginLeft: '20px' }}>{this.state.timeShow}</ResultText>
                 </DoubleOperateWrapper>
              </InfoItem>
              <InfoItem label={"北京时间"}>
                {getFieldDecorator('Time', {
                    rules: [{ pattern:/^[1-9]\d{3}(\/|-)(0?[1-9]|1[0-2])(\/|-)(0?[1-9]|[1-2]\d|3[0-1])\s+(0?\d|1\d|2[0-3]):(0?\d|[0-5]\d):(0?\d|[0-5]\d)$/ ,message:"北京时间格式不对，格式显示2019-06-27 08:00:00或者2019/06/27 08:00:00"}]
                 })(<Input />)}
                  <DoubleOperateWrapper>
                    <Button type="primary" size="small" onClick={this.TimeConversionUnix} >转换成Unix时间戳</Button>
                    <ResultText style={{ marginLeft: '20px' }}>{this.state.timeUnix}</ResultText>
                  </DoubleOperateWrapper>
              </InfoItem>
            </FormWrapper>
         </div>     
        )
    }
}
const DateFormatForm = Form.create({
    onValuesChange(props,changedValues,values) {
       unixTimeValue = values.unixTime;
       TimeValue = values.Time;
    }
})(DateFormat);
export default DateFormatForm