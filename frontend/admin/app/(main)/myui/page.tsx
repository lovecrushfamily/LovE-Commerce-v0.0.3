'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IconService } from './../../../demo/service/IconService';
import { InputText } from 'primereact/inputtext';
import type { Demo } from '@/types';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

const MyUI = () => {
	//
	return (
		//
		
		<div className='grid'>
			<div className='col-12 md:col-4'>
				<div className='card p-fluid'>
					<h4>Lovecrush</h4>
					<div className='field'>
						<label htmlFor="name1">Name</label>
						<InputText id='name1' type='text'/>
					</div>
					<div className='field'>
						<label htmlFor="name1" className='p-sr-only'>Name</label>
						<InputText id='name1' type='text' placeholder='First name'/>
					</div>
					<Button label="Submit" ></Button>
				</div>
			</div>

			<div className='col-12 md:col-8'>
				<div className='card p-fluid'>
					<h4>Horizontal</h4>
					<div className='field col'>
						<label htmlFor="name2">Email</label>
						<InputText id="name2" type='text'/>
					</div>
				</div>
			</div>
		</div>
	);
	//
}


export default MyUI;