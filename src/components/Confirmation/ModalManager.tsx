import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components"
import { devicemaxWidth } from "../../constants/breakpoints";


export default function Manager({type,cancel}) {

    let Content = null;

    switch(type) {
        case "delete_cart_item":
            Content = (
                <DialogBox>
                    <div className="content">
                        <p>Are you Sure you want to delete this item ?</p>
                    </div>
                    <div className="button_options">
                        <button className="cancel" onClick={cancel}>Cancel</button>
                        <button className="delete">Delete</button>
                    </div>
                </DialogBox>
            )
        break;
        default:
            Content = (
                <p>Nothing</p>
            )
    }
    

    return (
        <>
            {Content}
        </>
    )
}

const DialogBox = styled.div`
user-select:none;
    display:flex;
    flex-direction:column;
    gap:3rem;
    align-items:space-between;
    justify-content:space-between;
    height:100%;
    @media only screen and ${devicemaxWidth.tablet} {
        gap:1rem;
      }
    .content {
        padding:2rem;
    }
    .content p {
        font-size:1.8rem;
    }
    .button_options {
        display:flex;
        button {
            flex:1;
            border:none;
            background:transparent;
            cursor:pointer;
            font-size:1.4rem;
            color:${({theme}) => theme.text};
            padding:2rem 0;
            transition:all .2s ease-in-out;
        }
        .cancel {

            &:hover {
                background-color:${({theme}) => theme.text};
                color:${({theme}) => theme.background}
            }
        }
        .delete {
            &:hover {
                background-color:${({theme}) => theme.danger};
                color:${({theme}) => theme.background}
            }
        }
    }
`;

