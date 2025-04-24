import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProblemComponent from '@/Components/ProblemComponent';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, problems, lesson }) => {

    const title = `${ lesson.name } Problems`

    let topMenu = (
        <TopMenu title={ title } lessonId={ lesson.id } show={['home', 'lesson']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={title} />
            <div className="flex flex-col text-sm">
                {problems.map ((r,k) => {
                    return (
                        <a href={`/problem/${ r.id }`} key={ r.id }>
                            <div className="py-2" key={ r.id }>
                                <ProblemComponent problem={ r } />
                            </div>
                        </a>
                    )
                })}
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
