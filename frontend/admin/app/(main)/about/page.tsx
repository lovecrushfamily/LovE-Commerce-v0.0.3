'use client';

import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Timeline } from 'primereact/timeline';
import { Tag } from 'primereact/tag';
import { Image } from 'primereact/image';

export default function AboutPage() {
    const companyInfo = {
        name: 'Love Commerce',
        founded: '2024',
        mission: 'To revolutionize the e-commerce experience by providing a seamless, user-friendly platform that connects buyers and sellers in a secure and efficient marketplace.',
        vision: 'To become the leading e-commerce platform that empowers businesses and delights customers through innovative technology and exceptional service.'
    };

    const milestones = [
        { year: '2024', title: 'Platform Launch', description: 'Successfully launched our e-commerce platform with core features' },
        { year: '2024', title: 'Mobile App Release', description: 'Introduced our mobile application for iOS and Android' },
        { year: '2024', title: 'Market Expansion', description: 'Expanded our services to multiple regions' },
        { year: '2024', title: 'Partnership Program', description: 'Launched our seller partnership program' }
    ];

    const teamMembers = [
        {
            name: 'John Doe',
            role: 'CEO & Founder',
            image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
            description: 'Visionary leader with 10+ years of e-commerce experience'
        },
        {
            name: 'Jane Smith',
            role: 'CTO',
            image: 'https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png',
            description: 'Tech innovator specializing in scalable solutions'
        },
        {
            name: 'Mike Johnson',
            role: 'Head of Operations',
            image: 'https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png',
            description: 'Operations expert focused on customer satisfaction'
        }
    ];

    const customContent = (item: any) => {
        return (
            <div className="flex flex-column md:flex-row">
                <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: '3rem', height: '3rem' }}>
                    <i className="pi pi-calendar text-blue-500 text-xl"></i>
                </div>
                <div className="flex-1 md:ml-3">
                    <h4 className="mb-1">{item.title}</h4>
                    <p className="text-500 m-0">{item.description}</p>
                    <Tag value={item.year} className="mt-2" />
                </div>
            </div>
        );
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h1 className="text-4xl font-bold mb-4">About Us</h1>
                    
                    {/* Company Overview */}
                    <Card className="mb-4">
                        <div className="flex flex-column md:flex-row align-items-center">
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold mb-3">{companyInfo.name}</h2>
                                <p className="text-lg mb-3">Founded in {companyInfo.founded}</p>
                                <p className="text-700 mb-3">{companyInfo.mission}</p>
                                <p className="text-700">{companyInfo.vision}</p>
                            </div>
                            <div className="flex justify-content-center md:ml-4">
                                <Image 
                                    src="https://primefaces.org/cdn/primereact/images/galleria/galleria1.jpg" 
                                    alt="Company" 
                                    width="300" 
                                    preview 
                                />
                            </div>
                        </div>
                    </Card>

                    <Divider />

                    {/* Our Journey */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
                        <Timeline value={milestones} content={customContent} />
                    </div>

                    <Divider />

                    {/* Team Section */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-4">Our Leadership Team</h2>
                        <div className="grid">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="col-12 md:col-4">
                                    <Card className="h-full">
                                        <div className="flex flex-column align-items-center text-center">
                                            <Image 
                                                src={member.image} 
                                                alt={member.name} 
                                                width="150" 
                                                className="mb-3 border-circle" 
                                            />
                                            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                            <Tag value={member.role} className="mb-3" />
                                            <p className="text-700">{member.description}</p>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Divider />

                    {/* Values Section */}
                    <div className="mb-4">
                        <h2 className="text-2xl font-semibold mb-4">Our Core Values</h2>
                        <div className="grid">
                            <div className="col-12 md:col-4">
                                <Card className="h-full">
                                    <div className="flex flex-column align-items-center text-center">
                                        <i className="pi pi-heart text-4xl text-red-500 mb-3"></i>
                                        <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                                        <p className="text-700">We prioritize customer satisfaction in every decision we make.</p>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-12 md:col-4">
                                <Card className="h-full">
                                    <div className="flex flex-column align-items-center text-center">
                                        <i className="pi pi-shield text-4xl text-blue-500 mb-3"></i>
                                        <h3 className="text-xl font-semibold mb-2">Trust & Security</h3>
                                        <p className="text-700">We maintain the highest standards of security and trust.</p>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-12 md:col-4">
                                <Card className="h-full">
                                    <div className="flex flex-column align-items-center text-center">
                                        <i className="pi pi-bolt text-4xl text-yellow-500 mb-3"></i>
                                        <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                                        <p className="text-700">We continuously innovate to improve our platform.</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 