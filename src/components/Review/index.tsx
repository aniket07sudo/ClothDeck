import { Fragment, memo, useCallback, useEffect, useState } from "react";
import {ReviewsProps} from './review'
import ReviewComponent from "./review";
import { useRouter } from "next/router";


interface ReviewProps {
    reviews:[ReviewsProps]
}


function Review() {

    const router = useRouter();

    const [apiReviews,setReviews] = useState([])
    const [reviewLoading,setReviewLoading] = useState(true)

    const CallReview = useCallback(() => {
        
        fetch(`/api/v1/review/getReview/${router.query.id}`).then(res => res.json()).then(res => {
            console.log("Res",res);
            setReviews(res.data);
        }).catch(err => {
            console.log("Err",err);
        }).finally(() => {
            setReviewLoading(false);
        })
    },[])


    useEffect(() => {
        CallReview();
    },[])

    const Reviewss = apiReviews.map(review => (
        <ReviewComponent key={review.id} review={review} />
    ))

    

    return (
        <>
            {Reviewss}
        </>
    )
}
export default Review;
