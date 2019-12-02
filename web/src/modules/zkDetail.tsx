import React, { FC, useEffect, useRef, useState } from 'react';
import { connect as socketClient } from 'socket.io-client';
import G6 from '@antv/g6';

export const ZKDetail: FC<{ url: string }> = props => {
    const container = useRef<HTMLDivElement>(null);
    const [data, setData] = useState({});
    useEffect(() => {
        const socket = socketClient('http://localhost:8081', {
            path: '/zk/wss',
            transports: ['websocket'],
        });
        socket.on('connect', () => {
            socket.emit('zk-connect', {
                url: props.url,
            });
        });
        socket.on('getChildren', (msg: { name: string; path: string; data: any }) => {
            console.log(msg);
            setData({
                id: msg.path,
                children: msg.data.map((item: string) => ({ id: item })),
            });
        });
        socket.on('zk-connect', () => {
            socket.emit('command', {
                name: 'getChildren',
                path: '/',
            });
        });
        return () => {
            socket.close();
        };
    }, [props.url]);
    useEffect(() => {
        const width = container.current!.scrollWidth;
        const height = container.current!.scrollHeight || 500;
        const graph = new G6.TreeGraph({
            container: container.current!,
            width,
            height,
            pixelRatio: 2,
            modes: {
                default: [
                    {
                        type: 'collapse-expand',
                        onChange(item: any, collapsed: any) {
                            const data = item.get('model').data;
                            data.collapsed = collapsed;
                            return true;
                        },
                    },
                    'drag-canvas',
                    'zoom-canvas',
                ],
            },
            defaultNode: {
                size: 26,
                anchorPoints: [
                    [0, 0.5],
                    [1, 0.5],
                ],
                style: {
                    fill: '#C6E5FF',
                    stroke: '#5B8FF9',
                },
            },
            defaultEdge: {
                shape: 'cubic-horizontal',
                style: {
                    stroke: '#A3B1BF',
                },
            },
            layout: {
                type: 'compactBox',
                direction: 'LR',
                getId: function getId(d: any) {
                    return d.id;
                },
                getHeight: function getHeight() {
                    return 16;
                },
                getWidth: function getWidth() {
                    return 16;
                },
                getVGap: function getVGap() {
                    return 10;
                },
                getHGap: function getHGap() {
                    return 100;
                },
            },
        });
        graph.node(function(node: any) {
            return {
                label: node.id,
                labelCfg: {
                    offset: 10,
                    position: node.children && node.children.length > 0 ? 'left' : 'right',
                },
            };
        });
        graph.data(data);
        graph.render();
        graph.fitView();
    });
    return (
        <div>
            <div ref={container}></div>
        </div>
    );
};
