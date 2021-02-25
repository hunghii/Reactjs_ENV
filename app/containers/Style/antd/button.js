import { scss } from 'styled-components';
import * as style from 'components/Variables';

const ButtonStyle = scss`
 .buttonCustomer{
    .ant-btn{
        background:${style.color.success.default}
    }
 }
`;

export default ButtonStyle;
