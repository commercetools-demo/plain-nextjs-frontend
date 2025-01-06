'use client';
import { Button } from '@/components/ui/button';
import Form from '@/components/ui/form';
import Input from '@/components/ui/input';
import { OrderImportDraft } from '@commercetools/platform-sdk'
import { Formik } from 'formik'
import React from 'react'


export default function NewOrdrerPage() {

    const handleOrderSubmit = async (values: OrderImportDraft) => {
        console.log(values)
        const response = await fetch(`/api/order-import`, {
            body: JSON.stringify(values),
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Failed to fetch cart details');
        }
        const data = await response.json();
        console.log(data);
    }

    const handleValidation = (values: OrderImportDraft) => {
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
        if (typeof values.totalPrice.centAmount === 'undefined') {
            errors.totalPrice = {
                currencyCode: 'Required',
            }
        }
        return errors;
    }

    return (
        <div className='w-1/3'>
            <Formik initialValues={{
                orderNumber: '',
                customerId: '',
                customerEmail: '',
                totalPrice: {
                    currencyCode: 'USD',
                    centAmount: 0,
                    fractionDigits: 2
                }
            } as OrderImportDraft}
                validate={handleValidation}
                onSubmit={handleOrderSubmit}>
                {({ values, errors, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Input error={errors.orderNumber} label="Order Number" type="text" name="orderNumber" value={values.orderNumber} onChange={handleChange} />
                        <Input error={errors.customerId} label="Customer Id" type="text" name="customerId" value={values.customerId} onChange={handleChange} />
                        <Input error={errors.customerEmail} label="Customer Email" type="text" name="customerEmail" value={values.customerEmail} onChange={handleChange} />
                        <Input error={errors.totalPrice?.centAmount} label="Total price centAmount" type="number" name="totalPrice.centAmount" value={values.totalPrice.centAmount} onChange={handleChange} />
                        <Button type="submit">Submit</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
