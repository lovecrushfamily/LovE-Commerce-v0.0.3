'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { format } from 'date-fns';
import { CouponService, Coupon } from '@/app/api/coupon';

export default function CouponPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [coupon, setCoupon] = useState<Partial<Coupon>>({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadCoupons();
    }, []);

    const loadCoupons = async () => {
        try {
            const data = await CouponService.getAll();
            setCoupons(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load coupons' });
        }
    };

    const openNew = () => {
        setCoupon({});
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialogVisible(false);
    };

    const saveCoupon = async () => {
        try {
            if (coupon.coupon_id) {
                const { created_at, updated_at, ...newCoupon } = coupon;
                console.log(newCoupon);
                await CouponService.update(newCoupon);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Coupon updated' });
            } else {
                // console.log(newCoupon);

                await CouponService.create(coupon as Omit<Coupon, 'coupon_id' | 'created_at' | 'updated_at'>);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Coupon created' });
            }
            hideDialog();
            loadCoupons();
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save coupon' });
        }
    };

    const editCoupon = (coupon: Coupon) => {
        setCoupon({ ...coupon });
        setDialogVisible(true);
    };

    const confirmDelete = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
        setDeleteDialogVisible(true);
    };

    const deleteCoupon = async () => {
        if (!selectedCoupon) return;

        try {
            await CouponService.delete(selectedCoupon.coupon_id);
            hideDeleteDialog();
            loadCoupons();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Coupon deleted' });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete coupon' });
        }
    };

    const discountBodyTemplate = (rowData: Coupon) => {
        return `${rowData.discount}%`;
    };

    const amountBodyTemplate = (rowData: Coupon) => {
        return `$${Number(rowData.min_amount).toFixed(2)} - $${Number(rowData.max_amount).toFixed(2)}`;
    };

    const dateBodyTemplate = (rowData: Coupon) => {
        return `${new Date(rowData.start_day).toLocaleDateString()} - ${new Date(rowData.end_day).toLocaleDateString()}`;
    };

    const imageBodyTemplate = (rowData: Coupon) => {
        return (
            <img src={rowData.image} alt={rowData.coupon_name} className="w-10 h-10 object-cover rounded" />
        );
    };

    const actionBodyTemplate = (rowData: Coupon) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => editCoupon(rowData)} />
                <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    };

    const couponDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCoupon} />
        </div>
    );

    const deleteDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCoupon} />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between mb-4">
                <h1 className="text-2xl font-bold">Coupon Management</h1>
                <div className="flex justify-end pr-0">
                    <Button label="New Coupon" icon="pi pi-plus" onClick={openNew} />
                </div>
            </div>

            <DataTable value={coupons} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} coupons"
                className="p-datatable-sm">
                <Column 
                            field="rowIndex" 
                            header="No." 
                            body={(_, { rowIndex }) => rowIndex + 1} 
                            style={{ minWidth: '4rem' }}
                        ></Column>
                <Column field="coupon_name" header="Name" sortable style={{ width: '15%' }} />
                <Column field="discount" header="Discount" body={discountBodyTemplate} sortable style={{ width: '10%' }} />
                <Column field="min_amount" header="Amount Range" body={amountBodyTemplate} sortable style={{ width: '15%' }} />
                <Column field="limit" header="Limit" sortable style={{ width: '10%' }} />
                <Column field="image" header="Image" body={imageBodyTemplate} style={{ width: '10%' }} />
                <Column field="start_day" header="Valid Period" body={dateBodyTemplate} sortable style={{ width: '20%' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} />
            </DataTable>

            <Dialog visible={dialogVisible} style={{ width: '50vw' }} header="Coupon Details" modal className="p-fluid" footer={couponDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="coupon_name">Coupon Name</label>
                    <InputText id="coupon_name" value={coupon.coupon_name} onChange={(e) => setCoupon({ ...coupon, coupon_name: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="discount">Discount (%)</label>
                    <InputNumber id="discount" value={coupon.discount} onValueChange={(e) => setCoupon({ ...coupon, discount: e.value || 0 })} min={0} max={100} />
                </div>
                <div className="field">
                    <label htmlFor="min_amount">Minimum Amount</label>
                    <InputNumber id="min_amount" value={coupon.min_amount} onValueChange={(e) => setCoupon({ ...coupon, min_amount: e.value || 0 })} mode="currency" currency="USD" locale="en-US" />
                </div>
                <div className="field">
                    <label htmlFor="max_amount">Maximum Amount</label>
                    <InputNumber id="max_amount" value={coupon.max_amount} onValueChange={(e) => setCoupon({ ...coupon, max_amount: e.value || 0 })} mode="currency" currency="USD" locale="en-US" />
                </div>
                <div className="field">
                    <label htmlFor="limit">Usage Limit</label>
                    <InputNumber id="limit" value={coupon.limit} onValueChange={(e) => setCoupon({ ...coupon, limit: e.value || 0 })} min={0} />
                </div>
                <div className="field">
                    <label htmlFor="image">Image URL</label>
                    <InputText id="image" value={coupon.image} onChange={(e) => setCoupon({ ...coupon, image: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="start_day">Start Date</label>
                    <Calendar
                    id="start_day"
                    value={coupon.start_day ? new Date(coupon.start_day) : null}
                    onChange={(e) =>
                        setCoupon({
                        ...coupon,
                        start_day: e.value ? format(e.value as Date, 'yyyy-MM-dd') : undefined,
                        })
                    }
                    dateFormat="yy-mm-dd"
                    />
                </div>
                <div className="field">
                    <label htmlFor="end_day">End Date</label>
                    <Calendar
                    id="end_day"
                    value={coupon.end_day ? new Date(coupon.end_day) : null}
                    onChange={(e) =>
                        setCoupon({
                        ...coupon,
                        end_day: e.value ? format(e.value as Date, 'yyyy-MM-dd') : undefined,
                        })
                    }
                    dateFormat="yy-mm-dd"
                    />
                </div>
            </Dialog>

            <Dialog visible={deleteDialogVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedCoupon && (
                        <span>Are you sure you want to delete this coupon?</span>
                    )}
                </div>
            </Dialog>
        </div>
    );
} 