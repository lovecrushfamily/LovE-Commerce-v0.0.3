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
import { OrderService, Order } from '@/app/api/order';
import { AccountService, Account } from '@/app/api/account';
import { CouponService, Coupon } from '@/app/api/coupon';

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [order, setOrder] = useState<Order | null>(null);
    const [orderDialog, setOrderDialog] = useState(false);
    const [deleteOrderDialog, setDeleteOrderDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DataTableValueArray>>(null);

    const statusOptions = [
        { label: 'Pending', value: 'pending' },
        { label: 'Delivery', value: 'delivery' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' }
    ];

    const paymentOptions = [
        { label: 'Credit Card', value: 'Credit Card' },
        { label: 'PayPal', value: 'PayPal' },
        { label: 'Bank Transfer', value: 'Bank Transfer' }
    ];

    useEffect(() => {
        loadOrders();
        loadAccounts();
        loadCoupons();
    }, []);

    const loadOrders = async () => {
        try {
            const data = await OrderService.getAll();
            setOrders(data);
        } catch (error) {
            console.error('Error loading orders:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load orders',
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

    const loadCoupons = async () => {
        try {
            const data = await CouponService.getAll();
            setCoupons(data);
        } catch (error) {
            console.error('Error loading coupons:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to load coupons',
                life: 3000
            });
        }
    };

    const openNew = () => {
        setOrder({
            order_id: 0,
            account_id: 0,
            total_amount: 0,
            status: 'pending',
            address: '',
            payment: '',
            coupon_id: 0
        });
        setSubmitted(false);
        setOrderDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setOrderDialog(false);
    };

    const hideDeleteOrderDialog = () => {
        setDeleteOrderDialog(false);
    };

    const saveOrder = async () => {
        setSubmitted(true);

        if (order?.account_id && order?.total_amount > 0) {
            try {
                if (order.order_id) {
                    const { created_at, updated_at, ...data } = order;
                    console.log(order);
                    await OrderService.update(data);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Order Updated Successfully',
                        life: 3000
                    });
                } else {
                    await OrderService.create({
                        account_id: order.account_id,
                        total_amount: order.total_amount,
                        status: order.status,
                        address: order.address,
                        payment: order.payment,
                        coupon_id: order.coupon_id
                    });
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Order Created Successfully',
                        life: 3000
                    });
                }
                hideDialog();
                loadOrders();
            } catch (error) {
                console.error('Error saving order:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: error instanceof Error ? error.message : 'Failed to save order',
                    life: 3000
                });
            }
        }
    };

    const editOrder = (order: Order) => {
        setOrder({ ...order });
        setOrderDialog(true);
    };

    const confirmDeleteOrder = (order: Order) => {
        setOrder(order);
        setDeleteOrderDialog(true);
    };

    const deleteOrder = async () => {
        try {
            if (order?.order_id) {
                await OrderService.delete(order.order_id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Order Deleted',
                    life: 3000
                });
                hideDeleteOrderDialog();
                loadOrders();
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete order',
                life: 3000
            });
        }
    };

    const orderDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveOrder} />
        </>
    );

    const deleteOrderDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteOrderDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteOrder} />
        </>
    );

    const actionBodyTemplate = (rowData: Order) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editOrder(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteOrder(rowData)} />
            </>
        );
    };

    const accountBodyTemplate = (rowData: Order) => {
        const account = accounts.find(a => a.account_id === rowData.account_id);
        return account?.user_name || 'Unknown';
    };

    const couponBodyTemplate = (rowData: Order) => {
        const coupon = coupons.find(c => c.coupon_id === rowData.coupon_id);
        return coupon?.coupon_name || 'None';
    };

    const amountBodyTemplate = (rowData: Order) => {
        const amount = Number(rowData.total_amount);
        return `$${amount.toFixed(2)}`;
    };

    const statusBodyTemplate = (rowData: Order) => {
        return <span className={`order-badge status-${rowData.status}`}>{rowData.status}</span>; 
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />

                    <div className="flex justify-content-between mb-4">
                        <h5>Order Management</h5>
                        <Button label="New Order" icon="pi pi-plus" onClick={openNew} />
                    </div>

                    <DataTable
                        ref={dt}
                        value={orders}
                        dataKey="order_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} orders"
                        responsiveLayout="scroll"
                    >
                        <Column 
                            field="rowIndex" 
                            header="No." 
                            body={(_, { rowIndex }) => rowIndex + 1} 
                            style={{ minWidth: '4rem' }}
                        ></Column>
                        <Column body={accountBodyTemplate} header="Account" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={amountBodyTemplate} header="Total Amount" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column body={statusBodyTemplate} header="Status" sortable style={{ minWidth: '8rem' }}></Column>
                        <Column field="payment" header="Payment Method" style={{ minWidth: '10rem' }}></Column>
                        <Column field="address" header="Address" style={{ minWidth: '15rem' }}></Column>
                        <Column body={couponBodyTemplate} header="Coupon" style={{ minWidth: '8rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>

                    <Dialog
                        visible={orderDialog}
                        style={{ width: '450px' }}
                        header={order?.order_id ? 'Edit Order' : 'New Order'}
                        modal
                        className="p-fluid"
                        footer={orderDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="account_id">Account</label>
                            <Dropdown
                                id="account_id"
                                value={order?.account_id}
                                options={accounts}
                                onChange={(e) => setOrder({ ...order!, account_id: e.value })}
                                optionLabel="user_name"
                                optionValue="account_id"
                                placeholder="Select an Account"
                                required
                                className={submitted && !order?.account_id ? 'p-invalid' : ''}
                            />
                            {submitted && !order?.account_id && <small className="p-error">Account is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="total_amount">Total Amount</label>
                            <InputNumber
                                id="total_amount"
                                value={order?.total_amount}
                                onValueChange={(e) => setOrder({ ...order!, total_amount: e.value || 0 })}
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                required
                                className={submitted && (!order?.total_amount || order.total_amount <= 0) ? 'p-invalid' : ''}
                            />
                            {submitted && (!order?.total_amount || order.total_amount <= 0) && <small className="p-error">Total amount is required and must be greater than 0.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="status">Status</label>
                            <Dropdown
                                id="status"
                                value={order?.status}
                                options={statusOptions}
                                onChange={(e) => setOrder({ ...order!, status: e.value })}
                                placeholder="Select Status"
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="payment">Payment Method</label>
                            <Dropdown
                                id="payment"
                                value={order?.payment}
                                options={paymentOptions}
                                onChange={(e) => setOrder({ ...order!, payment: e.value })}
                                placeholder="Select Payment Method"
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="address">Address</label>
                            <InputText
                                id="address"
                                value={order?.address}
                                onChange={(e) => setOrder({ ...order!, address: e.target.value })}
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="coupon_id">Coupon</label>
                            <Dropdown
                                id="coupon_id"
                                value={order?.coupon_id}
                                options={coupons}
                                onChange={(e) => setOrder({ ...order!, coupon_id: e.value })}
                                optionLabel="code"
                                optionValue="coupon_id"
                                placeholder="Select a Coupon"
                            />
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteOrderDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteOrderDialogFooter}
                        onHide={hideDeleteOrderDialog}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {order && (
                                <span>
                                    Are you sure you want to delete order <b>#{order.order_id}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
} 