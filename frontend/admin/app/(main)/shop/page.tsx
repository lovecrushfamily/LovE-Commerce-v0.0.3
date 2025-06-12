'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { ShopService, Shop } from '@/app/api/shop';
import { AccountService } from '@/app/api/account';

export default function ShopPage() {
    const [shops, setShops] = useState<Shop[]>([]);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [shop, setShop] = useState<Partial<Shop>>({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
    const toast = useRef<Toast>(null);

    const statusOptions = [
        { label: 'Verified', value: 'pending' },
        { label: 'Verify', value: 'verify' },
        { label: 'Suspend', value: 'suspend' },
        { label: 'Banned', value: 'banned' },

        //   `status` ENUM('pending', 'verify', 'suspend', 'banned') NOT NULL DEFAULT 'pending',

    ];

    useEffect(() => {
        loadShops();
        loadAccounts();
    }, []);

    const loadShops = async () => {
        try {
            const data = await ShopService.getAll();
            setShops(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load shops' });
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
        setShop({});
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialogVisible(false);
    };

    const saveShop = async () => {
        try {
            if (shop.shop_id) {
                const { created_at, updated_at, ...newShop } = shop;
                await ShopService.update(newShop as Shop);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Shop updated' });
            } else {
                await ShopService.create(shop as Omit<Shop, 'shop_id' | 'created_at' | 'updated_at'>);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Shop created' });
            }
            hideDialog();
            loadShops();
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save shop' });
        }
    };

    const editShop = (shop: Shop) => {
        setShop({ ...shop });
        setDialogVisible(true);
    };

    const confirmDelete = (shop: Shop) => {
        setSelectedShop(shop);
        setDeleteDialogVisible(true);
    };

    const deleteShop = async () => {
        if (!selectedShop) return;

        try {
            await ShopService.delete(selectedShop.shop_id);
            hideDeleteDialog();
            loadShops();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Shop deleted' });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete shop' });
        }
    };

    const sellerBodyTemplate = (rowData: Shop) => {
        const account = accounts.find(a => a.seller_id === rowData.seller_id);
        return account ? account.user_name : rowData.seller_id;
    };

    const statusBodyTemplate = (rowData: Shop) => {
        return (
            <span className={`status-badge status-${rowData.status}`}>
                {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
            </span>
        );
    };

    const imageBodyTemplate = (rowData: Shop) => {
        return (
            <img src={rowData.image} alt="Shop" className="w-10 h-10 object-cover rounded" />
        );
    };

    const actionBodyTemplate = (rowData: Shop) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => editShop(rowData)} />
                <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    };

    const shopDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveShop} />
        </div>
    );

    const deleteDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteShop} />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between mb-4">
                <h1 className="text-2xl font-bold">Shop Management</h1>
                <div className="flex justify-end pr-0">
                    <Button label="New Shop" icon="pi pi-plus" onClick={openNew} />
                </div>
            </div>

            <DataTable value={shops} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} shops"
                className="p-datatable-sm">
                <Column 
                    field="rowIndex" 
                    header="No." 
                    body={(_, { rowIndex }) => rowIndex + 1} 
                    style={{ minWidth: '4rem' }}
                ></Column>
                <Column field="seller_id" header="Seller" body={sellerBodyTemplate} sortable style={{ width: '15%' }} />
                <Column field="shop_name" header="Name" sortable style={{ width: '15%' }} />
                <Column field="description" header="Description" style={{ width: '20%' }} />
                <Column field="image" header="Image" body={imageBodyTemplate} style={{ width: '10%' }} />
                <Column field="rating" header="Rating" sortable style={{ width: '10%' }} />
                <Column field="status" header="Status" body={statusBodyTemplate} sortable style={{ width: '10%' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} />
            </DataTable>

            <Dialog visible={dialogVisible} style={{ width: '50vw' }} header="Shop Details" modal className="p-fluid" footer={shopDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="account">Seller</label>
                    <Dropdown 
                        id="account" 
                        value={shop.seller_id} 
                        options={accounts} 
                        onChange={(e) => setShop({ ...shop, seller_id: e.value })}
                        optionLabel="user_name" 
                        optionValue="account_id" 
                        placeholder="Select a Seller" 
                    />
                </div>
                <div className="field">
                    <label htmlFor="shop_name">Name</label>
                    <InputText id="name" value={shop.shop_name} onChange={(e) => setShop({ ...shop, shop_name: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputText id="description" value={shop.description} onChange={(e) => setShop({ ...shop, description: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="image">Image URL</label>
                    <InputText id="image" value={shop.image} onChange={(e) => setShop({ ...shop, image: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="address">Address</label>
                    <InputText id="address" value={shop.address} onChange={(e) => setShop({ ...shop, address: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="phone_no">Phone</label>
                    <InputText id="phone_no" value={shop.phone_no} onChange={(e) => setShop({ ...shop, phone_no: e.target.value })} required />
                </div>
                <div className="field">
                    <label htmlFor="rating">Rating</label>
                    <InputText 
                        id="rating" 
                        type="number" 
                        step="0.1" 
                        value={shop.rating?.toString() || ''} 
                        onChange={(e) => setShop({ ...shop, rating: e.target.value ? parseFloat(e.target.value) : undefined })} 
                        required 
                    />
                </div>
                <div className="field">
                    <label htmlFor="status">Status</label>
                    <Dropdown id="status" value={shop.status} options={statusOptions} onChange={(e) => setShop({ ...shop, status: e.value })}
                        placeholder="Select a Status" />
                </div>
            </Dialog>

            <Dialog visible={deleteDialogVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedShop && (
                        <span>Are you sure you want to delete this shop?</span>
                    )}
                </div>
            </Dialog>
        </div>
    );
} 