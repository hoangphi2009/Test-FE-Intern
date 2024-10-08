import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Task2.css';

const TransactionSchema = Yup.object().shape({
    time: Yup.date().required('Vui lòng chọn thời gian.'),
    quantity: Yup.number()
        .min(0.01, 'Số lượng phải lớn hơn 0.')
        .required('Vui lòng nhập số lượng.'),
    pump: Yup.string().required('Vui lòng chọn trụ.'),
    revenue: Yup.number()
        .min(0, 'Doanh thu không thể âm.')
        .required('Vui lòng nhập doanh thu.'),
    unitPrice: Yup.number()
        .min(0, 'Đơn giá không thể âm.')
        .required('Vui lòng nhập đơn giá.'),
});

const Task2 = () => {
    return (
        <div className="transaction-form-container">
            <h3>Nhập giao dịch</h3>
            <Formik
                initialValues={{
                    time: '',
                    quantity: '',
                    pump: '',
                    revenue: '',
                    unitPrice: '',
                }}
                validationSchema={TransactionSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    alert('Giao dịch đã được cập nhật thành công!');
                    console.log(values);
                    setSubmitting(false);
                    resetForm();
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="transaction-form">
                        <div className="form-group">
                            <label htmlFor="time">Thời gian</label>
                            <Field type="datetime-local" name="time" />
                            <ErrorMessage name="time" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Số lượng (lít)</label>
                            <Field type="number" step="0.01" name="quantity" />
                            <ErrorMessage name="quantity" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="pump">Trụ</label>
                            <Field as="select" name="pump">
                                <option value="">Chọn trụ...</option>
                                <option value="Trụ 1">Trụ 1</option>
                                <option value="Trụ 2">Trụ 2</option>
                                <option value="Trụ 3">Trụ 3</option>
                                <option value="Trụ 4">Trụ 4</option>
                            </Field>
                            <ErrorMessage name="pump" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="revenue">Doanh thu (VND)</label>
                            <Field type="number" name="revenue" />
                            <ErrorMessage name="revenue" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="unitPrice">Đơn giá (VND)</label>
                            <Field type="number" name="unitPrice" />
                            <ErrorMessage name="unitPrice" component="div" className="error-message" />
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Task2;
