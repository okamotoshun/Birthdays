import React, { useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Accordion from '@material-ui/core/Accordion';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Modal } from '@material-ui/core';
import { iPhoneContext } from '../App';
import { useContext } from 'react';
import firebase from 'firebase';
import { db } from '../firebase';
import { makeStyles } from '@material-ui/core/styles';
import { getAge } from '../util/age';
import ModalForm from './ModalForm'
import '../style/BirthdayListItem.scss'

// modal-----------------------------------------------
function rand() {
  return Math.round(Math.random());
}
function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '90%',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '10px',
  },
}));
// ---------------------------------------------------

const BirthdayListItem = ({ birth, number }) => {
  // eslint-disable-next-line eqeqeq
  const monthdata = birth.filter((x) => x.month == number);
  const iPhone = useContext(iPhoneContext);
  const { currentUser } = firebase.auth();
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ModalForm handleClose={handleClose} id={id} />
    </div>
  );

  const handleDelete = (id) => {
    db.collection(`users/${currentUser.uid}/birth`)
      .doc(id)
      .delete()
      .then(() => {
        console.log('successfully deleted! ');
      })
      .catch((error) => {
        console.log('Error removing document:', error);
      });
  };

  return (
    <List component="div" disablePadding>
      {monthdata.map((x) => {
        return (
          <Accordion key={x.id} >
            <ListItem
              className='center'
              style={
                iPhone
                  ? {
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px',
                    }
                  : {
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px',
                    }
              }
            >
              <div className='center'>
                <span style={{ color: `${x.color}` }}>
                  <AccountCircle fontSize={iPhone ? '' : 'small'} />
                </span>
                　{x.title}
              </div>
              <div className='center'>
                <span style={{ paddingRight: '30px' }}>{`${getAge(
                  x.year,
                  x.month,
                  x.day
                )}才`}</span>
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {body}
                  </Modal>
                </div>
                <IconButton
                  type="button"
                  onClick={() => handleOpen(x)}
                  size="small"
                  variant="contained"

                >
                  <EditIcon color="primary" fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(x.id)}
                  type="submit"
                  size="small"
                  variant="contained"
               >
                  <DeleteIcon color="secondary" fontSize="small" />
                </IconButton>
              </div>
            </ListItem>
          </Accordion>
        );
      })}
    </List>
  );
};

export default BirthdayListItem;
