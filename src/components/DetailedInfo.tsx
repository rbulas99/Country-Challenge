import { Theme, useTheme } from "../theme/ThemeProvider";
import styled from "styled-components";

type DetailedInfoProps = {
  label: string;
  value: string | string[] | number | undefined;
};

const DetailedInfo: React.FC<DetailedInfoProps> = ({ label, value }) => {
  const { theme } = useTheme();

  if (Array.isArray(value)) {
    value = value.join(" | ");
  }
  if (typeof value === "number"){
    value = value.toLocaleString('en-US')
  }
  
  return (
    <DetailedInfoWrapper theme={theme}>
      <Label>{label}:</Label>
      <Value>{value}</Value>
    </DetailedInfoWrapper>
  );
};

const DetailedInfoWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`;
const Label = styled.p`
  margin: 3px 0;
  font-weight: 600;
`;
const Value = styled.p`
  margin: 3px;
  font-weight: 300;
`;

export default DetailedInfo;
