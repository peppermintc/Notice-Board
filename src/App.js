import React, { useState } from 'react';

function App() {
  const [notice, setNotice] = useState('');
  const [noticeList, setNoticeList] = useState([]);
  
  const onChangeNoticeInput = (e) => {
    setNotice(e.target.value);
  };
  const createNotice = () => {
    setNoticeList([...noticeList, notice]);
  };
  const deleteNotice = (index) => {
    setNoticeList([...noticeList].filter(notice => [...noticeList].indexOf(notice) !== index));
  };
  const updateNotice = (index) => {
    let newList = [...noticeList];
    newList[index] = "Changed"     
    setNoticeList(newList);
  };

  return (
    <div>
      <div>Notice List Length - {noticeList.length}</div>
      {noticeList.map((notice, index) => { return <div key={index}>{notice}<button onClick={() => updateNotice(index)}>Edit</button><button onClick={() => deleteNotice(index)}>Delete</button></div> })}
      <div>Shows Notice - {notice}</div>
      <input type="text" onChange={onChangeNoticeInput} />
      <button onClick={createNotice}>Save Notice</button>
    </div>
  );
}

export default App;
