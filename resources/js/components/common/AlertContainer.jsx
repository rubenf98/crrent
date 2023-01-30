import { Alert } from 'antd'
import React from 'react'
import styled from "styled-components";
import { maxWidth } from '../helper';

const Container = styled(Alert)`
    max-width: ${maxWidth};
    margin: 10px auto 50px auto !important;

    .ant-alert-message {
        font-size: 18px;
        margin: 10px 0px;
    }

    .ant-alert-description {
        p {
            margin-bottom: 0px;
        }
    }

    .ant-alert-icon {
        margin-top: 10px;
    }
`;

function AlertContainer({ currentErrors, title, onClose }) {
    return (
        <div>
            {
                Object.values(currentErrors).length ?
                    <Container
                        showIcon
                        message={title}
                        description={Object.values(currentErrors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                        style={{ margin: "20px 0px" }}
                        type="error"
                        closable
                        onClose={onClose}
                    />
                    : <></>
            }
        </div>
    )
}

export default AlertContainer