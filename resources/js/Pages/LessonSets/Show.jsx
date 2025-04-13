import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LessonDescription from '@/Components/LessonDescription';
import { router, Link, Head } from '@inertiajs/react';

const Index = ({ auth, lessons, lessonSet, progress }) => {
    const title = `${lessonSet.name}`

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={title}>
            <Head title={title} />
            {lessons.map ((r,k) => {
                let prog = progress[r.id] || { is_premium: 1, pct_done: 0}
                return (
                    <LessonDescription key={ k } lesson={ r } progress={ prog }/>
                )
            })}
        </AuthenticatedLayout>
    )
}

export default Index;
