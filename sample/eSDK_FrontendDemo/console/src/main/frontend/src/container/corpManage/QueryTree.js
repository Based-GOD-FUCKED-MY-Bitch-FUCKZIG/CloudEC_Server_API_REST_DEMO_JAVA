/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react';
import { get } from '@/utils/request';
import { message,Tree   } from 'antd';
import i18n from '@/locales'

const { TreeNode } = Tree;
export default class QueryTree extends React.Component{
    constructor(){
        super();
        this.state={
            organizaions:[],
        }
        
        this.queryDept(1)
        
    }

     //查询部门以一级子部门列表
     queryDept=(deptCode)=>{
        let headers = {'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
        };

        get("/rest/usg/datacenter/v1/member/dept/"+ deptCode, headers).then(
            (res) => {

                if(!this.failTip(res)){
                    return;
                }
                const deptTreeJson = JSON.parse(res.data.entity).data
                
                this.setState({
                    organizaions: [deptTreeJson]
                });
                    
                
            })

    }
    queryOrganizaiton = (node) => {
        let headers = {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': sessionStorage.getItem('access_token')
                    };

        get("/rest/usg/datacenter/v1/member/dept/"+node.deptCode, headers).then(
            (res) => {
                if(!res.success) {
                    message.error(res.msg);
                    return;
                }

                let resbody = JSON.parse(res.data.entity);
                console.info("查询部门及其一级子部门列表返回结果:",JSON.stringify(resbody));

                if(resbody.returnCode !== "000000000"){
                    message.error(resbody.returnCode +" : "+ i18n.t(resbody.returnCode));
                    return;
                }

                const { data: organizaion } = resbody;
                const { childDepts } = organizaion;
                node.childDepts = childDepts;
                this.setState(preState => {
                    const { organizaions: preOrganizaions } = preState;
                    return { organizaions: [...preOrganizaions] };
                });

                return Promise.resolve();
        })
    }
    handleLoadData = treeNode => {
        const { children, dataRef: node } = treeNode.props;
        if (children) {
          return Promise.resolve();
        }
    
        this.queryOrganizaiton(node);

        return Promise.resolve()
    };

    handleSelect = (selectedKeys,info) => {
        if(info.selectedNodes[0] !== undefined){
            let deptCode = selectedKeys[0];

            if(this.props.onSubmit){
                this.props.onSubmit({deptCode})
            }
        }
        if(this.props.onSelect){
            this.props.onSelect(info.selected)
        }
        this.setState({
            deptCode:selectedKeys[0]
        })    
    };

    renderNode = nodes => {
        if (!nodes || !nodes.length) {
          return null;
        }
    
        return nodes.map(node => {
          const { deptCode: key, childDepts: children, isLeafNode: isLeaf } = node;
          return (
            <TreeNode
              key={key}
              isLeaf={isLeaf}
              dataRef={node}
              title={node.deptName}
            >
              {this.renderNode(children)}
            </TreeNode>
            );
        });
    };
     //结果返回错误提示
     failTip=(res)=>{
        if(!res.success) {
            message.info(res.msg);
            return false;
        }

        let resbody = JSON.parse(res.data.entity);
        console.info("返回响应结果:",JSON.stringify(resbody));
        
        if(resbody.returnCode !== "000000000"){
            message.error(resbody.returnCode+":"+ i18n.t(resbody.returnCode))
            return false;
        }
        return true;
    }
    render(){
        return(
            <div style={{width:'100%',height:'100%',background:'white',overflowX:'auto'}}>
                部门
                <Tree
                        loadData={this.handleLoadData}
                        onSelect={this.handleSelect}
                        showLine
                    >
                    {this.renderNode(this.state.organizaions)}
                </Tree>   
            </div>          
        )
    }
}

