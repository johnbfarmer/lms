import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LessonDescription from '@/Components/LessonDescription';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';

const Show = ({ auth, lessons, lessonSet, progress, chapterIds }) => {
    const title = `${lessonSet.name}`

    let topMenu = (
        <TopMenu auth={auth} title={ title } neighboringChapters={ chapterIds } courseId={lessonSet.course_id} show={['chapter-nav', 'course']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
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

export default Show;
