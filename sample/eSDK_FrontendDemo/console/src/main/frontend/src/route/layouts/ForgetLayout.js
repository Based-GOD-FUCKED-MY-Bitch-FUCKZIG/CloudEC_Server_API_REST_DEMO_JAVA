/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React, {Fragment } from 'react'
import { Card,Form,Input,Button,message} from 'antd'
import { post,put } from '@/utils/request'
import {logout} from '@/utils/xhr'
import styled from 'styled-components';
import i18n from '@/locales';


import {
    CloseIcon,
    Header,
    RefreshIcon,
    RefreshText,
    RelativeBox,
    Slider,
    SliderContainer,
    SliderMask,
    Wrapper,
    SliderIcon,
    CorrectIcon,
    ErrorIcon
  } from '@/component/slider/style'

const Search = Input.Search;
const CUT_WIDTH = 42;
const width = 300;
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
var PhoneName;//填入的手机号码
var userName;//填入账号/邮箱
var flag = 0;//判断当前是手机号码找回密码(flag=0)还是账号/邮箱找回密码(flag=1)
var tempName = 0;//将手机号或者账号/邮箱赋值给tempName
var countdown;//倒计时的计数
<<<<<<< HEAD
=======
=======
let PhoneName;//填入的手机号码
let userName;//填入账号/邮箱
let flag = 0;//判断当前是手机号码找回密码(flag=0)还是账号/邮箱找回密码(flag=1)
let tempName = 0;//将手机号或者账号/邮箱赋值给tempName
let clearInputValue;//清空表单的数据
let countdownShow;//倒计时显示
let countdown;//倒计时的计数
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104

class ForgetLayoutPage extends React.Component{
    
