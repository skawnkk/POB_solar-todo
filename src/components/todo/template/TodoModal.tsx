import React from 'react';
import { Modal } from 'antd';

const TodoModal = ({todo, removeTodo, isModalVisible, setIsModalVisible}) => {

  const handleOk = () => {
    setIsModalVisible(false);
    removeTodo(todo.id)
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (

      <Modal title="⛔ Delete Confirm" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>정말로 삭제하시겠습니까 ?</p>
        <p>삭제할 항목 :  "{todo.text}"</p>
      </Modal>

  );
};

export default TodoModal