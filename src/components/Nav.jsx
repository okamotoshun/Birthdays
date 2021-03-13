import React from 'react';
import { useHistory } from 'react-router';
import Button from '@material-ui/core/Button';
import '../style/Nav.scss';
import { auth } from '../firebase';
import { withStyles } from '@material-ui/core/styles';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText('#2d3e4f'),
    backgroundColor: ['#2d3e4f'],
    opacity: ['0.9'],
    '&:hover': {
      backgroundColor: ['#2d3e4f'],
      color: ['white'],
      opacity: ['1'],
    },
  },
}))(Button);

const Nav = () => {
  const history = useHistory();
  return (
    <div className="root">
      <ColorButton
        variant="contained"
        onClick={() => {
          history.goBack();
        }}>
        戻る
      </ColorButton>
      <ColorButton
        variant="contained"
        onClick={() => {
          history.push('/calender');
          auth.signOut();
        }}>
        カレンダー
      </ColorButton>
      <ColorButton
        variant="contained"
        onClick={() => {
          history.push('/birthdaylist');
          auth.signOut();
        }}>
        誕生日一覧
      </ColorButton>
      <ColorButton
        variant="contained"
        onClick={() => {
          history.push('/form');
          auth.signOut();
        }}>
        入力ページ
      </ColorButton>
      <ColorButton
        variant="contained"
        onClick={() => {
          history.push('/');
          auth.signOut();
        }}>
        ログアウト
      </ColorButton>
    </div>
  );
};

export default Nav;