    constructor(){
        super();
        this.isMouseDown = false;
        this.state = {   
            phoneDisplay:"block",
            userDisplay:"none",
            sliderDisplay:"none",
            setPwdDisplay:"none",
            needValidate:true,
            noValidate:false,
            passwordValidate: false,
            disbledGetVerifyCode:null
        }  
<<<<<<< HEAD
        this.countdownShow = null //倒计时显示
=======
<<<<<<< HEAD
        this.countdownShow = null //倒计时显示
=======
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    }
    //获取滑块验证码
    sendSlideVerifyCode = () =>{
        document.removeEventListener('mousemove', this.handleDragMove);
        document.removeEventListener('mouseup', this.handleDragEnd);
        if(flag === 0)
        {
            tempName = "+86" + PhoneName;//将手机号赋值给tempName
            if( PhoneName === undefined )
            {
                message.info("请输入手机号");
                return
            }
        }
        else
        {
            tempName = userName;//将账号/邮箱赋值给tempName
            if( tempName === undefined )
            {
                message.info("请输入账号/邮箱");
                return
            }
        }
        
        let data = tempName;

        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json'
        };
        //获取滑块验证码
        post("/slideverifycode/send", {data}, headers).then(
            (res) => {
            
            if(!res.success) {
                message.error(res.msg);
                return;
            }

            let resbody = JSON.parse(res.data.entity);
            console.info("获取滑块验证码返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                return;
            }
            //清空画板
            this.clean();
            this.setState({
                slideVerifyCodeToken:resbody.data.token,
                originX: 0,
                originY: 0,
                sliderLeft: 0, //拖动按钮距离左侧距离
                blockLeft: 0, //滑块距离整服图左侧距离
                blockTop: `${resbody.data.pointY}px`,
                sliderMaskWidth: `${width}px`,
                sliderDisplay:"block",
                status: null // 表示滑块验证状态
            });
            document.addEventListener('mouseup', this.handleDragEnd);
            document.addEventListener('mousemove', this.handleDragMove);
            this.initImg(resbody.data.shadowImage, resbody.data.cutImage);
        })
    }

    initImg = (shadowImage, cutImage) => {
        const shadowImg = this.createImg(shadowImage, this.canvasCtx);
        const cutImg = this.createImg(cutImage, this.blockCtx);
    
        this.cutImg = cutImg;
        this.shadowImg = shadowImg;
    };

    createImg = (imgSrc, canvasCtx) => {
        const img = new Image();
        img.onload = () => {
          canvasCtx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = imgSrc;
        return img;
    };

    originCanvas = instans => {
        if (!instans) {
          return;
        }
        this.canvas = instans;
        this.canvasCtx = this.canvas.getContext('2d');
    };

    blockCanvas = instans => {
        if (!instans) {
           return;
        }
        this.block = instans;
        this.blockCtx = this.block.getContext('2d');
    }; 
    
    clean = () =>{
        this.canvasCtx.clearRect(0, 0, 300, 110);
        this.blockCtx.clearRect(0, 0, 49, 49);
    };
    
    handleDragEnd = e => {
        const { originX, blockLeft } = this.state;
        
        if (!this.isMouseDown) return false;
        this.isMouseDown = false;
        const { clientX } = e;
        //仅点击未拖动返回false
        if (clientX === originX) {
          return false;
        }
        const endTime = Date.now();
        const slideTime = endTime - this.startTime;

        let body = {
            "checkType": 1,
            "clientType": 0,
            "slideTime": slideTime,
            "pointX": parseInt(blockLeft, 10),
            "token": this.state.slideVerifyCodeToken,
            "user": tempName
        }

        const data = JSON.stringify(body);

        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json'
        };
        //校验滑块验证
        put("/slideverifycode/check", {data}, headers).then(
            (res) => {
            
            if(!res.success) {
                message.error(res.msg);
                return;
            }

            let resbody = JSON.parse(res.data.entity);
            console.info("校验滑块验证返回结果:",JSON.stringify(resbody));

            if(resbody.returnCode !== "000000000"){
                message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                this.setState({
                    status:"fail"
                })
                //滑块验证失败，再发一次
                this.sendSlideVerifyCode();
                return;
            }

            this.setState({
                checkSlideVerifyCodetoken:resbody.data.token,
                status:"success"
            });

            let sendVerifycode = {
                "user":tempName,
                "token":this.state.checkSlideVerifyCodetoken,
                "language":"zh-CN",
                "checkType":1
            }

            const data = JSON.stringify(sendVerifycode);

            
            //发送验证码
            post("/verifycode/send", {data}, headers).then(
               (res) => {

                this.setState({
                    sliderDisplay:"none",
                })
    
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("发送验证码返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== "000000000"){
<<<<<<< HEAD
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode,{sendLeftTime:this.state.countdown}));
=======
<<<<<<< HEAD
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode,{sendLeftTime:this.state.countdown}));
=======
                    //console.log("倒计时还剩下countdown秒",countdown);
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode,{sendLeftTime:countdown}));
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
                    return;
                }
                
                message.success("发送验证码成功!");
<<<<<<< HEAD
                clearInterval(this.countdownShow);
                //发送验证码成功后，需要180s后才能重新获取
                this.CountdownTime(180);
=======
<<<<<<< HEAD
                clearInterval(this.countdownShow);
                //发送验证码成功后，需要180s后才能重新获取
                this.CountdownTime(180);
