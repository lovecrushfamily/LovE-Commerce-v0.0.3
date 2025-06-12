'use client';

import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { ItemService, Item } from '@/app/api/item';
import { OrderService } from '@/app/api/order';
import { ProductService } from '@/app/api/product';

export default function ItemPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [item, setItem] = useState<Partial<Item>>({});
    const [dialogVisible, setDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const toast = useRef<Toast>(null);

    useEffect(() => {
        loadItems();
        loadOrders();
        loadProducts();
    }, []);

    const loadItems = async () => {
        try {
            const data = await ItemService.getAll();
            setItems(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load items' });
        }
    };

    const loadOrders = async () => {
        try {
            const data = await OrderService.getAll();
            setOrders(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load orders' });
        }
    };

    const loadProducts = async () => {
        try {
            const data = await ProductService.getAll();
            setProducts(data);
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load products' });
        }
    };

    const openNew = () => {
        setItem({});
        setDialogVisible(true);
    };

    const hideDialog = () => {
        setDialogVisible(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialogVisible(false);
    };

    const saveItem = async () => {
        try {
            if (item.item_id) {
                console.log
                await ItemService.update(item as Item);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Item updated' });
            } else {
                await ItemService.create(item as Omit<Item, 'item_id' | 'created_at' | 'updated_at'>);
                toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Item created' });
            }
            hideDialog();
            loadItems();
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to save item' });
        }
    };

    const editItem = (item: Item) => {
        setItem({ ...item });
        setDialogVisible(true);
    };

    const confirmDelete = (item: Item) => {
        setSelectedItem(item);
        setDeleteDialogVisible(true);
    };

    const deleteItem = async () => {
        if (!selectedItem) return;

        try {
            await ItemService.delete(selectedItem.item_id);
            hideDeleteDialog();
            loadItems();
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Item deleted' });
        } catch (error) {
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete item' });
        }
    };

    const orderBodyTemplate = (rowData: Item) => {
        const order = orders.find(o => o.order_id === rowData.order_id);
        return order ? `Order #${order.order_id}` : rowData.order_id;
    };

    const productBodyTemplate = (rowData: Item) => {
        const product = products.find(p => p.product_id === rowData.product_id);
        return product ? product.name : rowData.product_id;
    };

    const priceBodyTemplate = (rowData: Item) => {
        return `$${Number(rowData.price).toFixed(2)}`;
    };

    const actionBodyTemplate = (rowData: Item) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" rounded text severity="info" onClick={() => editItem(rowData)} />
                <Button icon="pi pi-trash" rounded text severity="danger" onClick={() => confirmDelete(rowData)} />
            </div>
        );
    };

    const itemDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveItem} />
        </div>
    );

    const deleteDialogFooter = (
        <div className="flex justify-end gap-2">
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteItem} />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <div className="flex justify-content-between mb-4">
                <h1 className="text-2xl font-bold">Item Management</h1>
                <div className="flex justify-end pr-0">
                    <Button label="New Item" icon="pi pi-plus" onClick={openNew} />
                </div>
            </div>

            <DataTable value={items} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
                className="p-datatable-sm">
                <Column 
                    field="rowIndex" 
                    header="No." 
                    body={(_, { rowIndex }) => rowIndex + 1} 
                    style={{ minWidth: '2rem' }}
                ></Column>
                <Column field="order_id" header="Order" body={orderBodyTemplate} sortable style={{ width: '40%' }} />
                <Column field="product_id" header="Product" body={productBodyTemplate} sortable style={{ width: '20%' }} />
                <Column field="quantity" header="Quantity" sortable style={{ width: '10%' }} />
                <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ width: '10%' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ width: '10%' }} />
            </DataTable>

            <Dialog visible={dialogVisible} style={{ width: '50vw' }} header="Item Details" modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="order">Order</label>
                    <Dropdown id="order" value={item.order_id} options={orders} onChange={(e) => setItem({ ...item, order_id: e.value })}
                        optionLabel="order_id" optionValue="order_id" placeholder="Select an Order" />
                </div>
                <div className="field">
                    <label htmlFor="product">Product</label>
                    <Dropdown id="product" value={item.product_id} options={products} onChange={(e) => setItem({ ...item, product_id: e.value })}
                        optionLabel="name" optionValue="product_id" placeholder="Select a Product" />
                </div>
                <div className="field">
                    <label htmlFor="quantity">Quantity</label>
                    <InputNumber id="quantity" value={item.quantity} onValueChange={(e) => setItem({ ...item, quantity: e.value || 0 })} min={1} />
                </div>
                <div className="field">
                    <label htmlFor="price">Price</label>
                    <InputNumber id="price" value={item.price} onValueChange={(e) => setItem({ ...item, price: e.value || 0 })} mode="currency" currency="USD" locale="en-US" />
                </div>
            </Dialog>

            <Dialog visible={deleteDialogVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedItem && (
                        <span>Are you sure you want to delete this item?</span>
                    )}
                </div>
            </Dialog>
        </div>
    );
} 