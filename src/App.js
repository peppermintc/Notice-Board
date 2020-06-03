import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import logo from './img/logo.png';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

let dummy = [{title:'This is example Notice 2',content:"this is example content"}, {title:'This is example Notice 2',content:"this is example content"} ];

function App() {

  // DOM
  const noticeEditTextInputBox = document.getElementById("noticeEditTextInputBox");
  const createTool = document.getElementById("createTool");
  const editTool = document.getElementById("editTool");
  
  
  
  // Hook
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [notice, setNotice] = useState({});
  const [noticeList, setNoticeList] = useState(dummy);
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState();
  const [editMode, setEditMode] = useState(false);
  
  const onChangeNoticeTitleInput = (e) => {
    setNoticeTitle(e.target.value);
  };
  const onChangeNoticeContentInput = (e) => {
    setNoticeContent(e.target.value);
  };
  const onChangeNoticeEditInput = (e) => {
    setNotice(e.target.value);
  };

  
  useEffect(() => {if(!(!notice.title && !notice.content)) setNoticeList([...noticeList, notice])}, [notice])
  const createNotice = () => {
    setNotice({title: noticeTitle, content: noticeContent});
    toggleDialog();

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
    newList[selectedNoticeIndex].title = noticeTitle;     
    newList[selectedNoticeIndex].content = noticeContent;     
    setNoticeList(newList);
    toggleEditDialog();
  };

  // HTML
  const noticeHTML = (notice, index) => {
    return (
      <ExpansionPanel key={index} style={{width:'60%', backgroundColor: '#1a232e', border: '5px dashed white', margin: '20px'}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{ color: '#FF9500', fontWeight: 'bold', fontSize: '18px' }} >
          <div key={index}>
            Index: {index}<br/>
            Notice: {notice.title}
            <div name="functionButtons" style={{ display: 'block' }}>
              <button onClick={() => toggleEditDialog(index)}>Edit</button>
              <button onClick={() => deleteNotice(index)}>Delete</button>
            </div>
          </div> 
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ color: 'white' }}>
          {notice.content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  // CREATE
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => {
    setOpenDialog(!openDialog);
    setNoticeTitle('');
    setNoticeContent('');
  };
  // EDIT
  const [openEditDialog, setOpenEditDialog] = useState(false);
  useEffect(() => {
    if(openEditDialog) {
      setNoticeTitle(noticeList[selectedNoticeIndex].title);
      setNoticeContent(noticeList[selectedNoticeIndex].content);
    } else {
      setNoticeTitle('');
      setNoticeContent('');
    }
  }, [openEditDialog]);
  const toggleEditDialog = (index) => {
    setSelectedNoticeIndex(index);
    setOpenEditDialog(!openEditDialog);
  };

  // JSX
  return (
    <div style={{height: '100%'}}>
      {/* Sidebar */}
      <List style={{ float: 'left', height: '100%', backgroundColor: '#1a232e', color: 'white', width: '15%', padding: '0 0 0 0'}}>
        <div>
          <a href="/"><img src={logo} alt="logo" style={{ width: '250px', margin: '20px 10px 10px 10px' }}/></a>
        </div>
        <ListItem button>Hellow</ListItem>
        <ListItem button>Hellow</ListItem>
        <ListItem button>Hellow</ListItem>        
      </List>

      <div style={{ color:'white', float: 'left', width: '85%', height: '100%', backgroundColor: '#1a232e' }}>
        <div style={{ height:'96px', width: '100%', backgroundColor: '#1a232e' }} />
        <div style={{ fontWeight: 'bold', marginLeft: '20px', fontSize: '20px', display: 'inline-block'}}>Total Notice : {noticeList.length}</div>
        <Button onClick={toggleDialog} style={{ marginLeft: '45%', backgroundColor: '#FF9500', color: '#1a232e', fontWeight: 'bold', paddingLeft: '15px', paddingRight: '15px' }}>Create</Button>

        {/* CREATE DIALOG */}
        <Dialog onClose={toggleDialog} open={openDialog} >
          <DialogTitle id="customized-dialog-title" onClose={toggleDialog} style={{ width: '45vw', maxWidth: '90%' }}>
            <TextField label="Title" onChange={onChangeNoticeTitleInput} placeholder={"Enter Title"} style={{width:'100%'}}/>
          </DialogTitle>
          <DialogContent dividers>
            <TextField multiline label="Content" rows="9" onChange={onChangeNoticeContentInput} variant="outlined" style={{width:'100%',height:'28vh'}}/>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>createNotice()} color="primary" variant="contained">
              Save
            </Button>
            <Button onClick={toggleDialog} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* EDIT DIALOG */}
        <Dialog onClose={toggleEditDialog} open={openEditDialog} >
          <DialogTitle id="customized-dialog-title" onClose={toggleEditDialog} style={{ width: '45vw', maxWidth: '90%' }}>
            <TextField label="Title" value={noticeTitle} onChange={onChangeNoticeTitleInput} style={{width:'100%'}}/>
          </DialogTitle>
          <DialogContent dividers>
            <TextField multiline label="Content" value={noticeContent} rows="9" onChange={onChangeNoticeContentInput} variant="outlined" style={{width:'100%',height:'28vh'}}/>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>updateNotice()} color="primary" variant="contained">
              Save
            </Button>
            <Button onClick={toggleEditDialog} color="primary" variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {noticeList.map((notice, index) => { return noticeHTML(notice, index); })}

        {/* <div>Shows Current Writting Notice: {notice}</div>
        
        <div style={{display: 'block'}} id="createTool">
          <div>Create Notice</div>
          <input type="text" onChange={onChangeNoticeInput} />
          <button onClick={createNotice}>Save Notice</button>
        </div> */}
        
        <div style={{display: 'none'}} id="editTool">
          <div>Edit Notice index: {selectedNoticeIndex}</div>
          <input type="text" id="noticeEditTextInputBox" onChange={onChangeNoticeEditInput} />
          <button onClick={updateNotice}>Save Notice</button>
        </div>
      </div>
    </div>
  );
}

export default App;
