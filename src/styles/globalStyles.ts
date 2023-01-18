import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {
    background:${({theme}) => theme.background};
    color:${({theme}) => theme.text};
    transition:background .2s ease;
}

p , h1, h2, h3, h4, h5 {
    margin:0;
}

button {
    font-family:'Urbanist',sans-serif;
}

::-webkit-scrollbar {
    width: 5px;
}
::-webkit-scrollbar-track {
    background-color:${({theme}) => theme.input.border};
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color:${({theme}) => theme.neutral};
}

::selection {
    background:${({theme}) => theme.text};
    color:${({theme}) => theme.background}
}
`;