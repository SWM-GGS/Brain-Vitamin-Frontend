import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

type DatesProps = {
  lastdate: number;
  firstdate: number;
  elm: number;
  $findToday: false | number;
  month: number;
  year: number;
  idx: number;
};

const Dates = ({
  lastdate,
  firstdate,
  elm,
  $findToday,
  month,
  year,
  idx,
}: DatesProps) => {
  const [userInput, setUserInput] = useState('');
  const [evtList, setEvtList] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  let dateKey = `${month}` + `${elm}`;

  const registEvent = (value: string) => {
    setEvtList((prev) => [...prev, value]);
    setUserInput('');
    setOpenModal(false);
  };

  return (
    <>
      <Form
        onDoubleClick={() => {
          setOpenModal(true);
        }}>
        <DateNum $idx={idx} $lastdate={lastdate} $firstdate={firstdate}>
          <TodayCSS $findToday={$findToday}>{elm}</TodayCSS>일
        </DateNum>
        {openModal && (
          <Modal
            elm={elm}
            month={month}
            year={year}
            registEvent={registEvent}
            setOpenModal={setOpenModal}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        )}
        {Boolean(evtList[0]) && (
          <Lists>
            {evtList.map(
              (list) =>
                list.slice(0, list.indexOf('_')).startsWith(dateKey) && (
                  <List key={list}>
                    {list.slice(list.indexOf('_') + 1, list.length)}
                  </List>
                ),
            )}
          </Lists>
        )}
      </Form>
    </>
  );
};

const Form = styled.li`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  min-height: 9vw;
  text-align: center;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  &:nth-child(7n + 1),
  &:nth-child(7n) {
    color: red;
    // background-color: #f5f5f5;
  }
`;

const DateNum = styled.div<{
  $idx: number;
  $firstdate: number;
  $lastdate: number;
}>`
  margin: 1rem 0 0 0;
  color: ${(props) =>
    props.$idx < props.$lastdate ||
    (props.$firstdate > 0 && props.$idx > props.$firstdate - 1)
      ? '#969696'
      : 'black'};
`;

const TodayCSS = styled.span<{ $findToday: false | number }>`
  ${(props) =>
    props.$findToday &&
    ` position: relative;
    padding: .5vw;
    border-radius: 50%;
    font-size: 1.2vw;
    font-weight: 700;
    color: #FFFFFF;
    background-color: red;
 `}
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const List = styled.span`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  background-color: #f7ced9;
  border-radius: 5px;
`;

export default Dates;
