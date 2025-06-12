'use client';

import Image from 'next/image';

export default function AboutPage() {
    const companyInfo = {
        name: 'Love Commerce',
        founded: '2024',
        mission: 'To revolutionize the e-commerce experience by providing a seamless, user-friendly platform that connects buyers and sellers in a secure and efficient marketplace.',
        vision: 'To become the leading e-commerce platform that empowers businesses and delights customers through innovative technology and exceptional service.'
    };

    const stats = [
        { number: '1M+', label: 'Active Users' },
        { number: '50K+', label: 'Products' },
        { number: '100+', label: 'Countries' },
        { number: '24/7', label: 'Support' }
    ];

    const teamMembers = [
        {
            name: 'John Doe',
            role: 'CEO & Founder',
            image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
            description: 'Visionary leader with 10+ years of e-commerce experience',
            social: {
                linkedin: '#',
                twitter: '#',
                email: '#'
            }
        },
        {
            name: 'Jane Smith',
            role: 'CTO',
            image: 'https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png',
            description: 'Tech innovator specializing in scalable solutions',
            social: {
                linkedin: '#',
                twitter: '#',
                email: '#'
            }
        },
        {
            name: 'Mike Johnson',
            role: 'Head of Operations',
            image: 'https://primefaces.org/cdn/primereact/images/avatar/onyamalimba.png',
            description: 'Operations expert focused on customer satisfaction',
            social: {
                linkedin: '#',
                twitter: '#',
                email: '#'
            }
        }
    ];

    const values = [
        {
            title: 'Customer First',
            description: 'We prioritize customer satisfaction in every decision we make.'
        },
        {
            title: 'Trust & Security',
            description: 'We maintain the highest standards of security and trust.'
        },
        {
            title: 'Innovation',
            description: 'We continuously innovate to improve our platform.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">{companyInfo.name}</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto">{companyInfo.mission}</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                                <p className="text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission & Vision</h2>
                        <p className="text-lg text-gray-700 mb-8">{companyInfo.mission}</p>
                        <p className="text-lg text-gray-700">{companyInfo.vision}</p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Meet Our Leadership Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                                    <p className="text-blue-600 mb-4">{member.role}</p>
                                    <p className="text-gray-600 mb-4">{member.description}</p>
                                    <div className="flex justify-center space-x-4">
                                        <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <i className="pi pi-linkedin text-xl"></i>
                                        </a>
                                        <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                                            <i className="pi pi-twitter text-xl"></i>
                                        </a>
                                        <a href={member.social.email} className="text-gray-400 hover:text-red-600 transition-colors">
                                            <i className="pi pi-envelope text-xl"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Journey</h2>
                        <p className="text-xl mb-8 max-w-2xl mx-auto">
                            Be part of our mission to revolutionize e-commerce and create a better shopping experience for everyone.
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
