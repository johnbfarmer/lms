import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TopMenu from '@/Components/TopMenu';
import LmsTable from '@/Components/LmsTable';
import { Link } from '@inertiajs/react';
import { buildBreadCrumbs } from '@/Helpers/Utilities';

export default function StudentReport({ auth, course, scores }) {
    const title = 'Informe'
    const breadcrumbs = buildBreadCrumbs({course}, 2)

    let topMenu = (
        <TopMenu
            auth={auth}
            title={ title }
            courseId={ course.id }
            show={['home', 'course']}
            breadcrumbs={ breadcrumbs }
        />
    )

    function formatStudent(data) {
        return (
            <Link 
                href={ route('chapter.student-report', {chapterId: chapter.id, studentId: data.userId})}
                className=""
            >
                <div className="text-blue-800">{data.userName}</div>
            </Link>
        )
    }

    const columns = [
        {
            title: 'Estudiante',
            field: 'userName',
            sortable: true,
            displayFormatter: formatStudent,
        },
        {
            title: 'Capítulo',
            field: 'chapterName',
            sortable: true,
        },
        {
            title: '# Problemas',
            field: 'numProblems',
            sortable: true,
        },
        {
            title: '# Probs Intentado',
            field: 'problemsDone',
            sortable: true,
        },
        {
            title: '% Correcto',
            field: 'userScore',
            sortable: true,
        },
    ];

    return (
        <AuthenticatedLayout auth={auth} user={auth.user} header={ false } topMenu={ topMenu }>
            <div className="py-2">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <LmsTable
                        columns={columns}
                        data={scores}
                        initialSort="sortKey"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
