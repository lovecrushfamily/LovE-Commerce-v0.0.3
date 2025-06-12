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
import { AccountService, Account } from '@/app/api/account';

export default function AccountPage() {
	const [accounts, setAccounts] = useState<Account[]>([]);
	const [account, setAccount] = useState<Account | null>(null);
	const [accountDialog, setAccountDialog] = useState(false);
	const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const toast = useRef<Toast>(null);
	const dt = useRef<DataTable<DataTableValueArray>>(null);

	const roleOptions = [
		{ label: 'Admin', value: 'admin' },
		{ label: 'User', value: 'user' },
		{ label: 'Manager', value: 'manager' }
	];

	const statusOptions = [
		{ label: 'Active', value: 'active' },
		{ label: 'Inactive', value: 'inactive' },
		{ label: 'Suspended', value: 'suspended' }
	];

	useEffect(() => {
		loadAccounts();
	}, []);

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

	const openNew = () => {
		setAccount({
			account_id: 0,
			user_name: '',
			email: '',
			password: '',
			role: 'user',
			status: 'active',
			created_at: '',
			updated_at: ''
		});
		setSubmitted(false);
		setAccountDialog(true);
	};

	const hideDialog = () => {
		setSubmitted(false);
		setAccountDialog(false);
	};

	const hideDeleteAccountDialog = () => {
		setDeleteAccountDialog(false);
	};

	const saveAccount = async () => {
		setSubmitted(true);

		if (account?.user_name.trim() && account?.email.trim()) {
			try {
				if (account.account_id) {
					await AccountService.update(account);
					toast.current?.show({
						severity: 'success',
						summary: 'Successful',
						detail: 'Account Updated Successfully',
						life: 3000
					});
				} else {
					await AccountService.create({
						user_name: account.user_name,
						email: account.email,
						password: account.password,
						role: account.role,
						status: account.status
					});
					toast.current?.show({
						severity: 'success',
						summary: 'Successful',
						detail: 'Account Created Successfully',
						life: 3000
					});
				}
				hideDialog();
				loadAccounts();
			} catch (error) {
				console.error('Error saving account:', error);
				toast.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: error instanceof Error ? error.message : 'Failed to save account',
					life: 3000
				});
			}
		}
	};

	const editAccount = (account: Account) => {
		setAccount({ ...account });
		setAccountDialog(true);
	};

	const confirmDeleteAccount = (account: Account) => {
		setAccount(account);
		setDeleteAccountDialog(true);
	};

	const deleteAccount = async () => {
		try {
			if (account?.account_id) {
				await AccountService.delete(account.account_id);
				toast.current?.show({
					severity: 'success',
					summary: 'Successful',
					detail: 'Account Deleted',
					life: 3000
				});
				hideDeleteAccountDialog();
				loadAccounts();
			}
		} catch (error) {
			console.error('Error deleting account:', error);
			toast.current?.show({
				severity: 'error',
				summary: 'Error',
				detail: 'Failed to delete account',
				life: 3000
			});
		}
	};

	const accountDialogFooter = (
		<>
			<Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
			<Button label="Save" icon="pi pi-check" onClick={saveAccount} />
		</>
	);

	const deleteAccountDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" outlined onClick={hideDeleteAccountDialog} />
			<Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteAccount} />
		</>
	);

	const actionBodyTemplate = (rowData: Account) => {
		return (
			<>
				<Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editAccount(rowData)} />
				<Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteAccount(rowData)} />
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
						<h5>Account Management</h5>
						<Button label="New Account" icon="pi pi-plus" onClick={openNew} />
					</div>

					<DataTable
						ref={dt}
						value={accounts}
						dataKey="account_id"
						paginator
						rows={10}
						rowsPerPageOptions={[5, 10, 25]}
						paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						currentPageReportTemplate="Showing {first} to {last} of {totalRecords} accounts"
						responsiveLayout="scroll"
					>
						<Column 
                            field="rowIndex" 
                            header="No." 
                            body={(_, { rowIndex }) => rowIndex + 1} 
                            style={{ minWidth: '4rem' }}
                        ></Column>
						<Column field="user_name" header="Username" sortable style={{ minWidth: '10rem' }}></Column>
						<Column field="email" header="Email" sortable style={{ minWidth: '15rem' }}></Column>
						<Column field="role" header="Role" sortable style={{ minWidth: '8rem' }}></Column>
						<Column field="status" header="Status" sortable style={{ minWidth: '8rem' }}></Column>
						<Column field="created_at" header="Created At" sortable style={{ minWidth: '12rem' }}></Column>
						<Column field="updated_at" header="Updated At" sortable style={{ minWidth: '12rem' }}></Column>
						<Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
					</DataTable>

					<Dialog
						visible={accountDialog}
						style={{ width: '450px' }}
						header={account?.account_id ? 'Edit Account' : 'New Account'}
						modal
						className="p-fluid"
						footer={accountDialogFooter}
						onHide={hideDialog}
					>
						<div className="field">
							<label htmlFor="user_name">Username</label>
							<InputText
								id="user_name"
								value={account?.user_name}
								onChange={(e) => setAccount({ ...account!, user_name: e.target.value })}
								required
								autoFocus
								className={submitted && !account?.user_name ? 'p-invalid' : ''}
							/>
							{submitted && !account?.user_name && <small className="p-error">Username is required.</small>}
						</div>
						<div className="field">
							<label htmlFor="email">Email</label>
							<InputText
								id="email"
								value={account?.email}
								onChange={(e) => setAccount({ ...account!, email: e.target.value })}
								required
								className={submitted && !account?.email ? 'p-invalid' : ''}
							/>
							{submitted && !account?.email && <small className="p-error">Email is required.</small>}
						</div>
						<div className="field">
							<label htmlFor="password">Password</label>
							<InputText
								id="password"
								type="password"
								value={account?.password}
								onChange={(e) => setAccount({ ...account!, password: e.target.value })}
								required={!account?.account_id}
								className={submitted && !account?.password && !account?.account_id ? 'p-invalid' : ''}
							/>
							{submitted && !account?.password && !account?.account_id && <small className="p-error">Password is required for new accounts.</small>}
						</div>
						<div className="field">
							<label htmlFor="role">Role</label>
							<Dropdown
								id="role"
								value={account?.role}
								options={roleOptions}
								onChange={(e) => setAccount({ ...account!, role: e.value })}
								placeholder="Select a Role"
							/>
						</div>
						<div className="field">
							<label htmlFor="status">Status</label>
							<Dropdown
								id="status"
								value={account?.status}
								options={statusOptions}
								onChange={(e) => setAccount({ ...account!, status: e.value })}
								placeholder="Select a Status"
							/>
						</div>
					</Dialog>

					<Dialog
						visible={deleteAccountDialog}
						style={{ width: '450px' }}
						header="Confirm"
						modal
						footer={deleteAccountDialogFooter}
						onHide={hideDeleteAccountDialog}
					>
						<div className="confirmation-content">
							<i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
							{account && (
								<span>
									Are you sure you want to delete <b>{account.user_name}</b>?
								</span>
							)}
						</div>
					</Dialog>
				</div>
			</div>
		</div>
	);
}