=======
                //发送验证码成功后，需要180s后才能重新获取
                this.Countdown(180);
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            });
        }); 
    };
    //180秒倒计时
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    CountdownTime  = (value) =>{
      countdown = value;//倒计时的计数
      this.setState({
        countdown, 
        disbledGetVerifyCode:"success"
      });
      this.countdownShow = setInterval(() => {
        this.setState({
            countdown,
        });
        if( countdown === 0 )
        {
            clearInterval(this.countdownShow);
<<<<<<< HEAD
=======
=======
    Countdown  = (value) =>{
      countdown = value;
      countdownShow = setInterval(() => {
          this.setState({
            countdown,
            disbledGetVerifyCode:"success"
          });
          if(countdown === 0)
          {
            clearInterval(countdownShow);
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            this.setState({
                countdown:180,
                disbledGetVerifyCode:null,
            });
<<<<<<< HEAD
        }
        countdown--; 
=======
<<<<<<< HEAD
        }
        countdown--; 
=======
          }
          countdown--; 
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
      },1000);
    }

    handleDragMove = e => {
        e.preventDefault();
        e.stopPropagation();
        const { originX } = this.state;
        //const { width } = this.props;
        if (!this.isMouseDown) return false;
        const { clientX } = e;
        let moveX = clientX - originX;
        // const moveY = clientY - originY;
    
        if (moveX < 0) {
          moveX = 0;
        }
        if (moveX + CUT_WIDTH >= width) {
          moveX = width - CUT_WIDTH;
        }
        // this.trail.push(moveY);
        this.setState({
          sliderLeft: `${moveX}px`,
          // sliderMaskWidth: `${moveX}px`,
          blockLeft: `${moveX}px`,
        });
    };
    
    handleDragStart = e => {
        this.isMouseDown = true;
        this.startTime = Date.now();
        const { clientX, clientY } = e;
        this.setState({
          originX: clientX,
          originY: clientY
        });
    };
    
    handlePhoneSubmit = (e) => {
        this.handleSubmit(e);
    }

    handleMailSubmit = (e) => {
        this.handleSubmit(e);
    }
    //校验验证码
    handleSubmit = (e) => {
        e.preventDefault();
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
        //clearInterval(countdownShow);
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
        this.setState({
            disbledGetVerifyCode:null,
        });
        this.props.form.validateFields((err, values) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
            //console.log('values:'+JSON.stringify(values));

>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            if (!err) {

                let checkVerifycode = 0;
                if(flag === 0)
                {
                    checkVerifycode = {
                        "user":"+86"+values.Phone,
                        "code":values.verifycode
                    }
                }
                else
                {
                    checkVerifycode = {
                        "user":values.user,
                        "code":values.getVerifycode
                    }
                }
                
                const data = JSON.stringify(checkVerifycode);

                let headers = {'Content-Type': 'application/json',
                'Accept': 'application/json'
                };
               
                //校验验证码
                put("/verifycode/check", {data}, headers).then(
                    (res) => {
                   
                    if(!res.success) {
                        message.error(res.msg);
                        return;
                    }

                    let resbody = JSON.parse(res.data.entity);
                    console.info("校验验证码返回结果:",JSON.stringify(resbody));

                    if(resbody.returnCode !== "000000000"){
                        message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                        return;
                    }
                    
                    flag = 0;//防止使用邮件寻找密码后，切回到手机找回界面初始状态

                    this.setState({
                        checkVerifyCodetoken:resbody.data.token,
                        phoneDisplay:"none",
                        userDisplay:"none",
                        setPwdDisplay:"block",
                        needValidate: false,
                        noValidate: false,
                        passwordValidate: true,
                    });
                });
            }
        });
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    }
    
    // componentWillUnmount(){
    //     this.setState = (state, callback) => {
    //         return
    //     }
    // };
<<<<<<< HEAD
=======
=======
        //clearInputValue = setTimeout(this.props.form.resetFields,500);
    }
    
    componentWillUnmount(){
        clearTimeout(clearInputValue)
        this.setState = (state, callback) => {
            return
        }
    };
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    //重置密码
    resetPwdSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            //console.log('values:'+JSON.stringify(values));
            if (!err) {
            //判断输出的密码是否相同  
            if(values.NewPwd === undefined ||  values.password === undefined )
            {
                message.info("请输入密码");
                return 
            }

            if(values.NewPwd !== values.password)
            {
                message.info("输入的密码不相同");
                return 
            }

            let resetPwdBody  = {
                "user":tempName,
                "newPwd":values.NewPwd
            };
               
            let authorization = new Buffer(this.state.checkVerifyCodetoken).toString('base64');

            const data = JSON.stringify(resetPwdBody);
            let headers = {'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + authorization
            };

            //重置密码
            put("/password/reset", {data}, headers).then(
                (res) => {
               
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("重置密码返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }
 
                message.success("修改密码成功！");
                const { history } = this.props;
                logout().then(() => {
                   history.push('/')
                })
            });
          }
        });
    }
    
    onRefresh = () =>{
        this.sendSlideVerifyCode();
    }

    onClose= () =>{
        this.setState({
            sliderDisplay:"none"
        })
    }

    getVerifyCode = () =>{
        this.sendSlideVerifyCode();  
    }

    userFindLogin = () =>{
        //切换到通过账号/邮箱找回密码
        flag = 1;
        this.setState({   
            phoneDisplay:"none",
            userDisplay:"block",
            noValidate: true,
            needValidate: false,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            sliderDisplay:"none",
            disbledGetVerifyCode:null
        });
        //清空表单
        this.props.form.resetFields();
<<<<<<< HEAD
=======
=======
            sliderDisplay:"none"
        });
        clearInputValue = setTimeout(this.props.form.resetFields,500);
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
    }

    phoneFindLogin = () =>{
        //切换到通过手机找回密码
        flag = 0;
        this.setState({   
            phoneDisplay:"block",
            userDisplay:"none",
            noValidate: false,
            needValidate: true,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
            sliderDisplay:"none",
            disbledGetVerifyCode:null
        });
        this.props.form.resetFields();
    }

    handleLogoutClick = () => {
      clearInterval(this.countdownShow);
<<<<<<< HEAD
=======
=======
            sliderDisplay:"none"
        });
        clearInputValue = setTimeout(this.props.form.resetFields,500);
    }

    handleLogoutClick = () => {
>>>>>>> aefd7c3fcb8fc413cb1bb9693d0dd3b4827d3ed5
>>>>>>> c1c423d904179073920fb1f87c711ca4b882a104
      flag = 0;
      const { history } = this.props;
      logout().then(() => {
        history.push('/')
      })
    }
    
    getIcon = status => {
        if (status === "success") {
          return <CorrectIcon />;
        }
        else if (status === "fail") {
          return <ErrorIcon />;
        }
        else{
            return null;
        }
    };
    
    getText = status => {
        if (status === "success") {
            return "校验成功！";
        }
        else if (status === "fail") 
        {
            return "校验失败！";
        }
        else
        {
            return
        }
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const blockStyle = {
            position: 'absolute',
            left: this.state.blockLeft,
            top: this.state.blockTop,
            cursor: 'pointer'
        };
        const Link = styled.a`
        &&& {
        color: #0d94ff;
        font-size: 12px;
        }`;
        return( 
            <div>
            <Card  bordered={false} style={{ width: 700, margin:'0 auto',marginTop: 10}} >
                <h4 style={{ marginBottom: 16 }}>登录/&nbsp;忘记密码</h4>
                <div style={{display:this.state.phoneDisplay}}>
                    <Form onSubmit={this.handlePhoneSubmit} style={{width:600, style:"table", marginTop:'50px'}} className="ForgetPassword-form-phone" autoComplete="off">
                        <Form.Item label="手机" labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                            {getFieldDecorator('Phone', {
                                rules: [{ required: this.state.needValidate,pattern:/^[0-9]*$/, message: '手机号码应为纯号码且不能为空' }],
                            })(
                                <Input addonBefore={"+86(中国大陆)"} style={{ width:300, fontSize: 13 }}/>
                            )}
                        </Form.Item>

                        <Form.Item label="验证码" labelCol={{ span: 8}} wrapperCol={{ span: 16}}>
                            {getFieldDecorator('verifycode', {
                                rules: [{ required: this.state.needValidate, message:"请输入验证码"}],
                            })(
                                <div>
                                {!this.state.disbledGetVerifyCode ? (<Search  style={{ width:300, fontSize: 13 }}  enterButton="获取" onSearch={this.getVerifyCode}/>):(
                                   <Search  style={{ width:300, fontSize: 13}}  enterButton={this.state.countdown+"秒后重新获取"} /> 
                                )}
                                </div>
                            )}
                        </Form.Item>
                       
                        <Form.Item>
                            <Link onClick={this.userFindLogin} style={{marginLeft:"400px"}}>通过邮箱/账号找回</Link>
                        </Form.Item>
                        <Form.Item  wrapperCol={{ span: 16 , offset:8}}>
                            <Button type="primary" htmlType="submit">下一步</Button>
                            <Button style={{ marginLeft: 24 }} onClick={this.handleLogoutClick} >取消</Button>
                        </Form.Item>
                    </Form> 
                </div>

                <div style={{display:this.state.userDisplay}}>
                    <Form onSubmit={this.handleMailSubmit} style={{width:600, style:"table", marginTop:'50px'}} className="ForgetPassword-form-user" autoComplete="off">
                        <Form.Item label="账号/邮箱" labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                            {getFieldDecorator('user', {
                                rules: [{ required: this.state.noValidate, message: '请输入邮箱地址或账号' }],
                            })(
                                <Input  style={{ width:300, fontSize: 13 }}/>
                            )}
                        </Form.Item>

                        <Form.Item label="验证码" labelCol={{ span: 8}} wrapperCol={{ span: 16}}>
                            {getFieldDecorator('getVerifycode', {
                                rules: [{ required: this.state.noValidate, message:"请输入验证码"}],
                            })(
                                <div>
                                {!this.state.disbledGetVerifyCode ? (<Search  style={{ width:300, fontSize: 13 }}  enterButton="获取" onSearch={this.getVerifyCode}/>):(
                                   <Search  style={{ width:300, fontSize: 13 }}  enterButton={this.state.countdown+"秒后重新获取"} /> 
                                )}
                                </div>
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Link onClick={this.phoneFindLogin} style={{marginLeft:"420px"}}>通过手机找回</Link>
                        </Form.Item>
                        <Form.Item  wrapperCol={{ span: 16 , offset:8}}>
                            <Button type="primary" htmlType="submit">下一步</Button>
                            <Button style={{ marginLeft: 24 }} onClick={this.handleLogoutClick} >取消</Button>
                        </Form.Item>
                    </Form>
                </div>

                <div style={{display:this.state.sliderDisplay}}>
                    <Wrapper  width={width} imgHeight={160} autoComplete="off">
                        <Header>
                        <RefreshIcon onClick={this.onRefresh} />
                        <RefreshText onClick={this.onRefresh}>
                            换一个
                        </RefreshText>
                        <CloseIcon onClick={this.onClose} />
                        </Header>
                        <RelativeBox>
                        <canvas width={width} height={110} ref={this.originCanvas} />
                        <canvas
                            style={blockStyle}
                            ref={this.blockCanvas}
                            width={49}
                            height={49}
                            onMouseDown={this.handleDragStart}
                            />
                        </RelativeBox>
                        <SliderContainer>
                            {!this.state.status ? (
                                <SliderMask width={width} >
                                    向右拖动滑块填充拼图
                                    <Slider
                                    onMouseDown={this.handleDragStart}
                                    left={this.state.sliderLeft}
                                    >
                                    <SliderIcon status={this.state.status}/>
                                    </Slider>
                                </SliderMask>
                                ) : (
                                <Fragment>
                                    {this.getIcon(this.state.status)}
                                    {this.getText(this.state.status)}
                                </Fragment>
                                )}
                        </SliderContainer>
                    </Wrapper>
                </div>

                <div style={{display:this.state.setPwdDisplay}}>
                    <Form onSubmit={this.resetPwdSubmit} style={{width:600, marginTop:'50px'}} >
                        <Form.Item label="新密码" labelCol={{ span: 8 }} wrapperCol={{ span: 16}} autoComplete="off">
                            {getFieldDecorator('NewPwd', {
                                rules: [{ required: this.state.passwordValidate, message: '请输入新密码' }],
                            })(
                                <Input style={{ width:200, fontSize: 13 }} type="password" placeholder="密码"/>
                            )}
                        </Form.Item>

                        <Form.Item label="确定密码" labelCol={{ span: 8}} wrapperCol={{ span: 16}}>
                            {getFieldDecorator('password', {
                                rules: [{ required: this.state.passwordValidate, message:"请输入确定密码"}],
                            })(
                                <Input style={{ width:200, fontSize: 13 }} type="password" placeholder="密码"/>
                            )}
                        </Form.Item>
                        
                        <Form.Item  wrapperCol={{ span: 16 , offset:8}}>
                            <Button type="primary" htmlType="submit" >发送</Button>
                            <Button style={{ marginLeft: 24 }} onClick={this.handleLogoutClick} >取消</Button>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
            </div>
        )}
        
}
const ForgetLayout = Form.create({
    onValuesChange(props,changedValues,values) {
        PhoneName = values.Phone;
        userName = values.user;
    }
})(ForgetLayoutPage);
export default ForgetLayout;