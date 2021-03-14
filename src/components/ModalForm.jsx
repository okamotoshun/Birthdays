import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, MenuItem, TextField, Button } from '@material-ui/core';
import { days, months, years, colors } from '../util/form';
import { db } from '../firebase';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(() => ({
  option: {
    background: '#f1f1f1',
    '&:hover': {
      opacity: '0.5',
      background: '#4051B5',
    },
  },
}));

const ModalForm = ({ handleClose, id }) => {
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const { register, handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    const ref = db.collection(`users/${currentUser.uid}/birth`);
    ref.doc(id.id).set({
      data,
    });
    handleClose();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '90%',
          margin: '0 auto',
          padding: ' 1.5% 2% 1% ',
          backgroundColor: '#ffffff',
        }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '20px',
          }}>
          <TextField
            style={{ width: '100%' }}
            defaultValue={id.title}
            variant="outlined"
            autoFocus={true}
            label="名前"
            fullWidth
            name="name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            inputRef={register({})}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '20px',
          }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <Controller
              variant="outlined"
              name="year"
              defaultValue={id.year}
              control={control}
              as={
                <TextField
                  defaultValue={id.year}
                  style={{ margin: '0' }}
                  select
                  variant="outlined"
                  label="年"
                  margin="normal"
                  fullWidth
                  id="select">
                  {years.map((year) => (
                    <MenuItem
                      className={classes.option}
                      value={year.value}
                      key={year.id}>
                      {year.name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            />
            <Controller
              defaultValue={id.month}
              variant="outlined"
              name="month"
              control={control}
              as={
                <TextField
                  defaultValue={id.month}
                  style={{ margin: '0', marginLeft: '5px' }}
                  select
                  variant="outlined"
                  label="月"
                  margin="normal"
                  fullWidth
                  id="select">
                  {months.map((month) => (
                    <MenuItem
                      className={classes.option}
                      value={month.value}
                      key={month.id}>
                      {month.name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            />
            <Controller
              name="day"
              control={control}
              defaultValue={id.day}
              as={
                <TextField
                  defaultValue={id.day}
                  color="primary"
                  variant="outlined"
                  style={{ margin: '0', marginLeft: '5px' }}
                  select
                  label="日"
                  margin="normal"
                  fullWidth
                  id="select">
                  {days.map((day) => (
                    <MenuItem
                      className={classes.option}
                      value={day.value}
                      key={day.id}>
                      {day.name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '20px',
          }}>
          <div style={{ width: '100%' }}>
            <Controller
              name="color"
              control={control}
              defaultValue={id.color}
              as={
                <TextField
                  defaultValue={id.color}
                  color="primary"
                  variant="outlined"
                  style={{
                    margin: '0',
                  }}
                  select
                  label="イメージカラー"
                  margin="normal"
                  fullWidth
                  id="select">
                  {colors.map((color) => (
                    <MenuItem
                      value={color.value}
                      key={color.id}
                      style={{ color: color.value }}>
                      {color.name}
                    </MenuItem>
                  ))}
                </TextField>
              }
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
          <TextField
            defaultValue={id.memo}
            ref={register}
            style={{ width: '100%' }}
            multiline
            variant="outlined"
            label="一口メモ(関係性など)"
            fullWidth
            name="memo"
            inputRef={register({
              required: '関係性など入力してください',
            })}
          />
        </div>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
          <Button
            type="submit"
            variant="contained"
            onClick={()=>handleClose()}
            style={{ backgroundColor: '#E0E1E2', marginRight: '10px' }}>
            戻る
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: '#22BA45', color: 'white' }}>
            編集
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default ModalForm;
