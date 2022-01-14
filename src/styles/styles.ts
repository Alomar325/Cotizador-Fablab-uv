import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`

    @font-face {
        font-family: "Kanit Light";
        src: url("/fonts/Kanit-Light.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Kanit Bold";
        src: url("/fonts/Kanit-Bold.ttf") format("truetype");
        font-style: normal;
    }


    body,
    html,
    a {
        font-family: 'Kanit Light';
    }


    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: rgba(255,255,255,0)
        overflow-x: hidden;
    }

    a:hover {
        color: #00DBDE;
    }

    input,
    textarea {
        border-radius: 4px;
        border: 0;
        background: rgb(241, 242, 243);
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;

        :focus-within {
            background: none;
            box-shadow: #00DBDE 0px 0px 0px 1px;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Kanit Bold';
        color:#fff;
        text-shadow: 0px 0px 6px rgba(255,255,255,1);
        font-size: 56px;
        line-height: 1.18;
        z-index:-1

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
    }

    p {
        color: #000;
        font-size: 20px;        
        margin: 0;
        
    }

    h1 {
        font-weight: 600;
    }

    a {
        text-decoration: none;
        outline: none;
        color: #00DBDE;

        :hover {
            color: #00DBDE;
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        background-color: #111111;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }
`;
