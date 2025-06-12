import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HybridDisplay from '@/Components/HybridDisplay';
import TopMenu from '@/Components/TopMenu';
import { router, Link, Head } from '@inertiajs/react';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const Index = ({ auth, lesson, lessonIds, problemSet, pageAssets}) => {
    const [htmlContent, setHtmlContent] = useState(lesson.lesson_text);
    const title = `${ lesson.name }`
    let lessonSection, problemSection
    if (lesson.lesson_type === 'text') {
        lessonSection = (
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )
    }
    if (lesson.lesson_type === 'latex') {
        lessonSection = (
            <Latex>{ lesson.lesson_text }</Latex>
        )
    }
    if (lesson.lesson_type === 'pdf') {
        lessonSection = (
            <iframe src={`/storage/${pageAssets.pdf}.pdf`} style={{width:"100%", height:"1200px"}} frameBorder="0" />
        )
    }
    if (lesson.lesson_type === 'hybrid') {
        lessonSection = (
            <HybridDisplay content={ lesson.lesson_text } />
        )
    }
    let showProblemLink = problemSet !== null

    let topMenu = (
        <TopMenu auth={auth} title={ title } lessonId={ lesson.id }  neighboringLessons={ lessonIds } chapterId={lesson.lesson_set_id} show={['home', 'prob-set', 'prob-add', 'lesson-nav', 'chapter']} />
    )

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <Head title={title} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                    { lessonSection }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Index;
