import { iPhoneContext } from '../App';
import { useContext } from 'react';
import { UserContext } from '../App';
import { monthList } from '../util/lists';
import BirthdayListItem from './BirthdayListItem';
import HeaderBar from '../layout/HeaderBar';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../style/BirthdayList.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    margin: '0 auto',
  },

  heading: {
    paddingLeft: '10px',
    fontSize: theme.typography.pxToRem(16),
    margin: '0 auto',
    fontWeight: theme.typography.fontWeightRegular,
    display: 'flex',
    justifyContent: 'space-between',
  },

  name: {
    paddingLeft: '20px',
  },
}));

const BirthdayList = () => {
  const iPhone = useContext(iPhoneContext);
  const classes = useStyles();
  const birth = useContext(UserContext);
  return (
    <div className="back">
      <HeaderBar />
      <div
        className={classes.root}
        style={
          iPhone
            ? {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: '0 auto',
                zoom: '145%',
              }
            : {
                height: 'auto',
                zoom: '100%',
              }
        }>
        {monthList.map((a) => {
          // eslint-disable-next-line eqeqeq
          const result = birth.filter((x) => x.month == a.id); //その月のリストだけ表示 listitemで使う
          return (
            <div style={{ margin: '0px 2px 4px' }} key={a.id}>
              <Accordion
                key={a.id}
                className={classes.accordion}
                defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon fontSize="small" />}
                  aria-controls="panel2a-content"
                  style={
                    iPhone
                      ? {
                          backgroundColor: `${a.color}`,
                          minWidth: '422px',
                        }
                      : {
                          backgroundColor: `${a.color}`,
                          minHeight: '40px',
                        }
                  }
                  id="panel2a-header">
                  <Typography className={classes.heading}>{a.month}</Typography>
                </AccordionSummary>
                <BirthdayListItem birth={result} number={a.id} />
              </Accordion>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BirthdayList;
