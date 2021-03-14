// FullCalendarコンポーネント。
import FullCalendar from '@fullcalendar/react';
import '../style/Calender.scss';
import tippy, { roundArrow } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/themes/light.css';

// FullCalendarで月表示を可能にするモジュール。
import dayGridPlugin from '@fullcalendar/daygrid';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

import { iPhoneContext, CalenderContext } from '../App';
import { useContext } from 'react';

// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from '@fullcalendar/interaction';
import { getAge } from '../util/age';

const Calender = () => {
  const users = useContext(CalenderContext);
  const iPhone = useContext(iPhoneContext);
  const history = useHistory();

  console.log(users);
  return (
    <FullCalendar
      height="100%"
      locale="ja"
      plugins={[dayGridPlugin, interactionPlugin]}
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
        custom5: {
          text: `三`,
          click: () => {
            history.push('/nav');
          },
        },
      }}
      headerToolbar={
        iPhone
          ? {
              start: 'today,prev,next',
              center: 'title',
              end: 'custom1,custom2,custom3,custom4',
            }
          : {
              start: 'today,prev,next',
              center: 'title',
              end: 'custom5',
            }
      }
      events={users}
      eventMouseEnter={(mouseEnterInfo) => {
        tippy(mouseEnterInfo.el, {
          content: `
          ${getAge(
            mouseEnterInfo.event.extendedProps.year,
            mouseEnterInfo.event.extendedProps.month,
            mouseEnterInfo.event.extendedProps.day
          )}才の誕生日<br>${mouseEnterInfo.event.extendedProps.memo}`,
          placement: 'bottom',
          allowHTML: true,
          arrow: roundArrow,
          delay: 200,
          theme: 'custom',
        });
      }}
    />
  );
};
export default Calender;
