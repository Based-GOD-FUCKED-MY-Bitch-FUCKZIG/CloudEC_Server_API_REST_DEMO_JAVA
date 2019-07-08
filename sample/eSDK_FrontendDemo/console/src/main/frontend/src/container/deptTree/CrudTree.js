/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message, Tree, Input, Button , Tooltip, Modal, Form} from 'antd'
import { post, get, put, del } from '@/utils/request'
import i18n from '@/locales'

const { TreeNode } = Tree;
const confirm = Modal.confirm;

//子组件添加部门Form表单
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form, parentDept} = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal visible={visible} title="添加部门" okText="确认" cancelText="取消" onCancel={onCancel} onOk={onCreate}
          maskClosable={false} keyboard={false}>
            <Form>
              <Form.Item label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('deptName', {
                  rules: [{ required: true, message: '部门名称不能为空!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="上级部门" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('parentDeptName',{
                            initialValue: parentDept,
                        })(<Input type="textarea" readOnly/>)}
              </Form.Item>
              <Form.Item label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('note')(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
);

//子组件重命名部门
const RenameDeptForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
      render() {
        const { visible, onCancel, onCreate, form, selectedDept, note} = this.props;
        const { getFieldDecorator } = form;
        return (
          <Modal visible={visible} title="修改部门" okText="确认" cancelText="取消" onCancel={onCancel} onOk={onCreate}
          maskClosable={false} keyboard={false}>
            <Form>
              <Form.Item label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('deptName', {
                  initialValue: selectedDept,
                  rules: [{ required: true, message: '部门名称不能为空!' }],
                })(<Input />)}
              </Form.Item>
              <Form.Item label="备注" labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                {getFieldDecorator('note',{
                  initialValue: note,
                })(<Input type="textarea" />)}
              </Form.Item>
            </Form>
          </Modal>
        );
      }
    },
);

export default class CrudTree extends React.Component{
    constructor(){
        super();
        this.state = {   
            organizaions: [],
            disabled: true,
            addDeptVisible: false,
            loadedKeys: ["1"],
            renameDeptVisible: false,

            headers: {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': sessionStorage.getItem('access_token')
                    },
        }
    }

    //初始化查询根部门，并将值传递到父组件
    componentDidMount() {
        this.queryOrganizaiton(1).then((response) => {
            const { data: organizaion } = response;
            this.setState({ organizaions: [organizaion] });

            if(this.props.onSubmit){
                this.props.onSubmit({
                    deptName:organizaion.deptName,
                    deptCode:"1",
                    deptNamePath:organizaion.deptName,
                })
            }
        })
    }
    
    //查询部门组织结构
    queryOrganizaiton = (deptCode) => {

        return get("/rest/usg/datacenter/v1/member/dept/"+deptCode, this.state.headers).then(
                (res) => {
                    if(!res.success) {
                        message.error(res.msg);
                        return Promise.reject();
                    }

                    let resbody = JSON.parse(res.data.entity);

                    if(resbody.returnCode !== "000000000"){
                        message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                        return Promise.reject();
                    }

                    return resbody;
                })
    }

    //异步加载，点击时加载
    handleLoadData = treeNode => {
        const { children, dataRef: node } = treeNode.props;
        if (children) {
          return Promise.resolve();
        }

        let preLoadedKeys = this.state.loadedKeys;
        preLoadedKeys.push(node.deptCode)
        //console.log("loadedKeys:"+this.state.loadedKeys);

        return this.queryOrganizaiton(node.deptCode).then((response) => {
      
            const { data: organizaion } = response;
            const { childDepts } = organizaion;
            node.childDepts = childDepts;
            this.setState(preState => {
              const { organizaions: preOrganizaions } = preState;
              return { organizaions: [...preOrganizaions] };
            });
            return Promise.resolve();
        });
    };

