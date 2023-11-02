import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  background-color: blue;
  color: white;
  padding: 10px;
  border-radius: 12px;
`;

export default function ProTip() {
  return (
    <Box>
      Testing styled components styles
    </Box>
  );
}
