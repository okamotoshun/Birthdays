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
import { iPhoneContext } from '../layout/App';
import { useContext } from 'react';

// FullCalendarで日付や時間が選択できるようになるモジュール。
import interactionPlugin from '@fullcalendar/interaction';
import { getAge } from '../util/age';

const Calender = () => {
  // const users = useContext(UserContext);
  const iPhone = useContext(iPhoneContext);
  const history = useHistory();

  return (
    <FullCalendar
      height="100%"
      locale="ja" // ロケール設定。
      plugins={[dayGridPlugin, interactionPlugin]} // 月表示、日付等のクリックを可能にするプラグインを設定。
      initialView="" // カレンダーの初期表示設定。
      selectable={true} // 日付選択を可能にする。interactionPluginが有効になっている場合のみ。
      weekends={true} // 週末を強調表示する。
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
              start: 'today,prev,next',
              center: 'title',
              end: 'custom1,custom2,custom3,custom4',
            }
          : {
              start: '',
              center: 'title',
              end: '',
            }
      }
      footerToolbar={
        iPhone
          ? ''
          : {
              start: 'today,prev,next',
              center: '',
              end: 'custom1,custom2,custom3',
            }
      }
      events={[{ title: 'jknvs', date: '2021-03-05' }]}
      eventMouseEnter={(mouseEnterInfo) => {
        tippy(mouseEnterInfo.el, {
          content: `
          ${getAge(
            mouseEnterInfo.event.extendedProps.year,
            mouseEnterInfo.event.extendedProps.month,
            mouseEnterInfo.event.extendedProps.day
          )}才の誕生日<br>一口メモ:${mouseEnterInfo.event.extendedProps.memo}`,
          placement: 'bottom',
          allowHTML: true,
          arrow: roundArrow,
          delay: 200,
          theme: 'custom',
        });
      }}
      eventTextColor="black"
    />
  );
};
export default Calender;
