import React, { useState, useEffect } from 'react';
// Image
import logo from './img/logo.png';
// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
//Material UI Icon
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';

// Dummy Data
let dummy = [
  [
    {title:'This is example Notice 1',content:"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. 1"}, 
    {title:'This is example Notice 2',content:"this is example content"} 
  ],
  [
    {title:'This is example Notice 1',content:"this is example content 1"}
  ],
  [
    {title:'This is example Notice 1',content:"this is example content 1"},
    {title:'This is example Notice 2',content:"this is example content 2"},
    {title:'This is example Notice 3',content:"this is example content 3"}
  ]
];

function App() {
  // Hook
  const [noticePage, setNoticePage] = useState(0);
  const [typingListTitle, setTypingListTitle] = useState('');
  const [noticeListTitle, setNoticeListTitle] = useState(['Work','Basketball Team','Shopping List']);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [notice, setNotice] = useState({});
  const [noticeList, setNoticeList] = useState(dummy[noticePage]);
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState();
  
  // Changing Board
  useEffect(()=>{setNoticeList(dummy[noticePage])},[noticePage,noticeListTitle]);
  useEffect(()=>{dummy[noticePage] = noticeList},[noticeList]);

  // Onchange event
  const onChangeNoticeTitleInput = (e) => {
    setNoticeTitle(e.target.value);
  };
  const onChangeNoticeContentInput = (e) => {
    setNoticeContent(e.target.value);
  };
  const onChangeListTitleInput = (e) => {
    setTypingListTitle(e.target.value);
  };
  
  // ADD LIST
  const addNewList = () => {
    let newList = [];

    if(typingListTitle == '')
      newList = [...noticeListTitle];
    else
      newList = [...noticeListTitle, typingListTitle];
    
    setNoticeListTitle(newList);

    dummy = [...dummy, []];

    setTypingListTitle('');
    setNoticePage(newList.length-1);
    toggleNewListDialog();
  };
  
  // Create
  useEffect(() => {if(!(!notice.title && !notice.content)) setNoticeList([...noticeList, notice])}, [notice])
  const createNotice = () => {
    setNotice({title: noticeTitle, content: noticeContent});
    toggleDialog();
  };
  // Delete
  const deleteNotice = (indexToDelete) => {
    setNoticeList([...noticeList].filter((notice, index) => index !== indexToDelete));
  };
  // Update
  const updateNotice = () => {
    let newList = [...noticeList];
    newList[selectedNoticeIndex].title = noticeTitle;     
    newList[selectedNoticeIndex].content = noticeContent;     
    setNoticeList(newList);
    toggleEditDialog();
  };

  // Notice HTML Piece
  const noticeHTML = (notice, index) => {
    return (
      <ExpansionPanel key={index} style={{width:'60%', backgroundColor: '#1a232e', border: '5px dashed white', margin: '20px'}}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />} style={{ color: '#FF9500', fontWeight: 'bold', fontSize: '18px' }} >
          <div key={index} style={{ width:'100%', height: '100%', paddingTop: '3px' }}>
            Index: {index+1}<br/>
            Notice: {notice.title}
          </div> 
          <div style={{ display: 'inline-block', float: 'right', verticalAlign: 'center' }}>
              <Button size="small" startIcon={<EditIcon style={{ color: 'white' }}/>} style={{ color: 'white' }} onClick={() => toggleEditDialog(index)}>Edit</Button>
              <Button size="small" startIcon={<DeleteIcon style={{ color: 'white' }}/>} style={{ color: 'white' }} onClick={() => deleteNotice(index)}>Delete</Button>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ color: 'white' }}>
          {notice.content}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  };

  // CREATE Dialog toggle
  const [openDialog, setOpenDialog] = useState(false);
  const toggleDialog = () => {
    setOpenDialog(!openDialog);
    setNoticeTitle('');
    setNoticeContent('');
  };
  // EDIT Dialog Toggle
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

  // ADD NEW LIST Dialog toggle
  const [openNewListDialog, setOpenNewListDialog] = useState(false);
  const toggleNewListDialog = () => {
    setOpenNewListDialog(!openNewListDialog);
  };

  // Remove Board
  const removeBoard = (indexToDelete) => {
    if(dummy.length !== 1) {
      if(indexToDelete-1<0)
        setNoticePage(0);
      else
        setNoticePage(indexToDelete-1);
      dummy = [...dummy].filter((notice, index) => index !== indexToDelete);
      setNoticeListTitle([...noticeListTitle].filter((notice, index) => index !== indexToDelete));
    }
    else {
      alert('At least 1 board must exist');
    }
  };

  // JSX
  return (
    <div style={{height: '100%'}}>
      {/* Sidebar */}
      <List style={{ float: 'left', height: '100%', backgroundColor: '#1a232e', color: 'white', width: '15%', padding: '0 0 0 0'}}>
        <div>
          <a href="/"><img src={logo} alt="logo" style={{ width: '250px', margin: '20px 10px 10px 10px' }}/></a>
        </div>
        
        {noticeListTitle.map((noticeList, index) => { return ( 
          <div>
            <ListItem button onClick={()=>setNoticePage(index)} style={{float:'left', display:'inline-block', width:'90%'}}>{noticeListTitle[index]}</ListItem> 
            <RemoveCircleOutline onClick={()=>removeBoard(index)} style={{color:'#FF9500', cursor:'pointer', float: 'left', display:'inline-block', marginTop:'9px'}} fontSize="small"/>
          </div>
        ); })}

        <div style={{textAlign:'center', marginTop:'60px', marginBottom:'20px'}}>
          <div onClick={toggleNewListDialog} style={{color:'#FF9500', cursor:'pointer'}}>
            <AddCircleOutline style={{marginTop:'30px'}} fontSize="large"/>
            <span style={{display:'inline-block',verticalAlign:'middle', paddingBottom:'28px',paddingLeft:'5px'}}>NEW BOARD</span>
          </div>
          
          {/* ADD LIST DIALOG */}
          <Dialog onClose={toggleNewListDialog} open={openNewListDialog} >
            <DialogTitle id="customized-dialog-title" onClose={toggleNewListDialog} >
              Enter New Board Name
            </DialogTitle>
            <DialogContent dividers>
              <TextField multiline label="Board Name" rows="1" onChange={onChangeListTitleInput} variant="outlined" style={{width:'100%'}}/>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={()=>addNewList()} color="primary" variant="contained">
                Save
              </Button>
              <Button onClick={toggleNewListDialog} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </List>

      <div style={{ color:'white', float: 'left', width: '85%', height: '100%', backgroundColor: '#1a232e' }}>
        <div style={{ height:'96px', width: '100%', backgroundColor: '#1a232e' }} />
        <div style={{ fontWeight: 'bold', marginLeft: '20px', fontSize: '20px', display: 'inline-block'}}>Total Notice : {noticeList.length}</div>
        <Button onClick={toggleDialog} style={{ marginLeft: '43%', backgroundColor: '#FF9500', color: '#1a232e', fontWeight: 'bold', paddingLeft: '15px', paddingRight: '15px' }}>Create</Button>

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

        {/* NOTICE LIST */}
        {noticeList.map((notice, index) => { return noticeHTML(notice, index); })}
      </div>
    </div>
  );
}

export default App;
