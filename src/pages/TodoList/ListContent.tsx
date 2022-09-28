import { Button, Checkbox, List, Row, Input } from 'antd';
import React, { useMemo, useState } from 'react';

export type ListContentProps = {
  list: Record<string, any>[];
  filterTodoList: Record<string, any>[];
  setTodoList: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
};

const ListContent: React.FC<ListContentProps> = (props) => {
  const { list, setTodoList, filterTodoList } = props;
  const [editingItem, setEditingItem] = useState<any>();

  // 完成
  const handleFinish = (checked: boolean, id: string) => {
    if (checked) {
      const newList = list?.map((item) => {
        if (item.id === id) {
          return { ...item, isDone: true };
        }
        return item;
      });

      setTodoList(newList);
    }
  };

  // 删除
  const handleRemove = (id: string) => {
    const newList = list?.filter((item) => item.id !== id);
    setTodoList(newList);
  };

  // 更新文本
  const handleUpdate = (value: string, id: string) => {
      const newList = list?.map((item) => {
        if (item.id === id) {
          return { ...item, text: value };
        }
        return item;
      });
      setTodoList(newList);

      setEditingItem(undefined);
  };

  // 只渲染没完成的
  const notFinishedList = useMemo(
    () => filterTodoList.filter((item) => !item.isDone),
    [filterTodoList],
  );

  return (
    <>
      <h1>待办事项</h1>
      <List
        style={{ marginTop: 50 }}
        dataSource={notFinishedList}
        renderItem={(item) => {
          return (
            <Row key={item.id}>
              <Checkbox
                onChange={(e) => handleFinish(e.target.checked, item.id)}
              />
              {editingItem?.id === item.id ? (
                <Input.Search
                  defaultValue={item.text}
                  onSearch={(value) => handleUpdate(value, item.id)}
                />
              ) : (
                item.text
              )}
              <Button type="primary" onClick={() => setEditingItem(item)}>
                编辑
              </Button>
              <Button danger onClick={() => handleRemove(item.id)}>
                删除
              </Button>
            </Row>
          );
        }}
      />
    </>
  );
};

export default ListContent;
