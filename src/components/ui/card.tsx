import React, { HTMLAttributes, PropsWithChildren, ReactHTMLElement } from 'react'

type CardProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {}
type CardContentProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {}
type CardHeaderProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>> & {}

const CardContent = (props: CardContentProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}
const CardHeader = (props: CardHeaderProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}
const Card = (props: CardProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export { Card, CardHeader, CardContent };