import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChapterDescription from '@/Components/ChapterDescription';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, lessonSets, course, progress }) => {
    const title = `${course.name}`

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            {lessonSets.map ((r, k) => {
                let prog = progress === null || !(r.id in progress) ? null : progress[r.id]
                return (
                    <ChapterDescription key={ k } lesson={ r } progress={ prog }/>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Index;