    //处理选择节点，并传递到父组件
    handleSelect = (selectedKeys, info) => {
        if(info.selectedNodes[0] !== undefined){
           //console.log('selected', selectedKeys, info);
            let deptCode = selectedKeys[0];
                
            let deptName = info.selectedNodes[0].props.title;

            let deptNamePath = info.selectedNodes[0].props.dataRef.deptNamePath;

            let note = info.selectedNodes[0].props.dataRef.note;

            this.setState({
                disabled: false,
                selectedDeptCode: deptCode,
                selectedDeptName: deptName,
                parentDeptCode: info.selectedNodes[0].props.dataRef.parentDeptCode,
                note,
            })

            if(this.props.onSubmit){
                this.props.onSubmit({deptCode,deptName,deptNamePath})
            }

        }else{
            this.setState({
                disabled: true,
            })
        }
    };

    //构建树
    renderNode = nodes => {
        if (!nodes || !nodes.length) {
            return null;
        }

        return nodes.map(node => {
            const { deptCode: key, childDepts: children, isLeafNode: isLeaf } = node;
            return (
                <TreeNode key={key} isLeaf={isLeaf} dataRef={node} title={node.deptName}>
                    {this.renderNode(children)}
                </TreeNode>
            );
        });
    };

    //更新树
    handleQueryDepts = (deptCode,method) => {
        this.queryOrganizaiton(deptCode).then((response) => {
            let loadedKeys = this.state.loadedKeys;
            let index = loadedKeys.indexOf(deptCode);
            let reloadKeys = loadedKeys.slice(0,index+1);

            const { data: organizaion } = response;
            let queryDeptCode;
            if(method === "del"){
                queryDeptCode = this.state.parentDeptCode;
            }else{
                queryDeptCode = this.state.selectedDeptCode;
            }
            const getNamesByType = (target) => {
                for(var i=0; i<target.length; i++){
                    if(target[i].deptCode === queryDeptCode){
                        target[i] = organizaion;
                        break;
                    }
                    target[i].childDepts && getNamesByType(target[i].childDepts);
                }
            };

            getNamesByType(this.state.organizaions);

            this.setState({ 
                loadedKeys: reloadKeys,
            });
        })
    }

    handleAddDepts = () => {
        this.setState({
            addDeptVisible: true,
        });
    }

    hideAddDeptModal = () => {
        this.setState({
            addDeptVisible: false,
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    //添加部门
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          let body = {
            deptName: values.deptName,
            parentDeptCode: this.state.selectedDeptCode,
            note: values.note
          }

          this.addDept(body);
          form.resetFields();
          this.setState({ addDeptVisible: false });
        });
    };

