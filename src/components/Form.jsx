import { useHistory } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { days, months, years, colors } from '../util/form';
import firebase from 'firebase/app';
import { db } from '../firebase';

import {
  Box,
  MenuItem,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import HeaderBar from '../layout/HeaderBar';

const useStyles = makeStyles(() => ({
  tr: {
    background: '#f1f1f1',
    '&:hover': {
      opacity: '0.5',
      background: '#4051B5',
    },
  },
}));

const Form = () => {
  const history = useHistory();
  const classes = useStyles();
  const { currentUser } = firebase.auth();
  const { register, handleSubmit, control, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const ref = db.collection(`users/${currentUser.uid}/birth`);
    ref.add({
      data,
    });
    history.push('/birthdaylist');
  };

  return (
    <>
      <HeaderBar />
      <div
        style={{
          backgroundColor: 'whitesmoke',
        }}>
        <Typography />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: '90%',
            margin: '0 auto',
            padding: ' 3% 3% 2% ',
            backgroundColor: '#ffffff',
            boxShadow: '0 0 2px gray',
            borderRadius: '10px',
            zoom: '100%',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              marginTop: '25px',
            }}>
            <TextField
              style={{ marginBottom: '25px' }}
              variant="outlined"
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
              inputRef={register({
                required: '名前を入れてください!',
              })}
              error={Boolean(errors.name)}
              helperText={errors.name && errors.name.message}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              marginBottom: '25px',
            }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <Controller
                variant="outlined"
                name="year"
                defaultValue=""
                control={control}
                rules={{ required: '西暦を選択してください!' }}
                as={
                  <TextField
                    defaultValue=""
                    style={{ margin: '0' }}
                    select
                    variant="outlined"
                    label="年"
                    margin="normal"
                    fullWidth
                    id="select"
                    error={Boolean(errors.year)}
                    helperText={errors.year && errors.year.message}>
                    {years.map((year) => (
                      <MenuItem
                        className={classes.tr}
                        value={year.value}
                        key={year.id}>
                        {year.name}
                      </MenuItem>
                    ))}
                  </TextField>
                }
              />
              <Controller
                defaultValue=""
                variant="outlined"
                name="month"
                control={control}
                // defaultValue="1"
                rules={{ required: '月を選択してください!' }}
                as={
                  <TextField
                    defaultValue=""
                    style={{ margin: '0', marginLeft: '10px' }}
                    select
                    variant="outlined"
                    label="月"
                    margin="normal"
                    fullWidth
                    id="select"
                    error={Boolean(errors.month)}
                    helperText={errors.month && errors.month.message}>
                    {months.map((month) => (
                      <MenuItem
                        className={classes.tr}
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
                defaultValue=""
                rules={{ required: '日にちを選択してください!' }}
                as={
                  <TextField
                    defaultValue=""
                    color="primary"
                    variant="outlined"
                    style={{ margin: '0', marginLeft: '10px' }}
                    select
                    label="日"
                    margin="normal"
                    fullWidth
                    id="select"
                    error={Boolean(errors.day)}
                    helperText={errors.day && errors.day.message}>
                    {days.map((day) => (
                      <MenuItem
                        className={classes.tr}
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
            <div style={{ width: '100%', marginBottom: '25px' }}>
              <Controller
                name="color"
                control={control}
                defaultValue=""
                rules={{ required: 'カラーを選択してください！' }}
                as={
                  <TextField
                    className='color'
                    defaultValue=""
                    color="primary"
                    variant="outlined"
                    select
                    label="イメージカラー"
                    margin="normal"
                    fullWidth
                    id="select"
                    style={{
                      margin: '0',
                    }}
                    error={Boolean(errors.color)}
                    helperText={errors.color && errors.color.message}>
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
              error={Boolean(errors.memo)}
              helperText={errors.memo && errors.memo.message}
            />
          </div>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '40px 10px ',
            }}>
            <Button
              type="submit"
              variant="contained"
              onClick={() => history.push('/view')}
              style={{
                backgroundColor: '#E0E1E2',
                marginRight: '10px',
                fontSize: '24px',
              }}>
              戻る
            </Button>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#22BA45',
                color: 'white',
                fontSize: '24px',
              }}>
              登録
            </Button>
          </Box>
        </form>
      </div>
    </>
  );
};

export default Form;
