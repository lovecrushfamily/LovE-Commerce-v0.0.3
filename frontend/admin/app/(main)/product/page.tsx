/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService, Product } from '@/app/api/product';
import { ShopService } from '@/app/api/shop';
import { CategoryService } from '@/app/api/category';

const ProductPage = () => {
	const emptyProduct: Product = {
		product_name: '',
		description: '',
		traits: '',
		stock: 0,
		sale_off: 0,
		price: 0,
		images: '',
		status: 'pending',
		rating: 0,
		category_id: 0,
		shop_id: 0
	};

	const [products, setProducts] = useState<Product[]>([]);
	const [shops, setShops] = useState<any[]>([]);
	const [categories, setCategories] = useState<any[]>([]);
	const [product, setProduct] = useState<Product>(emptyProduct);
	const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
	const [productDialog, setProductDialog] = useState(false);
	const [deleteProductDialog, setDeleteProductDialog] = useState(false);
	const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [globalFilter, setGlobalFilter] = useState('');
	const [traitInputs, setTraitInputs] = useState<{ [key: string]: string }>({});
	const toast = useRef<Toast>(null);
	const dt = useRef<DataTable<any>>(null);
	const [exportDialog, setExportDialog] = useState(false);
	const [exportedFilePath, setExportedFilePath] = useState('');

	const statusOptions = [
		{ label: 'Pending', value: 'pending' },
		{ label: 'Sold Out', value: 'sold-out' }
	];

	useEffect(() => {
		loadProducts();
		loadShops();
		loadCategories();
	}, []);

	const loadProducts = async () => {
		try {
			const data = await ProductService.getAll();
			setProducts(data);
		} catch (error) {
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load products' });
		}
	};

	const loadShops = async () => {
		try {
			const data = await ShopService.getAll();
			setShops(data);
		} catch (error) {
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load shops' });
		}
	};

	const loadCategories = async () => {
		try {
			const data = await CategoryService.getAll();
			setCategories(data);
		} catch (error) {
			toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load categories' });
		}
	};

	const formatCurrency = (value: number) => {
		return value.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD'
		});
	};

	const openNew = () => {
		setProduct(emptyProduct);
		setSubmitted(false);
		setProductDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setProductDialog(false);
		setTraitInputs({});
	};

	const hideDeleteProductDialog = () => {
		setDeleteProductDialog(false);
	};

	const hideDeleteProductsDialog = () => {
		setDeleteProductsDialog(false);
	};

	const handleCategoryChange = (categoryId: number) => {
		const selectedCategory = categories.find(cat => cat.category_id === categoryId);
		if (selectedCategory) {
			const categoryTraits = selectedCategory.traits.split(',');
			const newTraitInputs: { [key: string]: string } = {};
			
			// If editing existing product, map existing traits
			if (product.product_id) {
				const productTraits = product.traits.split(',');
				categoryTraits.forEach((trait: string, index: number) => {
					newTraitInputs[trait.trim()] = productTraits[index]?.trim() || '';
				});
			} else {
				// For new product, initialize empty trait inputs
				categoryTraits.forEach((trait: string) => {
					newTraitInputs[trait.trim()] = '';
				});
			}
			
			setTraitInputs(newTraitInputs);
			setProduct({ ...product, category_id: categoryId });
		}
	};

	const handleTraitChange = (traitName: string, value: string) => {
		setTraitInputs(prev => ({
			...prev,
			[traitName]: value
		}));
	};

	const saveProduct = async () => {
		setSubmitted(true);

		if (product.product_name.trim()) {
			try {
				// Combine trait inputs into a single string
				const traitsString = Object.values(traitInputs).join(',');
				const productToSave = {
					...product,
					traits: traitsString
				};

				if (product.product_id) {
					const { created_at, updated_at, ...newProduct } = productToSave;
					await ProductService.update(newProduct as Product);
					toast.current?.show({
						severity: 'success',
						summary: 'Successful',
						detail: 'Product Updated',
						life: 3000
					});
				} else {
					await ProductService.create(productToSave);
					toast.current?.show({
						severity: 'success',
						summary: 'Successful',
						detail: 'Product Created',
						life: 3000
					});
				}
				hideDialog();
				loadProducts();
			} catch (error) {
				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: 'Failed to save product',
					life: 3000
				});
			}
		}
	};

	const editProduct = (product: Product) => {
		setProduct({ ...product });
		// Initialize trait inputs when editing
		const category = categories.find(cat => cat.category_id === product.category_id);
		if (category) {
			const categoryTraits = category.traits.split(',');
			const productTraits = product.traits.split(',');
			const newTraitInputs: { [key: string]: string } = {};
			categoryTraits.forEach((trait: string, index: number) => {
				newTraitInputs[trait.trim()] = productTraits[index]?.trim() || '';
			});
			setTraitInputs(newTraitInputs);
		}
		setProductDialog(true);
	};

	const confirmDeleteProduct = (product: Product) => {
		setProduct(product);
		setDeleteProductDialog(true);
	};

	const deleteProduct = async () => {
		try {
			if (product.product_id) {
				await ProductService.delete(product.product_id);
				setDeleteProductDialog(false);
				loadProducts();
				toast.current?.show({
					severity: 'success',
					summary: 'Successful',
					detail: 'Product Deleted',
					life: 3000
				});
			}
		} catch (error) {
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to delete product',
				life: 3000
			});
		}
	};

	const exportCSV = () => {
		const headers = [
			'No.',
			'Name',
			'Category',
			'Price',
			'Stock',
			'Sale Off',
			'Rating',
			'Status',
			'Description',
			'Traits',
			'Images'
		];

		const csvData = products.map((product, index) => {
			const category = categories.find(cat => cat.category_id === product.category_id);
			return {
				'No.': index + 1,
				'Name': product.product_name,
				'Category': category ? category.category_name : '',
				'Price': formatCurrency(product.price),
				'Stock': product.stock,
				'Sale Off': `${product.sale_off}%`,
				'Rating': product.rating,
				'Status': product.status.charAt(0).toUpperCase() + product.status.slice(1),
				'Description': product.description,
				'Traits': product.traits,
				'Images': product.images
			};
		});

		const csv = [
			headers.join(','),
			...csvData.map(row => 
				headers.map(header => {
					const value = row[header as keyof typeof row];
					return `"${String(value).replace(/"/g, '""')}"`;
				}).join(',')
			)
		].join('\n');

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const link = document.createElement('a');
		const url = URL.createObjectURL(blob);
		const fileName = `products_${new Date().toISOString().split('T')[0]}.csv`;
		const fullPath = `${window.location.hostname}/Downloads/${fileName}`;
		link.setAttribute('href', url);
		link.setAttribute('download', fileName);
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Show success dialog with full file path
		setExportedFilePath(fullPath);
		setExportDialog(true);
	};

	const hideExportDialog = () => {
		setExportDialog(false);
		setExportedFilePath('');
	};

	const exportDialogFooter = (
		<>
			<Button label="OK" icon="pi pi-check" text onClick={hideExportDialog} />
		</>
	);

	const confirmDeleteSelected = () => {
		setDeleteProductsDialog(true);
	};

	const deleteSelectedProducts = async () => {
		try {
			for (const product of selectedProducts) {
				if (product.product_id) {
					await ProductService.delete(product.product_id);
				}
			}
			setDeleteProductsDialog(false);
			setSelectedProducts([]);
			loadProducts();
			toast.current?.show({
				severity: 'success',
				summary: 'Successful',
				detail: 'Products Deleted',
				life: 3000
			});
		} catch (error) {
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to delete products',
				life: 3000
			});
		}
	};

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
		const val = (e.target && e.target.value) || '';
		setProduct({ ...product, [name]: val });
	};

	const onInputNumberChange = (value: number | null, name: string) => {
		if (value === null || value === undefined) {
			setProduct({ ...product, [name]: 0 });
		} else {
			setProduct({ ...product, [name]: value });
		}
	};

	const leftToolbarTemplate = () => {
		return (
			<React.Fragment>
				<div className="my-2">
					<Button label="New" icon="pi pi-plus" severity="success" className="mr-2" onClick={openNew} />
					<Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
				</div>
			</React.Fragment>
		);
	};

	const rightToolbarTemplate = () => {
		return (
			<React.Fragment>
				<FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
				<Button 
					label="Export" 
					icon="pi pi-upload" 
					severity="help" 
					onClick={exportCSV}
					tooltip="Export to CSV"
					tooltipOptions={{ position: 'bottom' }}
				/>
			</React.Fragment>
		);
	};

	const imageBodyTemplate = (rowData: Product) => {
		const images = rowData.images.split(',');
		return (
			<div className="flex align-items-center justify-content-center">
				<img 
					src={images[0]} 
					alt={rowData.product_name} 
					className="w-8 h-8 object-cover rounded" 
					style={{ width: '32px', height: '32px' }}
				/>
			</div>
		);
	};

	const priceBodyTemplate = (rowData: Product) => {
		return formatCurrency(rowData.price);
	};

	const statusBodyTemplate = (rowData: Product) => {
		return (
			<span className={`product-badge status-${rowData.status}`}>
				{rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
			</span>
		);
	};

	const categoryBodyTemplate = (rowData: Product) => {
		const category = categories.find(cat => cat.category_id === rowData.category_id);
		return category ? category.category_name : '';
	};

	const actionBodyTemplate = (rowData: Product) => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editProduct(rowData)} />
				<Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteProduct(rowData)} />
			</>
		);
	};

	const header = (
		<div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
			<h5 className="m-0">Manage Products</h5>
			<span className="block mt-2 md:mt-0 p-input-icon-left">
				<i className="pi pi-search" />
				<InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
			</span>
		</div>
	);

	const productDialogFooter = (
		<>
			<Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
		</>
	);

	const deleteProductDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
			<Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
		</>
	);

	const deleteProductsDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
			<Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
		</>
	);

	return (
		<div className="grid crud-demo">
			<div className="col-12">
				<div className="card">
					<Toast ref={toast} />
					<Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

					<DataTable
						ref={dt}
						value={products}
						selection={selectedProducts}
						onSelectionChange={(e) => setSelectedProducts(e.value)}
						dataKey="product_id"
						paginator
						rows={10}
						rowsPerPageOptions={[5, 10, 25]}
						className="datatable-responsive"
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
						globalFilter={globalFilter}
						emptyMessage="No products found."
						header={header}
						responsiveLayout="scroll"
					>
						<Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
						<Column 
							field="rowIndex" 
							header="No." 
							body={(_, { rowIndex }) => rowIndex + 1} 
							style={{ minWidth: '4rem' }}
						></Column>
						<Column field="product_name" header="Name" sortable style={{ minWidth: '14rem' }}></Column>
						<Column 
							header="Image" 
							body={imageBodyTemplate} 
							style={{ width: '5%', textAlign: 'center' }}
						></Column>
						<Column field="price" header="Price" body={priceBodyTemplate} sortable></Column>
						<Column field="stock" header="Stock" sortable></Column>
						<Column field="sale_off" header="Sale Off" sortable></Column>
						<Column field="rating" header="Rating" sortable></Column>
						<Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
						<Column 
							field="category_id" 
							header="Category" 
							body={categoryBodyTemplate} 
							sortable 
							style={{ minWidth: '10rem' }}
						></Column>
						<Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
					</DataTable>

					<Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
						<div className="field">
							<label htmlFor="product_name">Name</label>
							<InputText
								id="product_name"
								value={product.product_name}
								onChange={(e) => onInputChange(e, 'product_name')}
								required
								autoFocus
								className={classNames({ 'p-invalid': submitted && !product.product_name })}
							/>
							{submitted && !product.product_name && <small className="p-invalid">Name is required.</small>}
						</div>

						<div className="field">
							<label htmlFor="description">Description</label>
							<InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
						</div>

						<div className="field">
							<label htmlFor="category_id">Category</label>
							<Dropdown
								id="category_id"
								value={product.category_id}
								options={categories}
								onChange={(e) => handleCategoryChange(e.value)}
								optionLabel="category_name"
								optionValue="category_id"
								placeholder="Select a Category"
							/>
						</div>

						{Object.keys(traitInputs).length > 0 && (
							<div className="field">
								<label>Traits</label>
								{Object.entries(traitInputs).map(([traitName, value]) => (
									<div key={traitName} className="mb-2">
										<label htmlFor={`trait-${traitName}`} className="block mb-1">
											{traitName}
										</label>
										<InputText
											id={`trait-${traitName}`}
											value={value}
											onChange={(e) => handleTraitChange(traitName, e.target.value)}
											className="w-full"
										/>
									</div>
								))}
							</div>
						)}

						<div className="formgrid grid">
							<div className="field col">
								<label htmlFor="price">Price</label>
								<InputNumber 
									id="price" 
									value={product.price} 
									onValueChange={(e) => onInputNumberChange(e.value ?? null, 'price')} 
									mode="currency" 
									currency="USD" 
									locale="en-US" 
								/>
							</div>
							<div className="field col">
								<label htmlFor="stock">Stock</label>
								<InputNumber 
									id="stock" 
									value={product.stock} 
									onValueChange={(e) => onInputNumberChange(e.value ?? null, 'stock')} 
								/>
							</div>
						</div>

						<div className="formgrid grid">
							<div className="field col">
								<label htmlFor="sale_off">Sale Off (%)</label>
								<InputNumber 
									id="sale_off" 
									value={product.sale_off} 
									onValueChange={(e) => onInputNumberChange(e.value ?? null, 'sale_off')} 
									minFractionDigits={2} 
									maxFractionDigits={2} 
								/>
							</div>
							<div className="field col">
								<label htmlFor="rating">Rating</label>
								<InputNumber 
									id="rating" 
									value={product.rating} 
									onValueChange={(e) => onInputNumberChange(e.value ?? null, 'rating')} 
									minFractionDigits={1} 
									maxFractionDigits={1} 
								/>
							</div>
						</div>

						<div className="field">
							<label htmlFor="images">Images (comma-separated URLs)</label>
							<InputText id="images" value={product.images} onChange={(e) => onInputChange(e, 'images')} required />
						</div>

						<div className="field">
							<label htmlFor="shop_id">Shop</label>
							<Dropdown
								id="shop_id"
								value={product.shop_id}
								options={shops}
								onChange={(e) => setProduct({ ...product, shop_id: e.value })}
								optionLabel="shop_name"
								optionValue="shop_id"
								placeholder="Select a Shop"
							/>
						</div>

						<div className="field">
							<label htmlFor="status">Status</label>
							<Dropdown
								id="status"
								value={product.status}
								options={statusOptions}
								onChange={(e) => setProduct({ ...product, status: e.value })}
								placeholder="Select a Status"
							/>
						</div>
					</Dialog>

					<Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{product && (
								<span>
									Are you sure you want to delete <b>{product.product_name}</b>?
								</span>
							)}
						</div>
					</Dialog>

					<Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{product && <span>Are you sure you want to delete the selected products?</span>}
						</div>
					</Dialog>

					<Dialog 
						visible={exportDialog} 
						style={{ width: '500px' }} 
						header="Export Successful" 
						modal 
						footer={exportDialogFooter} 
						onHide={hideExportDialog}
					>
						<div className="flex align-items-center justify-content-center">
							<i className="pi pi-check-circle mr-3" style={{ fontSize: '2rem', color: 'var(--green-500)' }} />
							<div>
								<p className="m-0">File has been exported successfully!</p>
								<p className="m-0 mt-2">
									<strong>Saved to:</strong>
								</p>
								<p className="m-0 mt-1 text-sm" style={{ wordBreak: 'break-all' }}>
									{exportedFilePath}
								</p>
							</div>
						</div>
					</Dialog>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;

