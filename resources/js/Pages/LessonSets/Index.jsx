import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StudentProgress from '@/Components/StudentProgress';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, lessonSets, course, progress }) => {
    const title = `${course.name}`
    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            <div className="max-w-7xl space-y-6 sm:px-6 lg:px-8 text-lg pt-8 pb-4">Chapters</div>
            {lessonSets.map ((r,k) => {
                let prog = progress[r.id] || { is_premium: 1, pct_done: 0 }
                return (
                    <div className="flex">
                        <div key={ r.id } className="mmax-w-7xl space-y-6 py-4 sm:pl-10 lg:pl-12">
                            <a href={`/lesson-set/${ r.id }`}>
                                { r.name }
                            </a>
                        </div>
                        <div className="py-4">
                            <StudentProgress progress={ prog } courseId={ course.id } />
                        </div>
                    </div>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Index;
