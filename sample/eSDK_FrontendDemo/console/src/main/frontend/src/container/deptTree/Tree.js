/**
 * Copyright 2019 Huawei Technologies Co., Ltd. All rights reserved.
 */
import React from 'react'
import { message, Tree} from 'antd'
import { get } from '@/utils/request'
import i18n from '@/locales'

const { TreeNode } = Tree;

export default class QueryDeptTree extends React.Component{
    constructor(props){
        super(props);
        this.state = {   
            organizaions: [],
            selectedKey: [this.props.deptCode],
            headers: {'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': sessionStorage.getItem('access_token')
                    },
        }
    }

    //初始化加载树
    componentDidMount() {
        this.queryOrganizaiton(1).then((response) => {
            const { data: organizaion } = response;
            this.setState({ organizaions: [organizaion] });
        })
    }
    
    //查询部门组织结构
    queryOrganizaiton = (deptCode) => {

        return get("/rest/usg/datacenter/v1/member/dept/"+deptCode, this.state.headers).then(
                (res) => {
                    if(!res.success) {
                        message.info(res.msg);
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

    //异步加载
    handleLoadData = treeNode => {
        const { children, dataRef: node } = treeNode.props;
        if (children) {
          return Promise.resolve();
        }

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

    //处理选择，并传递至父组件
    handleSelect = (selectedKeys, info) => {
        if(info.selectedNodes[0] !== undefined){
            //console.log('selected', selectedKeys, info);
            let deptCode = selectedKeys[0];
                
            let deptNamePath = info.selectedNodes[0].props.dataRef.deptNamePath;

            this.setState({
                selectedKey: [deptCode],
            })

            if(this.props.onSubmit){
                this.props.onSubmit({deptCode,deptNamePath})
            }
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

    render(){
        return(
            <Tree selectedKeys={this.state.selectedKey} defaultExpandedKeys={["1"]} loadData={this.handleLoadData} onSelect={this.handleSelect} showLine>
                {this.renderNode(this.state.organizaions)}
            </Tree>     
        )
    }
}