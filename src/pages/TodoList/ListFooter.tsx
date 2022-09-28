import { Button, List, Row } from 'antd';
import React from 'react';

export type ListFooterProps = {
  finishedList: Record<string, any>[];
  clearAllFinishTasks: () => void;
};

const ListFooter: React.FC<ListFooterProps> = (props) => {
  const { finishedList, clearAllFinishTasks } = props;

  return (
    <>
      <h1>已完成事项</h1>
      <List
        style={{ marginTop: 50 }}
        dataSource={finishedList}
        renderItem={(item, index) => {
          return (
            <Row key={item.id}>
              {index + 1}：{item.text}
            </Row>
          );
        }}
      />
      <Button onClick={clearAllFinishTasks}>清空已完成</Button>
    </>
  );
};

export default ListFooter;
