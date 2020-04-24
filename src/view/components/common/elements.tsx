import styled from 'styled-components';

export const ButtonGroup = styled.div`
  margin-top: 20px;  
  display: flex;
  justify-content: space-between;
  
  > * {
    width: calc(1/2 *100% - (1 - 1/2) *10px);
  }
`;
