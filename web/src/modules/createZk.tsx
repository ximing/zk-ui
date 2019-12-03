import { Form, Input, Modal } from 'antd';
import React from 'react';
import { FormComponentProps } from 'antd/lib/form';

interface Props {
    visible: boolean;
    onCancel: (e: React.MouseEvent<HTMLElement>) => void;
    onCreate: (e: React.MouseEvent<HTMLElement>) => void;
}

const CreateZk: React.FC<Props & FormComponentProps> = props => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
        <Modal title="新增ZK" visible={visible} onOk={onCreate} onCancel={onCancel}>
            <Form layout="vertical">
                <Form.Item label="名字">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '文件夹必填' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="链接地址">
                    {getFieldDecorator('url', {
                        rules: [{ required: true, message: '资源唯一标志必填' }],
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    );
};

const CollectionCreateForm = Form.create<Props & FormComponentProps>({
    name: 'create_zk_form_in_modal',
})(CreateZk);

export default CollectionCreateForm;
