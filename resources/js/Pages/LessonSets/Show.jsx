import { useState, useEffect, CSSProperties } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import LessonDescription from '@/Components/LessonDescription';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';
import { buildBreadCrumbs } from '@/Helpers/Utilities';

const Show = ({ auth, lessons, chapter, course, progress, chapterIds }) => {
    const title = `${chapter.name}`

    const breadcrumbs = buildBreadCrumbs({course}, 2)

    let topMenu = (
        <TopMenu
            auth={auth}
            title={ title }
            courseId={chapter.course_id}
            chapterId={chapter.id}
            show={['home', 'course', 'chapter-edit']}
            breadcrumbs={ breadcrumbs }
        />
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
