import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { iPhoneContext } from '../layout/App';

const HeaderBar = () => {
  const history = useHistory();
  const iPhone = useContext(iPhoneContext);
  return (
    <div
      style={
        iPhone
          ? { paddingBottom: '100px' }
          : { paddingBottom: '50px', zoom: '120%' }
      }>
      <FullCalendar
        height={0}
        dayHeaders={0}
        locale="ja" // ロケール設定。
        plugins={[dayGridPlugin]} // 月表示、日付等のクリックを可能にするプラグインを設定。
        titleFormat={{
          year: 'numeric',
          month: 'short',
        }}
        customButtons={{
          custom1: {
            text: `入力ページ`,
            click: () => history.push('/form'),
          },
          custom2: {
            text: `誕生日一覧`,
            click: () => {
              history.push('/birthdaylist');
            },
          },
          custom3: {
            text: `カレンダー`,
            click: () => {
              history.push('/calender');
            },
          },
          custom4: {
            text: `ログアウト`,
            click: () => {
              history.push('/');
              auth.signOut();
            },
          },
        }}
        headerToolbar={
          iPhone
            ? {
                start: 'title',
                center: '',
                end: 'custom1,custom2,custom3,custom4',
              }
            : {
                start: '',
                center: 'custom1,custom2,custom3,custom4',
                end: '',
              }
        }
        eventTextColor="black"
      />
    </div>
  );
};

export default HeaderBar;
