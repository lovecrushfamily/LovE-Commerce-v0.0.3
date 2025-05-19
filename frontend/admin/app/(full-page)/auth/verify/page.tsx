/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';



const RegisterPage = () => {

	const [password, setPassword] = useState('');
	const [checked, setChecked] = useState(false);
	const { layoutConfig } = useContext(LayoutContext);

	const router = useRouter();
	const containerClassName = classNames('	surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

	return (
		// <div>Register page lovecrush</div>
		<div className={containerClassName}>
			<div className="flex flex-column align-items-center justify-content-center">
				{/* <img src={`/layout/images/crush.png`} alt="LovEcommerce logo" className="mb-5 w-6rem flex-shrink-0" /> */}
				<div
					style={{
						borderRadius: '56px',
						padding: '0.3rem',
						background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(214, 93, 231, 0) 30%)'
					}}
				>
					<div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
						<div className="text-center mb-5">
							<img src="/layout/images/crush.png" alt="Image" height="50" className="mb-3" />
							<div className="text-900 text-3xl font-medium mb-3">Verify OTP!</div>
							<span className="text-600 font-medium">Enter the opt sent to your email!</span>
						</div>
						
						<div>

							<InputText id="user" type="text" placeholder="OPT code" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

							<div className="flex align-items-center justify-content-between mb-0 gap-5">
								
				
							</div>
							<Button label="Verify" className="w-full p-3 text-xl" onClick={() => router.push('/api/')}></Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;