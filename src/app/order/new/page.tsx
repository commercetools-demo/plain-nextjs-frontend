'use client';
import { Button } from '@/components/ui/button';
import Form from '@/components/ui/form';
import Header from '@/components/ui/header';
import Input from '@/components/ui/input';
import PriceInput from '@/components/ui/price-input';
import { Money, OrderImportDraft } from '@commercetools/platform-sdk'
import { Formik } from 'formik'
import React, { useState } from 'react'


export default function NewOrdrerPage() {

    const [isLoading, setIsLoading] = useState(false);

    const handleOrderSubmit = async (values: OrderImportDraft) => {
        setIsLoading(true);
        const response = await fetch(`/api/order-import`, {
            body: JSON.stringify(values),
            method: 'POST'
        });
        setIsLoading(false);
        if (!response.ok) {
            throw new Error('Failed to fetch cart details');
        }
        const data = await response.json();
        console.log(data);
    }

    const handleValidation = (values: OrderImportDraft & { SubscriptionID: string; PlanID: string }) => {
        const errors: any = {};
        if (!values.orderNumber) {
            errors.orderNumber = 'Required';
        }
        if (!values.customerId) {
            errors.customerId = 'Required';
        }
        if (!values.customerEmail) {
            errors.customerEmail = 'Required';
        }
        if (!values.SubscriptionID) {
            errors.SubscriptionID = 'Required';
        }
        if (!values.PlanID) {
            errors.PlanID = 'Required';
        }
        if (typeof values.totalPrice.centAmount === 'undefined') {
            errors.totalPrice = {
                currencyCode: 'Required',
            }
        }
        return errors;
    }

    return (
        <div className='w-1/3 p-4'>
            <Header backUrl="/" title="New Order" className='mb-4' />
            <Formik initialValues={{
                orderNumber: '',
                customerId: '',
                customerEmail: '',
                totalPrice: {
                    currencyCode: 'USD',
                    centAmount: 0,
                    fractionDigits: 2
                },
                SubscriptionID: '',
                PlanID: ''
                
            } as OrderImportDraft & { SubscriptionID: string; PlanID: string }}
                validate={handleValidation}
                onSubmit={handleOrderSubmit}>
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Input error={errors.orderNumber} label="Order Number" type="text" name="orderNumber" value={values.orderNumber} onChange={handleChange} />
                        <Input error={errors.customerId} label="Customer Id" type="text" name="customerId" value={values.customerId} onChange={handleChange} />
                        <Input error={errors.customerEmail} label="Customer Email" type="text" name="customerEmail" value={values.customerEmail} onChange={handleChange} />
                        <PriceInput
                            label="Total Price"
                            name="totalPrice"
                            value={values.totalPrice as Money}
                            handleChange={handleChange}
                        />
                        <Input error={errors.SubscriptionID} label="Subscription ID" type="text" name="SubscriptionID" value={values.SubscriptionID} onChange={handleChange} />
                        <Input error={errors.PlanID} label="Plan ID" type="text" name="PlanID" value={values.PlanID} onChange={handleChange} />
                        <Button type="submit" loading={isLoading}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
