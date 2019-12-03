import React, { useCallback, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../stores';
import { List, Button } from 'antd';
import { ZKIns } from '../types/store';
import CreateZk from './createZk';

const Main: React.FC = observer(() => {
    const store = useStore();
    const formRef = useRef<any>(null);
    const [visible, setVisible] = useState(false);
    const onCancel = useCallback(() => {
        setVisible(false);
    }, []);
    const onCreate = useCallback(() => {
        formRef.current.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }
            store.zk.create(values.name, values.url);
            onCancel();
        });
    }, [onCancel, store.zk]);
    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                新建zk链接
            </Button>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                loadMore={false}
                dataSource={store.zk.list}
                renderItem={(item: ZKIns) => (
                    <List.Item
                        actions={[
                            <a key="list-loadmore-edit">edit</a>,
                            <a key="list-loadmore-more">delete</a>,
                            <a key="list-loadmore-detail">detail</a>,
                        ]}
                    >
                        <div className="list-item">{item.name}</div>
                    </List.Item>
                )}
            />
            {visible && (
                <CreateZk ref={formRef} onCancel={onCancel} onCreate={onCreate} visible={visible} />
            )}
        </div>
    );
});

export default Main;
