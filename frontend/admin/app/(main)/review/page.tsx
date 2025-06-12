'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { ReviewService, Review } from '@/app/api/review';
import { AccountService } from '@/app/api/account';
import { ProductService } from '@/app/api/product';

export default function ReviewPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [review, setReview] = useState<Review | null>(null);
    const [reviewDialog, setReviewDialog] = useState(false);
    const [deleteReviewDialog, setDeleteReviewDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DataTableValueArray>>(null);

    useEffect(() => {
        loadReviews();
        loadAccounts();
        loadProducts();
    }, []);

    const loadReviews = async () => {
        try {
            const data = await ReviewService.getAll();
            setReviews(data);
        } catch (error) {
            console.error('Error loading reviews:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load reviews',
                life: 3000
            });
        }
    };

    const loadAccounts = async () => {
        try {
            const data = await AccountService.getAll();
            setAccounts(data);
        } catch (error) {
            console.error('Error loading accounts:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load accounts',
                life: 3000
            });
        }
    };

    const loadProducts = async () => {
        try {
            const data = await ProductService.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Error loading products:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load products',
                life: 3000
            });
        }
    };

    const openNew = () => {
        setReview({
            review_id: 0,
            product_id: 0,
            customer_id: 0,
            rating: 0,
            comment: '',
            liked: false,
            images: '',
            shop_reply: '',
            created_at: '',
            updated_at: ''
        });
        setSubmitted(false);
        setReviewDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setReviewDialog(false);
    };

    const hideDeleteReviewDialog = () => {
        setDeleteReviewDialog(false);
    };

    const saveReview = async () => {
        setSubmitted(true);

        if (review?.product_id && review?.customer_id && review?.rating > 0) {
            try {
                if (review.review_id) {
                    await ReviewService.update(review);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Review Updated Successfully',
                        life: 3000
                    });
                } else {
                    await ReviewService.create({
                        product_id: review.product_id,
                        customer_id: review.customer_id,
                        rating: review.rating,
                        comment: review.comment || '',
                        liked: review.liked || false,
                        images: review.images || '',
                        shop_reply: review.shop_reply || ''
                    });
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Review Created Successfully',
                        life: 3000
                    });
                }
                hideDialog();
                loadReviews();
            } catch (error) {
                console.error('Error saving review:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error instanceof Error ? error.message : 'Failed to save review',
                    life: 3000
                });
            }
        }
    };

    const editReview = (review: Review) => {
        setReview({ ...review });
        setReviewDialog(true);
    };

    const confirmDeleteReview = (review: Review) => {
        setReview(review);
        setDeleteReviewDialog(true);
    };

    const deleteReview = async () => {
        try {
            if (review?.review_id) {
                await ReviewService.delete(review.review_id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Review Deleted',
                    life: 3000
                });
                hideDeleteReviewDialog();
                loadReviews();
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete review',
                life: 3000
            });
        }
    };

    const reviewDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveReview} />
        </>
    );

    const deleteReviewDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteReviewDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteReview} />
        </>
    );

    const actionBodyTemplate = (rowData: Review) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editReview(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteReview(rowData)} />
            </>
        );
    };

    const accountBodyTemplate = (rowData: Review) => {
        const account = accounts.find(a => a.account_id === rowData.customer_id);
        return account ? account.user_name : rowData.customer_id;
    };

    const productBodyTemplate = (rowData: Review) => {
        const product = products.find(p => p.product_id === rowData.product_id);
        return product ? product.product_name : rowData.product_id;
    };

    const ratingBodyTemplate = (rowData: Review) => {
        return <Rating value={rowData.rating || 0} readOnly stars={5} cancel={false} />;
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />

                    <div className="flex justify-content-between mb-4">
                        <h5>Review Management</h5>
                        <Button label="New Review" icon="pi pi-plus" onClick={openNew} />
                    </div>

                    <DataTable
                        ref={dt}
                        value={reviews}
                        dataKey="review_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} reviews"
                        responsiveLayout="scroll"
                    >
                        <Column 
                            field="rowIndex" 
                            header="No." 
                            body={(_, { rowIndex }) => rowIndex + 1} 
                            style={{ minWidth: '4rem' }}
                        ></Column>
                        <Column field="product_id" header="Product" body={productBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="customer_id" header="User" body={accountBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="rating" header="Rating" body={ratingBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="comment" header="Comment" style={{ minWidth: '15rem' }}></Column>
                        <Column field="liked" header="Liked" body={(rowData) => rowData.liked ? 'Yes' : 'No'} style={{ minWidth: '8rem' }}></Column>
                        <Column field="shop_reply" header="Shop Reply" style={{ minWidth: '15rem' }}></Column>
                        {/* <Column field="created_at" header="Created At" sortable style={{ minWidth: '12rem' }}></Column> */}
                        {/* <Column field="updated_at" header="Updated At" sortable style={{ minWidth: '12rem' }}></Column> */}
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>

                    <Dialog
                        visible={reviewDialog}
                        style={{ width: '450px' }}
                        header={review?.review_id ? 'Edit Review' : 'New Review'}
                        modal
                        className="p-fluid"
                        footer={reviewDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="product">Product</label>
                            <Dropdown
                                id="product"
                                value={review?.product_id}
                                options={products}
                                onChange={(e) => setReview({ ...review!, product_id: e.value })}
                                optionLabel="product_name"
                                optionValue="product_id"
                                placeholder="Select a Product"
                                className={submitted && !review?.product_id ? 'p-invalid' : ''}
                            />
                            {submitted && !review?.product_id && <small className="p-error">Product is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="customer">User</label>
                            <Dropdown
                                id="customer"
                                value={review?.customer_id}
                                options={accounts}
                                onChange={(e) => setReview({ ...review!, customer_id: e.value })}
                                optionLabel="user_name"
                                optionValue="account_id"
                                placeholder="Select a User"
                                className={submitted && !review?.customer_id ? 'p-invalid' : ''}
                            />
                            {submitted && !review?.customer_id && <small className="p-error">User is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="rating">Rating</label>
                            <Rating
                                id="rating"
                                value={review?.rating || 0}
                                onChange={(e) => setReview({ ...review!, rating: e.value || 0 })}
                                stars={5}
                                cancel={false}
                                className={submitted && !review?.rating ? 'p-invalid' : ''}
                            />
                            {submitted && !review?.rating && <small className="p-error">Rating is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="comment">Comment</label>
                            <InputTextarea
                                id="comment"
                                value={review?.comment}
                                onChange={(e) => setReview({ ...review!, comment: e.target.value })}
                                rows={3}
                                cols={20}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="liked">Liked</label>
                            <div className="flex align-items-center">
                                <input
                                    type="checkbox"
                                    id="liked"
                                    checked={review?.liked || false}
                                    onChange={(e) => setReview({ ...review!, liked: e.target.checked })}
                                    className="mr-2"
                                />
                                <label htmlFor="liked" className="ml-2">Mark as liked</label>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="images">Images (comma-separated URLs)</label>
                            <InputTextarea
                                id="images"
                                value={review?.images}
                                onChange={(e) => setReview({ ...review!, images: e.target.value })}
                                rows={2}
                                cols={20}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="shop_reply">Shop Reply</label>
                            <InputTextarea
                                id="shop_reply"
                                value={review?.shop_reply}
                                onChange={(e) => setReview({ ...review!, shop_reply: e.target.value })}
                                rows={2}
                                cols={20}
                            />
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteReviewDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteReviewDialogFooter}
                        onHide={hideDeleteReviewDialog}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {review && <span>Are you sure you want to delete this review?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
} 