import Link from "next/link";
import styled from "styled-components";


export default function SearchItem({item}) {

    const CreateMarkup = html => {
        return { __html:html }
    }

    return (
        // <Link href={`/product/${item.itemId}`}>
            <MarkSpan dangerouslySetInnerHTML={CreateMarkup(item.title)} />
        // </Link>
    )
}

const MarkSpan = styled.div`
    mark {
        background-color:transparent;
        color:${({theme}) => theme.text};
        font-weight:700;
    }
`;