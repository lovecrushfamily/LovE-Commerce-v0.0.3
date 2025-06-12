'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { CustomerService, Customer } from '@/app/api/customer';

export default function CustomerPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [customerDialog, setCustomerDialog] = useState(false);
    const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DataTableValueArray>>(null);

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ];

    const nationalityOptions = [
        { label: 'United States', value: 'US' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'Canada', value: 'CA' },
        { label: 'Australia', value: 'AU' }
    ];

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const data = await CustomerService.getAll();
            setCustomers(data);
        } catch (error) {
            console.error('Error loading customers:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load customers',
                life: 3000
            });
        }
    };

    const openNew = () => {
        setCustomer({
            customer_id: 0,
            customer_name: '',
            gender: 'male',
            phone: '',
            avatar: '',
            date_of_birth: '',
            nationality: 'US',
            address: ''
        });
        setSubmitted(false);
        setCustomerDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCustomerDialog(false);
    };

    const hideDeleteCustomerDialog = () => {
        setDeleteCustomerDialog(false);
    };

    const saveCustomer = async () => {
        setSubmitted(true);

        if (customer?.customer_name.trim() && customer?.phone.trim()) {
            try {
                if (customer.customer_id) {
                    await CustomerService.update(customer);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Customer Updated Successfully',
                        life: 3000
                    });
                } else {
                    await CustomerService.create({
                        customer_id: 0,
                        customer_name: customer.customer_name,
                        gender: customer.gender,
                        phone: customer.phone,
                        avatar: customer.avatar,
                        date_of_birth: customer.date_of_birth,
                        nationality: customer.nationality,
                        address: customer.address
                    });
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Customer Created Successfully',
                        life: 3000
                    });
                }
                hideDialog();
                loadCustomers();
            } catch (error) {
                console.error('Error saving customer:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error instanceof Error ? error.message : 'Failed to save customer',
                    life: 3000
                });
            }
        }
    };

    const editCustomer = (customer: Customer) => {
        setCustomer({ ...customer });
        setCustomerDialog(true);
    };

    const confirmDeleteCustomer = (customer: Customer) => {
        setCustomer(customer);
        setDeleteCustomerDialog(true);
    };

    const deleteCustomer = async () => {
        try {
            if (customer?.customer_id) {
                await CustomerService.delete(customer.customer_id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Customer Deleted',
                    life: 3000
                });
                hideDeleteCustomerDialog();
                loadCustomers();
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete customer',
                life: 3000
            });
        }
    };

    const customerDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCustomer} />
        </>
    );

    const deleteCustomerDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCustomerDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCustomer} />
        </>
    );

    const actionBodyTemplate = (rowData: Customer) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCustomer(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCustomer(rowData)} />
            </>
        );
    };

    const imageBodyTemplate = (rowData: Customer) => {
        return (
            <img 
                src={rowData.avatar || 'https://via.placeholder.com/50'} 
                alt={rowData.customer_name} 
                className="w-3rem h-3rem rounded-circle"
            />
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />

                    <div className="flex justify-content-between mb-4">
                        <h5>Customer Management</h5>
                        <Button label="New Customer" icon="pi pi-plus" onClick={openNew} />
                    </div>

                    <DataTable
                        ref={dt}
                        value={customers}
                        dataKey="customer_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} customers"
                        responsiveLayout="scroll"
                    >
                        <Column 
                            field="rowIndex" 
                            header="No." 
                            body={(_, { rowIndex }) => rowIndex + 1} 
                            style={{ minWidth: '4rem' }}
                        ></Column>
                        <Column body={imageBodyTemplate} header="Avatar" style={{ minWidth: '6rem' }}></Column>
                        <Column field="customer_name" header="Name" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="gender" header="Gender" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="phone" header="Phone" style={{ minWidth: '10rem' }}></Column>
                        <Column field="nationality" header="Nationality" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="address" header="Address" style={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>

                    <Dialog
                        visible={customerDialog}
                        style={{ width: '450px' }}
                        header={customer?.customer_id ? 'Edit Customer' : 'New Customer'}
                        modal
                        className="p-fluid"
                        footer={customerDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="customer_name">Name</label>
                            <InputText
                                id="customer_name"
                                value={customer?.customer_name}
                                onChange={(e) => setCustomer({ ...customer!, customer_name: e.target.value })}
                                required
                                autoFocus
                                className={submitted && !customer?.customer_name ? 'p-invalid' : ''}
                            />
                            {submitted && !customer?.customer_name && <small className="p-error">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="gender">Gender</label>
                            <Dropdown
                                id="gender"
                                value={customer?.gender}
                                options={genderOptions}
                                onChange={(e) => setCustomer({ ...customer!, gender: e.value })}
                                placeholder="Select a Gender"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="phone">Phone</label>
                            <InputText
                                id="phone"
                                value={customer?.phone}
                                onChange={(e) => setCustomer({ ...customer!, phone: e.target.value })}
                                required
                                className={submitted && !customer?.phone ? 'p-invalid' : ''}
                            />
                            {submitted && !customer?.phone && <small className="p-error">Phone is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="avatar">Avatar URL</label>
                            <InputText
                                id="avatar"
                                value={customer?.avatar}
                                onChange={(e) => setCustomer({ ...customer!, avatar: e.target.value })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="date_of_birth">Date of Birth</label>
                            <Calendar
                                id="date_of_birth"
                                value={customer?.date_of_birth ? new Date(customer.date_of_birth) : null}
                                onChange={(e) => setCustomer({ ...customer!, date_of_birth: e.value?.toISOString().split('T')[0] || '' })}
                                dateFormat="yy-mm-dd"
                                showIcon
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="nationality">Nationality</label>
                            <Dropdown
                                id="nationality"
                                value={customer?.nationality}
                                options={nationalityOptions}
                                onChange={(e) => setCustomer({ ...customer!, nationality: e.value })}
                                placeholder="Select a Nationality"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="address">Address</label>
                            <InputText
                                id="address"
                                value={customer?.address}
                                onChange={(e) => setCustomer({ ...customer!, address: e.target.value })}
                            />
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteCustomerDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteCustomerDialogFooter}
                        onHide={hideDeleteCustomerDialog}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {customer && (
                                <span>
                                    Are you sure you want to delete <b>{customer.customer_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
