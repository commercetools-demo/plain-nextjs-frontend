'use client';
import { Button } from '@/components/ui/button';
import Form from '@/components/ui/form';
import Header from '@/components/ui/header';
import Input from '@/components/ui/input';
import PriceInput from '@/components/ui/price-input';
import { SubsciptionOrder } from '@/services/order/order.types';
import { Money, OrderImportDraft } from '@commercetools/platform-sdk'
import { Formik } from 'formik'
import React, { useState } from 'react'

type ExtendedSubscriptionOrder = SubsciptionOrder & {
    endDate: Date;
    startDate: Date;
    renewalDate: Date;
}


export default function NewOrdrerPage() {

    const [isLoading, setIsLoading] = useState(false);

    const handleOrderSubmit = async (values: OrderImportDraft & SubsciptionOrder) => {
        const payload = {
            ...values,
            startDate: new Date(values.startDate).toISOString(),
            endDate: new Date(values.endDate).toISOString(),
            renewalDate: new Date(values.renewalDate).toISOString(),
        }
        
        setIsLoading(true);
        const response = await fetch(`/api/order-import`, {
            body: JSON.stringify(payload),
            method: 'POST'
        });
        setIsLoading(false);
        if (!response.ok) {
            throw new Error('Failed to fetch cart details');
        }
        const data = await response.json();
    }

    const handleValidation = (values: OrderImportDraft & SubsciptionOrder) => {
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
        if (!values.subscriptionID) {
            errors.subscriptionID = 'Required';
        }
        if (!values.planID) {
            errors.planID = 'Required';
        }
        if (!values.startDate) {
            errors.startDate = 'Required';
        }
        if (!values.endDate) {
            errors.endDate = 'Required';
        }
        if (!values.renewalDate) {
            errors.renewalDate = 'Required';
        }

        if (values.startDate && values.endDate && new Date(values.startDate) > new Date(values.endDate)) {
            errors.endDate = 'Subscription End Date should be greater than Start Date';
        }
        if (values.startDate && values.renewalDate && new Date(values.startDate) > new Date(values.renewalDate)) {
            errors.renewalDate = 'Subscription Renewal Date should be greater than Start Date';
        }
        if (values.endDate && values.renewalDate && new Date(values.renewalDate) > new Date(values.endDate)) {
            errors.endDate = 'Subscription End Date should be greater than Renewal Date';
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
                subscriptionID: '',
                planID: '',
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                renewalDate: new Date(new Date().setMonth(new Date().getMonth() + 11)).toISOString().split('T')[0],

                
            } as OrderImportDraft & SubsciptionOrder}
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
                        <Input error={errors.subscriptionID} label="Subscription ID" type="text" name="subscriptionID" value={values.subscriptionID} onChange={handleChange} />
                        <Input error={errors.planID} label="Plan ID" type="text" name="planID" value={values.planID} onChange={handleChange} />
                        <Input error={errors.startDate} label="Subscription Start" type="date" name="startDate" value={values.startDate} onChange={handleChange} />
                        <Input error={errors.endDate} label="Subscription End" type="date" name="endDate" value={values.endDate} onChange={handleChange} />
                        <Input error={errors.renewalDate} label="Subscription Renewal date" type="date" name="renewalDate" value={values.renewalDate} onChange={handleChange} />
                        <Button type="submit" loading={isLoading}>Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
