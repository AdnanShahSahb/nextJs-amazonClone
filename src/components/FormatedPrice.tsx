import React from 'react'
interface Props {
    amount: number
}
const FormatedPrice = ({ amount }: Props) => {
    const formatedAmount = new Number(amount).toLocaleString("en-US", {
        style: "currency",
        currency: 'USD',
        minimumFractionDigits: 2
    })
    return (
        <span> {formatedAmount} </span>
    )
}

export default FormatedPrice