'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Rating } from 'primereact/rating';
import { FeedbackService, Feedback } from '@/app/api/feedback';
import { AccountService } from '@/app/api/account';

export default function FeedbackPage() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [feedback, setFeedback] = useState<Partial<Feedback>>({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadFeedbacks();
        loadAccounts();
    }, []);

    const loadFeedbacks = async () => {
        try {
            const data = await FeedbackService.getAll();
            setFeedbacks(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load feedbacks' });
        }
    };

    const loadAccounts = async () => {
        try {
            const data = await AccountService.getAll();
            setAccounts(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load accounts' });
        }
    };

    const openNew = () => {
        setFeedback({});
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialogVisible(false);
    };

    const saveFeedback = async () => {
        try {
            if (feedback.feedback_id) {
                console.log(feedback);
                await FeedbackService.update(feedback as Feedback);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Feedback updated' });
            } else {
                await FeedbackService.create(feedback as Omit<Feedback, 'feedback_id' | 'created_at' | 'updated_at'>); 
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Feedback created' });
            }
            hideDialog();
            loadFeedbacks();
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save feedback' });
        }
    };

    const editFeedback = (feedback: Feedback) => {
        setFeedback({ ...feedback });
        setDialogVisible(true);
    };

    const confirmDelete = (feedback: Feedback) => {
        setSelectedFeedback(feedback);
        setDeleteDialogVisible(true);
    };

    const deleteFeedback = async () => {
        if (!selectedFeedback) return;

        try {
            await FeedbackService.delete(selectedFeedback.feedback_id);
            hideDeleteDialog();
            loadFeedbacks();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Feedback deleted' });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete feedback' });
        }
    };

    const accountBodyTemplate = (rowData: Feedback) => {
        const account = accounts.find(a => a.account_id === rowData.account_id);
        return account ? account.user_name : rowData.account_id;
    };

    const ratingBodyTemplate = (rowData: Feedback) => {
        return <Rating value={rowData.rating} readOnly stars={5} cancel={false} />;
    };

    const actionBodyTemplate = (rowData: Feedback) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => editFeedback(rowData)} />
                <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    };

    const feedbackDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveFeedback} />
        </div>
    );

    const deleteDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteFeedback} />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between mb-4">
                <h1 className="text-2xl font-bold">Feedback Management</h1>
                <div className="flex justify-end pr-0">
                    <Button label="New Feedback" icon="pi pi-plus" onClick={openNew} />
                </div>
            </div>

            <DataTable value={feedbacks} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} feedbacks"
                className="p-datatable-sm">
                <Column 
                    field="rowIndex" 
                    header="No." 
                    body={(_, { rowIndex }) => rowIndex + 1} 
                    style={{ width: '5%' }}
                ></Column>
                {/* <Column field="feedback_id" header="Idx" style={{ width: '15%' }} /> */}
                <Column field="account_id" header="User" body={accountBodyTemplate} sortable style={{ width: '15%' }} />
                <Column field="rating" header="Rating" body={ratingBodyTemplate} sortable style={{ width: '10%' }} />
                <Column field="content" header="Content" style={{ width: '45%' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} />
            </DataTable>

            <Dialog visible={dialogVisible} style={{ width: '50vw' }} header="Feedback Details" modal className="p-fluid" footer={feedbackDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="account">User</label>
                    <Dropdown id="account" value={feedback.account_id} options={accounts} onChange={(e) => setFeedback({ ...feedback, account_id: e.value })}
                        optionLabel="user_name" optionValue="account_id" placeholder="Select a User" />
                </div>
                <div className="field">
                    <label htmlFor="rating">Rating</label>
                    <Rating id="rating" value={feedback.rating} onChange={(e) => setFeedback({ ...feedback, rating: e.value })} stars={5} cancel={false} />
                </div>
                <div className="field">
                    <label htmlFor="content">Content</label>
                    <InputTextarea id="content" value={feedback.content} onChange={(e) => setFeedback({ ...feedback, content: e.target.value })} rows={3} required />
                </div>
            </Dialog>

            <Dialog visible={deleteDialogVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedFeedback && (
                        <span>Are you sure you want to delete this feedback?</span>
                    )}
                </div>
            </Dialog>
        </div>
    );
} 