import React, { useState } from 'react'
import { Collapse } from 'antd';
import styled, { withTheme } from "styled-components";
import { maxWidthStyle, titleStyle } from '../../styles';
import { dimensions } from '../../helper';

const { Panel } = Collapse;

const Container = styled.section`
    position: relative;
    z-index: 3;
    ${maxWidthStyle}
    margin: 200px auto;

    @media (max-width: ${dimensions.md}) {
        margin: 100px auto;
    }

    h2 {
        ${titleStyle}
    }
`;

const Accordion = styled(Collapse)`
    width: 80%;
    margin: auto;

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }

    .ant-collapse-item, .ant-collapse-item:last-child {
        background-color: white;
        margin-bottom: 20px;
        border: 3px solid;
        border-color: ${props => props.borderColor};

        span {
            position: relative;
            z-index: 3;
        }
    }
    .ant-collapse-header {
        font-size: 22px;
        font-weight: 700;
        text-transform: uppercase;

        @media (max-width: ${dimensions.md}) {
            font-size: 16px;
        }
    }

    .ant-collapse-content-box {
        p {
            font-size: 22px;
            font-weight: 400;

            @media (max-width: ${dimensions.md}) {
                font-size: 16px;
            }
        }
    }

    .hover-container {
        position: relative;
        
    }

    .ant-collapse-item {
        opacity: .2;
        padding: 34px;
        box-sizing: border-box;
    }

    .ant-collapse-item-active {
        opacity: 1;
    }
`;

function Faq({ theme, text }) {
    const [activeKey, setActiveKey] = useState(0)
    return (
        <Container>
            <h2>Faq's</h2>

            <Accordion activeKey={activeKey} borderColor={theme.primary} ghost>
                {text.map((item, index) => (
                    <Panel
                        showArrow={false}
                        header={(<div onClick={() => setActiveKey(index)} className='hover-container'>{item.question}</div>)}
                        key={index}

                    >
                        <p>{item.answer}</p>
                    </Panel>
                ))}
            </Accordion>
        </Container>
    )
}

export default withTheme(Faq)