    addDept = (body) =>{
        let data = JSON.stringify(body);

        post("/add/corp/dept", {data}, this.state.headers).then(
            (response) => {
                if(!response.success) {
                    message.error(response.msg);
                    return;
                }

                const resbody = JSON.parse(response.data.entity);
                const errorCode = resbody.returnCode;
                //console.log("returnCode:" + errorCode);

                if(errorCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                this.handleQueryDepts(this.state.selectedDeptCode);
                message.success("添加成功！")
        })
    }

    hideRenameDeptModal = () => {
        this.setState({
            renameDeptVisible: false,
        });
    };

    handleRenameDepts = ()  => {
        this.setState({
            renameDeptVisible: true,
        });
    }

    saveRenameFormRef = renameformRef => {
        this.renameformRef = renameformRef;
    };

    //重命名部门
    handleRename = () => {
        const form = this.renameformRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
    
          console.log('Received values of form: ', values);
          let body = {
            deptName: values.deptName,
            note: values.note,
            parentDeptCode: this.state.parentDeptCode
          }

          this.renameDept(body);
          form.resetFields();
          this.setState({ renameDeptVisible: false });
        });
    };

    renameDept = (body) => {
        let data = JSON.stringify(body);

        put("/rest/usg/datacenter/v1/corp/dept/"+this.state.selectedDeptCode, {data}, this.state.headers).then(
            (response) => {
                if(!response.success) {
                    message.error(response.msg);
                    return;
                }

                const resbody = JSON.parse(response.data.entity);
                const errorCode = resbody.returnCode;
                //console.log("returnCode:" + errorCode);

                if(errorCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                this.handleQueryDepts(this.state.selectedDeptCode);
                message.success("修改成功！")
                this.setState({
                    selectedDeptName: body.deptName,
                    note: body.note,
                })
        })
    }

    //删除部门
    handleDeleteDepts = () =>{
        let deletDeptCode = this.state.selectedDeptCode;
        let parentDeptCode = this.state.parentDeptCode;
        let queryDepts = (parentDeptCode1) => this.handleQueryDepts(parentDeptCode1,"del");
        let setDisable = () => this.setState({disabled: true});
        const headers = this.state.headers;
        confirm({
            title: '确定删除已选部门？',
            content: '此部门及子部门将会一并删除，删除后，数据将无法恢复',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {

                if(deletDeptCode === "1"){
                    message.error("根部门不能被删除！");
                    return;
                }

                del("/rest/usg/datacenter/v1/corp/dept/"+deletDeptCode, headers).then(
                    (response) => {
                        //console.log(response);
                        if(!response.success) {
                            message.error(response.msg);
                            return;
                        }
        
                        const resbody = JSON.parse(response.data.entity);
                        const errorCode = resbody.returnCode;
                        //console.log("returnCode:" + errorCode);
                        
                        // if(errorCode === "201030005"){
                        //    message.error("部门下存在用户或硬件终端，不能删除("+errorCode+")");
                        //     return;
                        // }
        
                        if(errorCode !== "000000000"){
                            message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                            return;
                        }

                        queryDepts(parentDeptCode);

                        message.success("删除成功！")
                        
                        setDisable();
                }) 
            },
            onCancel() {},
        });
    }

    //刷新部门
    handleRefreshDepts = () =>{
        this.handleQueryDepts(this.state.selectedDeptCode);
        message.success("刷新成功！")
    }

    render(){
        return(
            <div>
                <div>部门管理</div>
                <br/>
                <Tooltip placement="bottomLeft" title="刷新部门">
                    <Button  icon="sync" size="small" disabled={this.state.disabled} onClick={this.handleRefreshDepts}/> &nbsp;
                </Tooltip>

                <Tooltip placement="bottomLeft" title="添加部门">
                    <Button  icon="plus" size="small" disabled={this.state.disabled} onClick={this.handleAddDepts}/> &nbsp;
                </Tooltip>
                <CollectionCreateForm wrappedComponentRef={this.saveFormRef} visible={this.state.addDeptVisible} 
                    onCancel={this.hideAddDeptModal}
                    onCreate={this.handleCreate}
                    parentDept={this.state.selectedDeptName}/>

                <Tooltip placement="bottomLeft" title="编辑部门">
                    <Button  icon="form" size="small" disabled={this.state.disabled} onClick={this.handleRenameDepts}/> &nbsp;
                </Tooltip>
                <RenameDeptForm wrappedComponentRef={this.saveRenameFormRef} visible={this.state.renameDeptVisible} 
                    onCancel={this.hideRenameDeptModal}
                    onCreate={this.handleRename}
                    selectedDept={this.state.selectedDeptName}
                    note={this.state.note}/>

                <Tooltip placement="bottomLeft" title="删除部门">
                    <Button  type="danger" icon="delete" size="small" disabled={this.state.disabled} onClick={this.handleDeleteDepts}/> &nbsp;
                </Tooltip>

                <Tree autoExpandParent={false} loadedKeys={this.state.loadedKeys} loadData={this.handleLoadData} onSelect={this.handleSelect} showLine>
                    {this.renderNode(this.state.organizaions)}
                </Tree>
            </div> 
        )
    }
}