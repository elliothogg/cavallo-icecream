import React, {Component} from 'react';
import {Card,Button,Icon,Table} from 'antd'
import LinkButton from "../../components/link-button";
// import {LinkButton} from '../../components/link-button'

    /*
    分类管理
     */
const columns = [
    {
        title: '分类名称',
        dataIndex: 'name',
    },
    {
        title: '操作',
        width:200,
        render:() =><LinkButton>修改分类</LinkButton>
    }
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
    {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    },
];

class Category extends Component {
    render() {
        //Card右上角的结构
        const extra=(
            <Button type="primary">
                <Icon type="plus"/>
                添加
            </Button>
        )
        return (
                <Card extra={extra}>
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={data}
                        pagination={{defaultPageSize:4,showQuickJumper:true}}

                    />
                </Card>
        );
    }
}

export default Category;