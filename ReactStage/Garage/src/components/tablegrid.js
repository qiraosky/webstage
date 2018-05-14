import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import $ from 'jquery'



const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber size="small" />;
        }
        return <Input size="small" />;
    };
    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `Please Input ${title}!`,
                                            },
                                        ],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : (
                                    restProps.children
                                )}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {data: props.entitylist, editingKey: '' };
        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                width: '25%',
                editable: true,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: '15%',
                editable: true,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: '40%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <div className="editable-row-operations">
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <a
                                                href="javascript:;"
                                                onClick={() => this.save(form, record.key)}
                                            >
                                                保存  
                      </a>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel(record.key)}
                                    >
                                        <a>取消</a>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <a onClick={() => this.edit(record.key)}>编辑</a>
                                )}
                        </div>
                    );
                },
            },
        ];
    }
    isEditing = (record) => {
        return record.key === this.state.editingKey;
    };
    edit(key) {
        this.setState({ editingKey: key });
    }
    save(from, key) {
        from.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(data);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }
    cancel = () => {
        this.setState({ editingKey: '' });
    };
    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <Table
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
            />
        );
    }
}

export default class Tablegrid extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            entitylist : []
        }
        let _this = this;
            $.ajax({
                type: "GET",
                async: false,
                url: "/api/getGridList",
                data: "",
                success: function (msg) {
                    _this.state.entitylist = msg
                }
            });

    }

    render(){
        return (
            <EditableTable entitylist={this.state.entitylist} />
        )
    }
}


