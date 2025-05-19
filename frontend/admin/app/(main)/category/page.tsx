'use client';

import { useState, useEffect, useRef } from 'react';
import { DataTable, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { CategoryService, Category } from '@/app/api/category';

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<DataTableValueArray>>(null);

    useEffect(() => {
        loadCategories();
    }, []);

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
        setCategory({
            category_id: 0,
            name: '',
            description: '',
            created_at: '',
            updated_at: ''
        });
        setSubmitted(false);
        setCategoryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCategoryDialog(false);
    };

    const hideDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
    };

    const saveCategory = async () => {
        setSubmitted(true);

        if (category?.name.trim()) {
            try {
                if (category.category_id) {
                    await CategoryService.update(category);
                } else {
                    await CategoryService.create({
                        name: category.name,
                        description: category.description
                    });
                }

                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: `Category ${category.category_id ? 'Updated' : 'Created'}`,
                    life: 3000
                });
                hideDialog();
                loadCategories();
            } catch (error) {
                console.error('Error saving category:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to save category',
                    life: 3000
                });
            }
        }
    };

    const editCategory = (category: Category) => {
        setCategory({ ...category });
        setCategoryDialog(true);
    };

    const confirmDeleteCategory = (category: Category) => {
        setCategory(category);
        setDeleteCategoryDialog(true);
    };

    const deleteCategory = async () => {
        try {
            if (category?.category_id) {
                await CategoryService.delete(category.category_id);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Category Deleted',
                    life: 3000
                });
                hideDeleteCategoryDialog();
                loadCategories();
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to delete category',
                life: 3000
            });
        }
    };

    const categoryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveCategory} />
        </>
    );

    const deleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteCategory} />
        </>
    );

    const actionBodyTemplate = (rowData: Category) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCategory(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCategory(rowData)} />
            </>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <ConfirmDialog />

                    <div className="flex justify-content-between mb-4">
                        <h5>Category Management</h5>
                        <Button label="New Category" icon="pi pi-plus" onClick={openNew} />
                    </div>

                    <DataTable
                        ref={dt}
                        value={categories}
                        dataKey="category_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
                        responsiveLayout="scroll"
                    >
                        <Column field="category_id" header="ID" sortable style={{ minWidth: '4rem' }}></Column>
                        <Column field="name" header="Name" sortable style={{ minWidth: '14rem' }}></Column>
                        <Column field="description" header="Description" style={{ minWidth: '20rem' }}></Column>
                        <Column field="created_at" header="Created At" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="updated_at" header="Updated At" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                    </DataTable>

                    <Dialog
                        visible={categoryDialog}
                        style={{ width: '450px' }}
                        header={category?.category_id ? 'Edit Category' : 'New Category'}
                        modal
                        className="p-fluid"
                        footer={categoryDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={category?.name}
                                onChange={(e) => setCategory({ ...category!, name: e.target.value })}
                                required
                                autoFocus
                                className={submitted && !category?.name ? 'p-invalid' : ''}
                            />
                            {submitted && !category?.name && <small className="p-error">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputText
                                id="description"
                                value={category?.description}
                                onChange={(e) => setCategory({ ...category!, description: e.target.value })}
                            />
                        </div>
                    </Dialog>

                    <Dialog
                        visible={deleteCategoryDialog}
                        style={{ width: '450px' }}
                        header="Confirm"
                        modal
                        footer={deleteCategoryDialogFooter}
                        onHide={hideDeleteCategoryDialog}
                    >
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {category && (
                                <span>
                                    Are you sure you want to delete <b>{category.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}