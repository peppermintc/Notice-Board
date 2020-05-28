import React, { useState } from 'react';

let dummy = ['This is example Notice 1', 'This is example Notice 2'];

function App() {

  // DOM
  const noticeEditTextInputBox = document.getElementById("noticeEditTextInputBox");
  const createTool = document.getElementById("createTool");
  const editTool = document.getElementById("editTool");
  
  // Hook
  const [notice, setNotice] = useState('');
  const [noticeList, setNoticeList] = useState(dummy);
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState();
  const [editMode, setEditMode] = useState(false);
  
  const onChangeNoticeInput = (e) => {
    setNotice(e.target.value);
  };
  const onChangeNoticeEditInput = (e) => {
    setNotice(e.target.value);
  };
  const createNotice = () => {
    setNoticeList([...noticeList, notice]);
  };
  const deleteNotice = (indexToDelete) => {
    setNoticeList([...noticeList].filter((notice, index) => index !== indexToDelete));
  };
  const toggleEditTextBox = (index) => {
    const functionButtons = Array.prototype.slice.call(document.getElementsByName("functionButtons"));

    // Toggle Mode
    if (editMode === true) {
      setEditMode(false);
      createTool.style.display = 'block';
      editTool.style.display = 'none';
      functionButtons.map((buttons) => buttons.style.display = 'block');
    }
    else {
      setEditMode(true);
      createTool.style.display = 'none';
      editTool.style.display = 'block';
      console.log(functionButtons);
      functionButtons.map((buttons) => buttons.style.display = 'none');
    }

    setSelectedNoticeIndex(index);
  };
  const updateNotice = () => {
    let newList = [...noticeList];
    newList[selectedNoticeIndex] = noticeEditTextInputBox.value;     
    setNoticeList(newList);
    toggleEditTextBox();
  };

  // HTML
  const noticeHTML = (notice, index) => {
    return (
      <div key={index}>
        Index: {index}<br/>
        Notice: {notice}
        <div name="functionButtons" style={{ display: 'block' }}>
          <button onClick={() => toggleEditTextBox(index)}>Edit</button>
          <button onClick={() => deleteNotice(index)}>Delete</button>
        </div>
      </div> 
    );
  };

  // JSX
  return (
    <div>
      <div>Notice List Length - {noticeList.length}</div>
      {noticeList.map((notice, index) => { return noticeHTML(notice, index); })}
      <div>Shows Current Writting Notice: {notice}</div>
      
      <div style={{display: 'block'}} id="createTool">
        <div>Create Notice</div>
        <input type="text" onChange={onChangeNoticeInput} />
        <button onClick={createNotice}>Save Notice</button>
      </div>
      
      <div style={{display: 'none'}} id="editTool">
        <div>Edit Notice index: {selectedNoticeIndex}</div>
        <input type="text" id="noticeEditTextInputBox" onChange={onChangeNoticeEditInput} />
        <button onClick={updateNotice}>Save Notice</button>
      </div>
    </div>
  );
}

export default App;
