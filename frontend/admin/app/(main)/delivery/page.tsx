'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { DeliveryService, Delivery } from '@/app/api/delivery';
import { CategoryService, Category } from '@/app/api/category';

export default function DeliveryPage() {
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [delivery, setDelivery] = useState<Delivery | null>(null);
    const [deliveryDialog, setDeliveryDialog] = useState(false);
    const [deleteDeliveryDialog, setDeleteDeliveryDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DataTableValueArray>>(null);

    useEffect(() => {
        loadDeliveries();
        loadCategories();
    }, []);

    const loadDeliveries = async () => {
        try {
            const data = await DeliveryService.getAll();
            setDeliveries(data);
        } catch (error) {
            console.error('Error loading deliveries:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load deliveries',
                life: 3000
            });
        }
    };

    const loadCategories = async () => {
        try {
            const data = await CategoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load categories',
                life: 3000
            });
        }
    };

    const openNew = () => {
        setDelivery({
            delivery_id: 0,
            name: '',
            cost: 0,
            category_id: 0,
            description: ''
        });
        setSubmitted(false);
        setDeliveryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDeliveryDialog(false);
    };

    const hideDeleteDeliveryDialog = () => {
        setDeleteDeliveryDialog(false);
    };

    const saveDelivery = async () => {
        setSubmitted(true);

        if (delivery?.name.trim() && delivery?.cost > 0 && delivery?.category_id > 0) {
            try {
                if (delivery.delivery_id) {
                    const { created_at, updated_at, ...updated_data } = delivery;
                    console.log(updated_data);
                    await DeliveryService.update(updated_data);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Delivery Updated Successfully',
                        life: 3000
                    });
                } else {
                    await DeliveryService.create({
                        name: delivery.name,
                        cost: delivery.cost,
                        category_id: delivery.category_id,
                        description: delivery.description
                    });
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Delivery Created Successfully',
                        life: 3000
                    });
                }
                hideDialog();
                loadDeliveries();
            } catch (error) {
                console.error('Error saving delivery:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error instanceof Error ? error.message : 'Failed to save delivery',
                    life: 3000
                });
            }
        }
    };

    const editDelivery = (delivery: Delivery) => {
        setDelivery({ ...delivery });
        setDeliveryDialog(true);
    };

    const confirmDeleteDelivery = (delivery: Delivery) => {
        setDelivery(delivery);
        setDeleteDeliveryDialog(true);
    };

    const deleteDelivery = async () => {
        try {
            if (delivery?.delivery_id) {
                await DeliveryService.delete(delivery.delivery_id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Delivery Deleted',
                    life: 3000
                });
                hideDeleteDeliveryDialog();
                loadDeliveries();
            }
        } catch (error) {
            console.error('Error deleting delivery:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete delivery',
                life: 3000
            });
        }
    };

    const deliveryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveDelivery} />
        </>
    );

    const deleteDeliveryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDeliveryDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteDelivery} />
        </>
    );

    const actionBodyTemplate = (rowData: Delivery) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDelivery(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDelivery(rowData)} />
            </>
        );
    };

    const categoryBodyTemplate = (rowData: Delivery) => {
        const category = categories.find(c => c.category_id === rowData.category_id);
        return category?.category_name || 'Unknown';
    };

    const costBodyTemplate = (rowData: Delivery) => {
        const cost = Number(rowData.cost);
        return `$${cost.toFixed(2)}`;
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />

                    <div className="flex justify-content-between mb-4">
                        <h5>Delivery Management</h5>
                        <Button label="New Delivery" icon="pi pi-plus" onClick={openNew} />
                    </div>

                    <DataTable
                        ref={dt}
                        value={deliveries}
                        dataKey="delivery_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} deliveries"
                        responsiveLayout="scroll"
                    >
                        <Column 
                            field="rowIndex" 
                            header="No." 
                            body={(_, { rowIndex }) => rowIndex + 1} 
                            style={{ minWidth: '4rem' }}
                        ></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={costBodyTemplate} header="Cost" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column body={categoryBodyTemplate} header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                        <Column field="description" header="Description" style={{ minWidth: '20rem' }}></Column>
                        <Column field="created_at" header="Created At" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="updated_at" header="Updated At" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>

                    <Dialog
                        visible={deliveryDialog}
                        style={{ width: '450px' }}
                        header={delivery?.delivery_id ? 'Edit Delivery' : 'New Delivery'}
                        modal
                        className="p-fluid"
                        footer={deliveryDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={delivery?.name}
                                onChange={(e) => setDelivery({ ...delivery!, name: e.target.value })}
                                required
                                autoFocus
                                className={submitted && !delivery?.name ? 'p-invalid' : ''}
                            />
                            {submitted && !delivery?.name && <small className="p-error">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="cost">Cost</label>
                            <InputNumber
                                id="cost"
                                value={delivery?.cost}
                                onValueChange={(e) => setDelivery({ ...delivery!, cost: e.value || 0 })}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                required
                                className={submitted && (!delivery?.cost || delivery.cost <= 0) ? 'p-invalid' : ''}
                            />
                            {submitted && (!delivery?.cost || delivery.cost <= 0) && <small className="p-error">Cost is required and must be greater than 0.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="category_id">Category</label>
                            <Dropdown
                                id="category_id"
                                value={delivery?.category_id}
                                options={categories}
                                onChange={(e) => setDelivery({ ...delivery!, category_id: e.value })}
                                optionLabel="category_name"
                                optionValue="category_id"
                                placeholder="Select a Category"
                                required
                                className={submitted && !delivery?.category_id ? 'p-invalid' : ''}
                            />
                            {submitted && !delivery?.category_id && <small className="p-error">Category is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputText
                                id="description"
                                value={delivery?.description}
                                onChange={(e) => setDelivery({ ...delivery!, description: e.target.value })}
                            />
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteDeliveryDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteDeliveryDialogFooter}
                        onHide={hideDeleteDeliveryDialog}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {delivery && (
                                <span>
                                    Are you sure you want to delete <b>{delivery.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
