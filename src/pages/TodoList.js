import React, {useState} from 'react';
import TodoAdd from '../pages/TodoAdd';
import PageHeader from '../components/PageHeader';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';import useTable from '../components/useTable';
import * as todoService from '../services/todoService'
import Controls from "../components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import Popup from "../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';

   const useStyles = makeStyles(theme => ({
       pageContent: {
           margin: theme.spacing(5),
           padding: theme.spacing(3),
           overflow: 'hidden'

       },
       searchInput: {
        width: '75%'
    },
    newButton: {
      position:"absolute",
      right: "50px",
    }
   }))
   
   const headCells = [
     {id: 'title', label: 'Item title'},
     {id: 'description', label: 'Item description'},
     {id: 'todoDate', label: 'Date', disableSorting:true }, // make disable sorting if no need
     {id: 'sortingId', label: 'Task', disableSorting:true }, // make disable sorting if no need
     {id: 'editing', label: 'Edit', disableSorting:true }, // make disable sorting if no need
   ]

export default function TodoList() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(todoService.getAllTodoLists())
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting
    } =  useTable(records, headCells, filterFn); 
 // define handle search/filter function events
    const handleSearch = e => {
      let target = e.target;
      setFilterFn({
          fn: items => {
              if (target.value == "")
                  return items;
              else
                  return items.filter(x => x.title.toLowerCase().includes(target.value)) // search todoItem write lowercase
          }
      })  
  }

    const addOrEdit = (todoList, resetForm) => {
        if (todoList.id == 0)
            todoService.insertTodoList(todoList) 
        else
           todoService.updateTodoList(todoList)
       resetForm()
       setRecordForEdit(null)
       setOpenPopup(false)
       setRecords(todoService.getAllTodoLists())  
       setNotify ({
         isOpen: true,
         message: 'Added Successfully',
         type: 'success'
       }) 
    }

    const openInPopup = item => {
          setRecordForEdit(item)
          setOpenPopup(true)
  }

     const onDelete = id => {
       setConfirmDialog ({
         ...confirmDialog,
         isOpen: false
       })
       todoService.deleteTodoList(id);
       setRecords(todoService.getAllTodoLists())
       setNotify ({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
      }) 
    }

  return (
    <>
     <PageHeader
          title="Todo Item"
          subTitle="Manage your daily tasks"
          icon={<PlaylistAddCheckIcon fontSize="large" />}
        />
        <Paper className={classes.pageContent}>
               
                  <Toolbar>
                    <Controls.Input
                        label="Search with lowercase later"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button 
                     text = "Add New"
                     variant="outlined"
                     startIcon ={<AddIcon/>}
                     className={classes.newButton}
                     onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
             <TblContainer>
               <TblHead/>
                   <TableBody>
                           {
                              recordsAfterPagingAndSorting().map(item =>
                                  (<TableRow key={item.id}>
                                       <TableCell> {item.title} </TableCell>
                                       <TableCell> {item.description} </TableCell>
                                       <TableCell> {item.todoDate} </TableCell>
                                       <TableCell> {item.task} </TableCell>
                                       <TableCell>
                                       <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                              setConfirmDialog ({
                                                isOpen: true,
                                                title: 'Are you sure delete this item?',
                                                subTitle:"You cant undo this operation!",
                                                onConfirm: () => { onDelete(item.id) }
                                              })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                       </TableCell>
                                  </TableRow>)
                                )
                           }        
                   </TableBody>
             </TblContainer>
             <TblPagination />
        </Paper>
         <Popup
           title= "Add New Todo Items"
           openPopup = {openPopup}
           setOpenPopup = {setOpenPopup}
         >
               <TodoAdd
                   recordForEdit={recordForEdit}
                   addOrEdit={addOrEdit}/> 
         </Popup>
         <Notification
               notify={notify}
              setNotify={setNotify}
         />
         <ConfirmDialog
             confirmDialog={confirmDialog}
             setConfirmDialog={setConfirmDialog}
             />
    </>
  );
}
