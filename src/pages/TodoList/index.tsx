import { lowerCase } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import ListContent from './ListContent';
import ListFooter from './ListFooter';
import OperationHeader from './OperationHeader';

const TodoList = () => {
  const [todoList, setTodoList] = useState<Record<string, any>[]>(
    JSON.parse(localStorage.getItem('todoList') || '[]'),
  );
  const [searchText, setSearchText] = useState('');

  const finishedList = useMemo(
    () => todoList.filter((item) => item.isDone),
    [todoList],
  );

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  // 添加
  const handleAdd = (params: any) => {
    setTodoList((prev) => [...prev, params]);
  };

  // 清空已完成任务
  const clearAllFinishTasks = () => {
    setTodoList((prev) => prev.filter((item) => !item.isDone));
  };

  // 筛选后的数据
  const filterTodoList = useMemo(() => {
    if (!searchText) {
      return todoList;
    }

    return todoList?.filter((item) =>
      lowerCase(item.text).includes(lowerCase(searchText)),
    );
  }, [todoList, searchText]);

  return (
    <>
      <OperationHeader handleAdd={handleAdd} setSearchText={setSearchText} />
      <ListContent
        list={todoList}
        filterTodoList={filterTodoList}
        setTodoList={setTodoList}
      />
      <ListFooter
        finishedList={finishedList}
        clearAllFinishTasks={clearAllFinishTasks}
      />
    </>
  );
};

export default TodoList;
