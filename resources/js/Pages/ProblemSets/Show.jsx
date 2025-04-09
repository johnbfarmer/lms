import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, problems, lessonTitle }) => {
    const [data, setData] = useState(problems)

    const title = `${lessonTitle} Problems`

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <div className="flex">
                {data.map ((r,k) => {
                    return (
                        <a href={`/problem/${ r.id }`}>
                            <div className="py-12" key={ r.id }>
                                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                                        { k + 1 }
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
