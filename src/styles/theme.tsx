export interface ThemeProps {
    body:string,
    text:string,
    danger:string,
    paraText:string,
    background:string,
    error:string,
    neutral:string,
    picBackground:string,
    footer:string,
    input:{
        border:string,
        borderActive:string
    },
    button:{
        background:string,
        text:string
    }

}

export const lightTheme : ThemeProps = {
    body:'#fff',
    text:'#262D33',
    danger:"#D6484C",
    paraText:'#262D33',
    background:'#fff',
    error:'#D6484C',
    neutral:'#B9B9B9',
    picBackground:'#F3F3F3',
    footer:'#262D33',
    input:{
        border:'#e7e7e7',
        borderActive:'#262D33'
    },
    button:{
        background:'#0D0D0D',
        text:'#fff'
    }
}

export const darkTheme : ThemeProps = {
    body:'#0D0D0D',
    text:'#fff',
    danger:"#D6484C",
    paraText:'#737373',
    background:'#0D0D0D',
    error:'#D6484C',
    neutral:'#B9B9B9',
    footer:'#262D33',
    picBackground:'#2E2E2E',
    input:{
        border:'#737373',
        borderActive:'#FFFFFF'
    },
    button:{
        background:'#fff',
        text:'#0D0D0D'
    }
}