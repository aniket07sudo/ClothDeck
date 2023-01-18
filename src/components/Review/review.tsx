import Image from "next/image";
import { memo, useState } from "react"
import styled from "styled-components";
import Stars from "../Stars";


export interface ReviewsProps {
    heading:string,
    description:string,
    rating:number,
    item_id:string,
    user_id:{
        fname:string
    },
    images:[string],
    user_liked:[string],
    createdAt:Date,
    id:string,
    updatedAt:Date
}



 function ReviewComponent({review}:ReviewsProps) {

    console.log("Render Review Component");
    

    const [showMore,setShowMore] = useState(false);

    const FormatDate = (date:Date) => {
        const CurrDate: Date = new Date();
        const oldDate: Date = new Date(date);
        var Difference : Date = new Date(CurrDate.valueOf() - oldDate.valueOf());
        // console.log("Months Ago" , Difference.getMonth());
        
        var DateObj = new Date(date);
        var DateFormat = `${("0" + DateObj.getDate()).slice(-2)} ${DateObj.toLocaleString('default', { month:'short' })} ${DateObj.getFullYear()}` 
        return DateFormat;
    }

    return (
        <ReviewContainer showMore={showMore} key={review.id} className="review_section">
            <h5>{review.heading}</h5>
          
            <div className="rating_section">
                <div className="star_container">
                    <Stars fill={4} />
                    <p>{review.user_id.fname}</p>
                </div>
                <p>{FormatDate(review.createdAt)}</p>
            </div>
            <p className="description">{`${review.description}`}</p>
            {review.description.length >= 250 && <button onClick={() => setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Show More'}</button>}
            <div className="review_images">
                {review.images.map((img:string,i:number) => (
                    <div key={i} className="image_container">
                        <Image src={img} alt="Image" width={100} height={100} />
                    </div>
                ))}
            </div>
        </ReviewContainer>
    )
}

export default memo(ReviewComponent);

const ReviewContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:1rem;
    padding-bottom:2rem;
    align-items:flex-start;

    &:not(:nth-last-child(2))::after {
        content:"";
        height:1px;
        width:80%;
        display:block;
        background-color:transparent;
        margin:1rem auto;

    }

    .review_images {
        display:flex;
        gap:1rem;
        padding:1rem 0;
       
        .image_container {
            width:10rem;
            img {
                object-fit:cover;
            }
        }
    }

    button {
        display:inline-flex;
        align-self:left;
        background:transparent;
        border:none;
        color:${({theme}) => theme.text};
        text-align:left;
        font-family:'Urbanist',sans-serif;
        font-size:1.4rem;
        padding:0;
        border-bottom:1px solid ${({theme}) => theme.text};
        cursor:pointer;
    }

    .description {
        display:-webkit-box;
        -webkit-line-clamp:${props => props.showMore ? 'auto' : 2};
        -webkit-box-orient:vertical;
        overflow:hidden;
        line-height:2.4rem;
    }

    .rating_section {
        width:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .star_container {
            display:inline-flex;
            align-items:center;
            gap:2rem;
            p {
                font-size:1.6rem;
                color:#878787;
            }
            svg {
                width:1.5rem;
                height:1.5rem;

            }
        }
        p {
          color:#878787;

        }
    }
    h5 {
        font-size:1.6rem;
        font-weight:700;
    }
    p {
        font-size:1.6rem;
    }
`;