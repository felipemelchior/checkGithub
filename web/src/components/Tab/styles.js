import styled from 'styled-components';

export const TabItem = styled.div`
  list-style: none;
  margin-top: 30px;

  a {
    background: ${props => (props.isActive ? '#715991' : '#7159c1')};
    border: ${props => (props.isActive ? '1px solid #48395c' : 'none')};
    padding: 10px 15px;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background: #715991;
    }
  }
`;
