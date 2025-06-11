import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ChapterDescription from '@/Components/ChapterDescription';
import { router, Link, Head } from '@inertiajs/react';
import TopMenu from '@/Components/TopMenu';

const Index = ({ auth, lessonSets, course, progress }) => {
    const title = `Capítulos ${course.name}`

    let topMenu = (
        <TopMenu auth={auth} title={ title } courseId={course.id} show={['home', 'course-edit']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user}  header={ false } topMenu={ topMenu }>
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
