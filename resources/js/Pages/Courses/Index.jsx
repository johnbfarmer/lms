import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, reqData }) => {
    const [data, setData] = useState(reqData)

    const title = 'Courses'

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            {data.map ((r,k) => {
                return (
                    <div className="py-12" key={ r.id }>
                        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                <div className="flex">
                                    <div className="mx-1">
                                    <a href={`lesson-sets/${ r.id }`}>
                                        { r.name }
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Index;
