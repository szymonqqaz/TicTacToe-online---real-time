import React from 'react';
import { useParams } from 'react-router-dom';

import xIcon from 'assets/icons/xIcon.svg';
import ElipseIcon from 'assets/icons/ElipseIcon.svg';

import InvadeButton from 'components/InvadeButton';
import TopBar from 'components/TopBar';

import {
  PlayerIcon,
  PlayerInsideWrapper,
  PlayersWrapper,
  BoardWrapper,
  Field,
  WaitForOpponentWrapper,
  FieldSymbolImage,
  MainWrapper,
  BottomWrapper,
  InvadeButtonWrapper,
  Text,
  RevengeWrapper,
  PlayerAcceptStatus,
  RevengeText,
  PlayerName,
  PlayerStatus,
  RevengeButton,
} from './styled';

import useHooks from './useHooks';

const GamePage = () => {
  const { id, username } = useParams();
  const {
    board,
    isGameStart,
    players,
    move,
    playerMove,
    boardRef,
    acceptRevenge,
    revenge,
    revengeButtonRef,
    mySocketId,
    winStatus,
  } = useHooks(id, username);

  return (
    <>
      {!isGameStart && (
        <WaitForOpponentWrapper>
          <TopBar isWaitingForOpponentView>
            <InvadeButton />
          </TopBar>
          <Text>Kliknij, aby skopiować link i przesłać go znajomemu, dzięki czemu będzie mógł dołączyć do rozgrywki</Text>
          <p style={{textAlign: "center", padding: "0px 20px", position: 'relative', top: '-100px'}}>Jeśli tylko testujesz aplikację, otwórz nową kartę i wklej tam skopiowany link</p>
          <InvadeButton />
        </WaitForOpponentWrapper>
      )}
      {revenge.showRevenge && (
        <RevengeWrapper>
          <TopBar>
            <InvadeButton />
          </TopBar>
          <RevengeText>Rewanż</RevengeText>
          {players.map(player => (
            <PlayerAcceptStatus>
              <PlayerName>{player.username}</PlayerName>
              <PlayerStatus isAccepted={revenge.users.includes(player.userId)}>
                {revenge.users.includes(player.userId)
                  ? 'zatwierdzono'
                  : 'oczekiwanie na potwierdzenie'}
              </PlayerStatus>
            </PlayerAcceptStatus>
          ))}
          <RevengeButton ref={revengeButtonRef} onClick={acceptRevenge}>
            {revenge.users.includes(mySocketId) ? 'potwierdzono' : 'potwierdź'}
          </RevengeButton>
        </RevengeWrapper>
      )}
      <MainWrapper>
        <TopBar>
          <PlayersWrapper>
            {players.map(player => (
              <PlayerInsideWrapper isMove={player.symbol === move}>
                {player.username}
                <PlayerIcon
                  src={player.symbol ? ElipseIcon : xIcon}
                  alt={player.symbol ? 'circle' : 'x'}
                />
              </PlayerInsideWrapper>
            ))}
          </PlayersWrapper>
          <InvadeButtonWrapper>
            <InvadeButton />
          </InvadeButtonWrapper>
        </TopBar>
        <BoardWrapper ref={boardRef} isOpen={winStatus !== 0} isWin={winStatus}>
          {board.map((field, fieldIndex) => (
            <Field onClick={() => playerMove(fieldIndex)}>
              {field !== 0 && field === 1 ? (
                <FieldSymbolImage src={xIcon} alt="x" />
              ) : (
                field === 2 && <FieldSymbolImage src={ElipseIcon} alt="o" />
              )}
            </Field>
          ))}
        </BoardWrapper>
        <BottomWrapper>
          <InvadeButton />
        </BottomWrapper>
      </MainWrapper>
    </>
  );
};

export default GamePage;
