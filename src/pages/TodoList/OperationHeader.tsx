import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';

export type OperationHeaderProps = {
  handleAdd: (val: any) => void;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const OperationHeader: React.FC<OperationHeaderProps> = (props) => {
  const { handleAdd, setSearchText } = props;
  const [inputText, setInputText] = useState('');

  return (
    <>
      <Row>
        <Input
          placeholder="添加"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          type="primary"
          disabled={!inputText}
          onClick={() => {
            handleAdd({
              id: Math.random().toString(36).slice(2),
              text: inputText,
              isDone: false,
            });
            setInputText('');
          }}
        >
          添加
        </Button>
      </Row>
      <Row>
        <Input
          placeholder="搜索"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Row>
    </>
  );
};

export default OperationHeader;
